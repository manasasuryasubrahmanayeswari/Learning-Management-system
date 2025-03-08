import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import cloudinary from "cloudinary";
import { createCourse, getAllCoursesService } from "../services/course.service";
import CourseModel from "../models/course.model";
import { redis } from "../utils/redis";
import mongoose from "mongoose";
import ejs from "ejs";
import path = require("path");
import sendMail from "../utils/sendMail";
import NotificationModel from "../models/notificationModel";
import axios from "axios";

// upload course
export const uploadCourse = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const thumbnail = data.thumbnail;
      if (thumbnail) {
        const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
          folder: "courses",
        });
        data.thumbnail = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }
      createCourse(data, res, next);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// Edit Course
export const editCourse = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const thumbnail = data.thumbnail;
      const courseId = req.params.id;

      console.log("Received thumbnail:", thumbnail);

      const courseData = (await CourseModel.findById(courseId)) as any;
      
      if (thumbnail && typeof thumbnail === 'string' && !thumbnail.startsWith("https")) {
        if (courseData?.thumbnail?.public_id) {
          await cloudinary.v2.uploader.destroy(courseData.thumbnail.public_id);
        }

        const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
          folder: "courses",
        });

        data.thumbnail = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      } else if (thumbnail && thumbnail.startsWith("https")) {
        data.thumbnail = {
          public_id: courseData?.thumbnail?.public_id || '',
          url: courseData?.thumbnail?.url || thumbnail,
        };
      } else {
        // If thumbnail is neither a URL nor a valid new thumbnail object
        data.thumbnail = courseData?.thumbnail;
      }

      const course = await CourseModel.findByIdAndUpdate(
        courseId,
        { $set: data },
        { new: true }
      );

      res.status(201).json({
        success: true,
        course,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);


// get single course -- without purchasing
export const getSingleCourse = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const courseId = req.params.id;
      const isCacheExist = await redis.get(courseId);
      if (isCacheExist) {
        const course = JSON.parse(isCacheExist);
        res.status(200).json({
          success: true,
          course,
        });
      } else {
        const course = await CourseModel.findById(req.params.id).select(
          "-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links"
        );
        await redis.set(courseId, JSON.stringify(course), "EX", 604800); //7days

        res.status(200).json({
          success: true,
          course,
        });
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

//get all courses -- without purchasing
export const getAllCourses = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const isCacheExist = await redis.get("allCourses");
      if (isCacheExist) {
        const courses = JSON.parse(isCacheExist);
        res.status(200).json({
          success: true,
          courses,
        });
      } else {
        const courses = await CourseModel.find().select(
          "-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links"
        );

        await redis.set("allCourses", JSON.stringify(courses));
        res.status(200).json({
          success: true,
          courses,
        });
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);



// get course content - only for valid user
export const getCourseByUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Extract the user's course list and the requested course ID
      const userCourseList = req.user?.courses;
      const courseId = req.params.id;

      // Ensure courseId is a string
      const courseIdStr = String(courseId);

      //console.log("User's courses:", userCourseList);
      //console.log("Requested course ID:", courseIdStr);

      // Check if the course exists in the user's course list
      const courseExists = userCourseList?.find(
        (course: any) => course._id.toString() === courseIdStr
      );

      //console.log("Course exists:", courseExists);

      // If the course does not exist in the user's course list, return an error
      if (!courseExists) {
        return next(
          new ErrorHandler("You are not eligible to access this course", 404)
        );
      }

      // Find the course by ID
      const course = await CourseModel.findById(courseIdStr);

      // If the course is not found, return an error
      if (!course) {
        return next(new ErrorHandler("Course not found", 404));
      }

      // Extract the course content
      const content = course.courseData;

      // Send the course content in the response
      res.status(200).json({
        success: true,
        content,
      });
    } catch (error: any) {
      // Handle any other errors
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// add question in course
interface IAddQuestionData {
  question: string;
  courseId: string;
  contentId: string;
}

export const addQuestion = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { question, courseId, contentId }: IAddQuestionData = req.body;
      const course = await CourseModel.findById(courseId);
      if (!mongoose.Types.ObjectId.isValid(contentId)) {
        return next(new ErrorHandler("Invalid content id", 400));
      }

      const courseContent = course?.courseData?.find((item: any) =>
        item._id.equals(contentId)
      );

      if (!courseContent) {
        return next(new ErrorHandler("Invalid content id", 400));
      }

      //create a new question object
      const newQuestion: any = {
        question: question,
        user: req.user,
        questionReplies: [],
      };

      // add this question to our course content
      courseContent?.questions.push(newQuestion);

      await NotificationModel.create({
        userId: req.user?._id,
        title: "New Question Recieved",
        message: `You have a new question in ${courseContent.title}`,
      });

      //save the updated course
      await course?.save();
      res.status(200).json({
        success: true,
        course,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// add answer to the course question
interface IAddAnswerData {
  answer: string;
  contentId: string;
  questionId: string;
  courseId: string;
}
export const addAnswer = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { answer, contentId, questionId, courseId }: IAddAnswerData = req.body;
      const course = await CourseModel.findById(courseId);
      if (!mongoose.Types.ObjectId.isValid(contentId)) {
        return next(new ErrorHandler("Invalid content id", 400));
      }
      const courseContent = course?.courseData?.find((item: any) =>
        item._id.equals(contentId)
      );
      if (!courseContent) {
        return next(new ErrorHandler("Invalid content id", 400));
      }
      const question = courseContent?.questions.find((item: any) =>
        item._id.equals(questionId)
      );
      if (!question) {
        return next(new ErrorHandler("Invalid question id", 400));
      }
      //create a new answer object
      const newAnswer: any = {
        answer: answer,
        user: req.user,
      };
      // Initialize questionReplies if it's undefined
      if (!question.questionReplies) {
        question.questionReplies = [];
      }

      // Add answer to our course content
      question.questionReplies.push(newAnswer);

      // Save the course with the updated answer
      await course?.save();

      if (req.user && req.user._id === question.user._id) {
        // create a notification
        await NotificationModel.create({
          userId: question.user._id,
          title: "New Question Reply Received",
          message: `You have a new question reply in ${courseContent.title}`,
        });
      } else {
        const data = {
          name: question.user.name,
          title: courseContent.title,
          loginUrl: "www.google.com",
        };

        const html = await ejs.renderFile(
          path.join(__dirname, "../mails/question-reply.ejs"),
          data
        );

        try {
          await sendMail({
            email: question.user.email,
            subject: `New reply to your question in ${courseContent.title} course`,
            template: "question-reply.ejs",
            data,
          });
        } catch (error: any) {
          return next(new ErrorHandler(error.message, 500));
        }
      }

      res.status(200).json({
        success: true,
        course,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// add review in course

interface IAddReviewData {
  review: string;
  rating: number;
  userId: string;
  videoId: string;
}

export const addReview = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userCourseList = req.user?.courses;
      const courseId = req.params.id;
      const { videoId, review, rating } = req.body as IAddReviewData;

      // Check if courseId already exists in userCourseList based on _id
      const courseExists = userCourseList?.some(
        (course: any) => course._id.toString() === courseId.toString()
      );

      if (!courseExists) {
        return next(
          new ErrorHandler("You are not eligible for this course", 404)
        );
      }

      const course = await CourseModel.findById(courseId);
      if (!course) {
        return next(new ErrorHandler("Course not found", 404));
      }

      // Find the specific video by videoId
      const video = course.courseData.find((v) => (v as any)._id.toString() === videoId);
      if (!video) {
        return next(new ErrorHandler("Video not found", 404));
      }

      const reviewData: any = {
        user: req.user,
        comment: review,
        rating,
      };

      video.reviews.push(reviewData); // Pushing review to video reviews array

      let avg = 0;
      video.reviews.forEach((review: any) => {
        // Calculating average rating
        avg += review.rating;
      });
      video.ratings = avg / video.reviews.length; // Setting average rating to video

      await course.save(); // Saving course
      await redis.set(courseId,JSON.stringify(course),"EX",604800);

      // Create a notification
      await NotificationModel.create({
        userId: req.user?._id,
        title: "New Review Received",
        message: `${req.user?.name} has added a new review to your video ${video?.title} in course ${course?.name}`,
      });

      res.status(200).json({
        success: true,
        course,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);


// add reply in review
interface IAddReviewData {
  comment: string;
  courseId: string;
  reviewId: string;
}
export const addReplyToReview = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { comment, reviewId, courseId } = req.body as IAddReviewData;
      const course = await CourseModel.findById(courseId);

      if (!course) {
        return next(new ErrorHandler("Course not found", 404));
      }

      const courseContent = course?.courseData?.find(
        (content: any) => content.reviews?.some((rev: any) => rev._id.toString() === reviewId)
      );
      
      const review = courseContent?.reviews?.find(
        (rev: any) => rev._id.toString() === reviewId
      );
      
      if (!review) {
        return next(new ErrorHandler("Review not found", 404));
      }
      

      const replyData: any = {
        user: req.user,
        comment,
      };

      if (!review.commentReplies) {
        review.commentReplies = [];
      }

      review.commentReplies?.push(replyData);

      await course?.save();
      await redis.set(courseId,JSON.stringify(course),"EX",604800);

      res.status(200).json({
        success: true,
        course,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

//Get All courses -- only for admin
export const getAllCoursesAdmin = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      getAllCoursesService(res);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// delete course -- only for admin
export const deleteCourse = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const course = await CourseModel.findById(id);
      if (!course) {
        return next(new ErrorHandler("Course not found", 404));
      }
      await course.deleteOne({ id });
      await redis.del(id);
      res.status(200).json({
        success: true,
        message: "Course deleted successfully",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//generate video URL
export const generateVideoUrl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { videoId } = req.body;

    if (!videoId) {
      return res
        .status(400)
        .json({ success: false, message: "Video ID is required" });
    }

    const response = await axios.post(
      `https://dev.vdocipher.com/api/videos/${videoId}/otp`,
      { ttl: 300 },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Apisecret ${process.env.VDOCIIPHER_API_SECRET}`,
        },
      }
    );

    return res.json({ success: true, ...response.data });
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      return res.status(error.response.status).json({
        success: false,
        message: error.response.data.message || "Request failed",
      });
    } else if (error.request) {
      return res
        .status(500)
        .json({ success: false, message: "No response from VdoCipher API" });
    } else {
      return res.status(500).json({ success: false, message: error.message });
    }
  }
};
