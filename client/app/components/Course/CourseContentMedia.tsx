import { styles } from "@/app/styles/style";
import CoursePlayer from "@/app/utils/CoursePlayer";
import Ratings from "@/app/utils/Ratings";
import {
  useAddAnswerInQuestionMutation,
  useAddNewQuestionMutation,
  useAddReplyInReviewMutation,
  useAddReviewInCourseMutation,
  useGetCourseDetailsQuery,
} from "@/redux/features/courses/coursesApi";
import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  AiFillStar,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineStar,
} from "react-icons/ai";
import { BiMessage } from "react-icons/bi";
import { VscVerifiedFilled } from "react-icons/vsc";
import { format } from "timeago.js";
import socketIO from "socket.io-client";
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socketId = socketIO(ENDPOINT,{ transports:["websocket"]});

type Props = {
  data: any;
  id: string;
  activeVideo: number;
  setActiveVideo: (activeVideo: number) => void;
  user: any;
  refetch: any;
};

const CourseContentMedia: FC<Props> = ({
  data,
  id,
  activeVideo,
  setActiveVideo,
  user,
  refetch,
}) => {
  const [activeBar, setActiveBar] = useState(0);
  const [question, setQuestion] = useState("");
  const [rating, setRating] = useState(0);
  const [answer, setAnswer] = useState("");
  const [questionId, setQuestionId] = useState("");
  const [review, setReview] = useState("");
  const [isReviewReply, setIsReviewReply] = useState(false);
  const [reply, setReply] = useState("");
  const [reviewId, setReviewId] = useState("");
  const [
    addNewQuestion,
    { isSuccess, error, isLoading: questionCreationLoading },
  ] = useAddNewQuestionMutation({});
  const { data: courseData, refetch: courseRefetch } = useGetCourseDetailsQuery(
    id,
    { refetchOnMountOrArgChange: true }
  );
  const [
    addReplyInReview,
    {
      isSuccess: replySuccess,
      error: replyError,
      isLoading: replyCreationLoading,
    },
  ] = useAddReplyInReviewMutation({});
  const [
    addAnswerInQuestion,
    {
      isSuccess: answerSuccess,
      error: answerError,
      isLoading: answerCreationLoading,
    },
  ] = useAddAnswerInQuestionMutation();
  const [
    addReviewInCourse,
    {
      isSuccess: reviewSuccess,
      error: reviewError,
      isLoading: reviewCreationLoading,
    },
  ] = useAddReviewInCourseMutation();
  const course = courseData?.course;
  const hasReviewed = (video: any) => {
    return video.reviews.some((rev: any) => rev.user._id === user?._id);
  };
  const isReviewExists = course?.reviews?.find(
    (item: any) => item.user._id == user._id
  );

  const handleQuestion = () => {
    if (question.length === 0) {
      toast.error("Question can't be empty");
    } else {
      addNewQuestion({
        question,
        courseId: id,
        contentId: data[activeVideo]._id,
      });
    }
  };

  const handleReviewReplySubmit = () => {
    console.log("Review ID:", reviewId);
    if (!replyCreationLoading) {
      if (reply === "") {
        toast.error("Reply can't be empty");
      } else {
        addReplyInReview({ comment: reply, courseId: id, reviewId: reviewId });
      }
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setQuestion("");
      refetch();
      socketId.emit("notification", {
        title: "New Question Received",
        message: `You have a new question in ${data[activeVideo].title}`,
        userId: user._id
      });
      toast.success("Question sent");
    }
    if (answerSuccess) {
      setAnswer("");
      refetch();
      toast.success("Answer sent");
      if (user.role !== "admin") {
        socketId.emit("notification", {
          title: "New Reply Received",
          message: `You have a new question reply in ${data[activeVideo].title}`,
          userId: user._id
        });
      }
    }
    if (reviewSuccess) {
      setReview("");
      setRating(0);
      courseRefetch();
      refetch();
      socketId.emit("notification", {
        title: "New Review Received",
        message: `${user.name} has added a new review to your video ${data[activeVideo].title}`,
        userId: user._id
      });
      toast.success("Review added successfully");
    }
    if (replySuccess) {
      setReply("");
      courseRefetch();
      toast.success("Reply added successfully");
    }
    if (reviewError) {
      if ("data" in reviewError) {
        const errorMessage = reviewError as any;
        toast.error(errorMessage.data.message);
      }
    }
    if (answerError) {
      if ("data" in answerError) {
        const errorMessage = answerError as any;
        toast.error(errorMessage.data.message);
      }
    }
    if (error && "data" in error) {
      const errorMessage = error.data as any;
      toast.error(errorMessage.message);
    }
    if (replyError) {
      const errorMessage = replyError as any;
      if (errorMessage && errorMessage.data && errorMessage.data.message) {
        toast.error(errorMessage.data.message);
      } else {
        toast.error("An error occurred while adding the reply");
      }
    }
  }, [
    isSuccess,
    error,
    answerSuccess,
    answerError,
    reviewSuccess,
    reviewError,
    replySuccess,
    replyError,
    activeVideo,
    courseRefetch,
    data,
    refetch,
    user._id,
    user.name,
    user.role
  ]);
  

  const handleAnswerSubmit = () => {
    addAnswerInQuestion({
      answer,
      courseId: id,
      contentId: data[activeVideo]._id,
      questionId: questionId,
    });
  };

  const handleReviewSubmit = async () => {
    if (review.length === 0) {
      toast.error("Review can't be empty");
    } else {
      addReviewInCourse({
        review,
        rating,
        courseId: id,
        videoId: data[activeVideo]._id,
      });
    }
  };



  return (
    <div className="w-[95%] 800px:w-[86%] py-4 m-auto">
      <CoursePlayer
        title={data[activeVideo]?.title}
        videoUrl={data[activeVideo]?.videoUrl}
      />
      <div className="w-full flex items-center justify-between my-3">
        <div
          className={`${styles.button} !w-[unset] !min-h-[40px] !py-[unset] ${
            activeVideo === 0 && "!cursor-no-drop opacity-[.8]"
          }`}
          onClick={() =>
            setActiveVideo(activeVideo === 0 ? 0 : activeVideo - 1)
          }
        >
          <AiOutlineArrowLeft className="mr-2" />
          Prev Lesson
        </div>
        <div
          className={`${styles.button} !w-[unset] !min-h-[40px] !py-[unset] ${
            data.length - 1 === activeVideo && "!cursor-no-drop opacity-[.8]"
          }`}
          onClick={() =>
            setActiveVideo(
              data && data.length - 1 === activeVideo
                ? activeVideo
                : activeVideo + 1
            )
          }
        >
          Next Lesson
          <AiOutlineArrowRight className="ml-2" />
        </div>
      </div>
      <h1 className="pt-2 text-[25px] font-[600]">{data[activeVideo].title}</h1>
      <br />
      <div className="w-full p-4 flex items-center justify-between">
        {["Overview", "Resources", "Q&A", "Reviews"].map((text, index) => (
          <h5
            key={index}
            className={`800px:text-[20px] cursor-pointer ${
              activeBar === index && "text-red-500"
            }`}
            onClick={() => setActiveBar(index)}
          >
            {text}
          </h5>
        ))}
      </div>
      <br />
      {activeBar === 0 && (
        <p className="text-[10px] whitespace-pre-line mb-3">
          {data[activeVideo]?.description}
        </p>
      )}
      {activeBar === 1 && (
        <div>
          {data[activeVideo]?.links.map((item: any, index: number) => (
            <div key={index} className="mb-5">
              <h2 className="800px:text-[20px] 800px:inline-block">
                {item.title && item.title + ":"}
              </h2>
              <a
                className="inline-block 800px:text-[20px] 800px:pl-2"
                href={item.url}
              >
                {item.url}
              </a>
            </div>
          ))}
        </div>
      )}
      {activeBar === 2 && (
        <>
          <div className="flex w-full">
            <Image
              src={
                user?.avatar
                  ? user.avatar.url
                  : "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"
              }
              width={50}
              height={50}
              alt=""
              className="w-[50px] h-[50px] object-cover rounded-full"
            />
            <textarea
              name=""
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              id=""
              cols={50}
              rows={5}
              placeholder="Write your Question..."
              className="outline-none bg-transparent ml-3 border border-[#0f0f0f57] 800px:w-full p-2 rounded w-[90%] 800px:text-[18px] font-poppins"
            ></textarea>
          </div>
          <div className="w-full flex justify-end">
            <div
              className={`${
                styles.button
              } !w-[120px] !h-[40px] text-[18px] mt-5 800px:mr-0 mr-2 ${
                questionCreationLoading && "cursor-no-drop"
              }`}
              onClick={questionCreationLoading ? () => {} : handleQuestion}
            >
              Submit
            </div>
            <br />
            <br />
          </div>
          <div className="w-full h-[1px]"></div>
          <div>
            {/* question replies */}
            <CommentReply
              data={data}
              activeVideo={activeVideo}
              answer={answer}
              setAnswer={setAnswer}
              handleAnswerSubmit={handleAnswerSubmit}
              user={user}
              setQuestionId={setQuestionId}
              answerCreationLoading={answerCreationLoading}
            />
          </div>
        </>
      )}
      {activeBar === 3 && (
        <>
          <div className="flex w-full">
            {!hasReviewed(data[activeVideo]) ? (
              <>
                <Image
                  src={
                    user?.avatar
                      ? user.avatar.url
                      : "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"
                  }
                  width={50}
                  height={50}
                  alt=""
                  className="w-[50px] h-[50px] object-cover rounded-full"
                />
                <div className="ml-3">
                  <div className="flex w-full">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className="mr-1 cursor-pointer"
                        onClick={() => setRating(i)}
                      >
                        {rating >= i ? (
                          <AiFillStar size={20} className="text-yellow-500" />
                        ) : (
                          <AiOutlineStar
                            size={20}
                            className="text-yellow-500"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                  <textarea
                    name=""
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    id=""
                    cols={30}
                    rows={5}
                    placeholder="Write your Review..."
                    className="outline-none bg-transparent border border-[#00000057] rounded p-2 font-poppins"
                  ></textarea>
                </div>
              </>
            ) : (
              <div className="w-full">
                <p className="text-[18px] text-center">
                  You have already reviewed this video.
                </p>
              </div>
            )}
          </div>
          {!hasReviewed(data[activeVideo]) && (
            <div className="w-full flex justify-end">
              <div
                className={`${
                  styles.button
                } !w-[120px] !h-[40px] text-[18px] mt-5 800px:mr-0 mr-2 ${
                  reviewCreationLoading && "cursor-no-drop"
                }`}
                onClick={reviewCreationLoading ? () => {} : handleReviewSubmit}
              >
                Submit
              </div>
            </div>
          )}
          <div className="w-full h-[1px]"></div>
          <div>
          {data[activeVideo]?.reviews.map((item: any, index: number) => (
              <>
                <div key={index} className="w-full my-4">
                  <div className="flex items-center">
                    <Image
                      src={
                        item?.user.avatar
                          ? item.user.avatar.url
                          : "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"
                      }
                      width={50}
                      height={50}
                      alt=""
                      className="w-[50px] h-[50px] object-cover rounded-full"
                    />
                    <div className="pl-2">
                      <div className="w-full flex items-center">
                        <h4 className="font-[500] mr-3">{item?.user.name}</h4>
                        {item?.user.role === "Admin" && (
                          <VscVerifiedFilled size={15} color="#2563eb" />
                        )}
                      </div>
                      <Ratings rating={item?.rating} />
                      <p className="text-[12px]">{format(item?.createdAt)}</p>
                    </div>
                  </div>
                  <div className="pl-[62px] mt-2">
                    <p className="text-[16px]">{item?.comment}</p>
                  </div>
                </div>
                {user.role === "admin" && (
                  <span
                    className={`${styles.label} !ml-10 cursor-pointer`}
                    onClick={() => {
                      setReviewId(item._id);
                      setIsReviewReply(true);
                    }}
                  >
                    Add Reply
                  </span>
                )}
                {isReviewReply && (
                  <div className="w-full flex relative">
                    <input
                      type="text"
                      placeholder="Enter your reply"
                      value={reply}
                      onChange={(e: any) => setReply(e.target.value)}
                      className="block 800px:ml-12 mt-2 outline-none bg-transparent border-b border-[#fff] p-[5px] w-[95%]"
                    />
                    <button
                      type="button"
                      className="absolute right-0 bottom-1"
                      onClick={handleReviewReplySubmit}
                      //</div>disabled={}
                    >
                      Submit
                    </button>
                  </div>
                )}
                {item.commentReplies.map((i: any, index: number) => (
                  <div key={index} className="w-full flex 800px:ml-16 my-5">
                    <Image
                      src={
                        i?.user?.avatar
                          ? i?.user.avatar.url
                          : "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"
                      }
                      width={50}
                      height={50}
                      alt=""
                      className="w-[50px] h-[50px] object-cover rounded-full"
                    />
                    <div className="pl-3">
                    <div className="flex items-center">
                  <h5 className="text-[20px]">{item.user.name}</h5>
                  {item.user.role === "admin" && (
                    <VscVerifiedFilled className="text-[green] ml-2 font-[20px]" />
                  )}
                </div>
                      <p>{i?.comment}</p>
                      <small className="text-black">
                        {format(i?.createdAt)}
                      </small>
                    </div>
                  </div>
                  
                ))}
              </>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const CommentReply = ({
  data,
  activeVideo,
  answer,
  setAnswer,
  handleAnswerSubmit,
  user,
  setQuestionId,
  answerCreationLoading,
}: any) => {
  return (
    <div className="w-full my-3">
      {data[activeVideo].questions.map((item: any, index: any) => (
        <CommentItem
          key={index}
          data={data}
          activeVideo={activeVideo}
          answer={answer}
          setAnswer={setAnswer}
          setQuestionId={setQuestionId}
          handleAnswerSubmit={handleAnswerSubmit}
          item={item}
          index={index}
          answerCreationLoading={answerCreationLoading}
        />
      ))}
    </div>
  );
};

const CommentItem = ({
  data,
  setQuestionId,
  questionId,
  answer,
  setAnswer,
  handleAnswerSubmit,
  item,
  answerCreationLoading,
}: any) => {
  const [replyActive, setReplyActive] = useState(false);
  return (
    <div className="my-4">
      <div className="flex mb-2">
        <Image
          src={
            item?.user?.avatar
              ? item?.user.avatar.url
              : "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"
          }
          width={50}
          height={50}
          alt=""
          className="w-[50px] h-[50px] object-cover rounded-full"
        />
        <div className="pl-3">
          <h5 className="text-[20px]">{item.user.name}</h5>
          <p>{item?.question}</p>
          <small className="text-black">{format(item?.createdAt)}</small>
        </div>
      </div>
      <div className="w-full flex">
        <span
          className="800px:pl-16 text-black cursor-pointer mr-2"
          onClick={() => {
            setReplyActive(!replyActive), setQuestionId(item._id);
          }}
        >
          {!replyActive
            ? item.questionReplies.length !== 0
              ? "All Replies"
              : "Add Reply"
            : "Hide Replies"}
        </span>
        <BiMessage size={20} className="cursor-pointer" fill="black" />
        <span className="pl-1 mt-[-4px] cursor-pointer text-black">
          {item.questionReplies.length}
        </span>
      </div>
      {replyActive && (
        <>
          {item.questionReplies.map((i: any, index: number) => (
            <div key={index} className="w-full flex 800px:ml-16 my-5">
              <div>
                <Image
                  src={
                    i?.user?.avatar
                      ? i?.user.avatar.url
                      : "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"
                  }
                  width={50}
                  height={50}
                  alt=""
                  className="w-[50px] h-[50px] object-cover rounded-full"
                />
              </div>
              <div className="pl-2">
                <div className="flex items-center">
                  <h5 className="text-[20px]">{i.user.name}</h5>
                  {i.user.role === "admin" && (
                    <VscVerifiedFilled className="text-[green] ml-2 font-[20px]" />
                  )}
                </div>
                <p>{i?.answer}</p>
                <small className="text-black">{format(i?.createdAt)}</small>
              </div>
            </div>
          ))}
          <>
            <div className="w-full relative flex">
              <input
                type="text"
                placeholder="Enter your reply...."
                value={answer}
                onChange={(e: any) => setAnswer(e.target.value)}
                className={`block 800px:ml-12 mt-2 outline-none bg-transparent border-b border-[#fff] p-[5px] w-[95%] ${
                  answer === "" || (answerCreationLoading && "cursor-no-drop")
                }`}
              />
              <button
                type="submit"
                className="absolute right-0 bottom-1"
                onClick={handleAnswerSubmit}
                disabled={answer === "" || answerCreationLoading}
              >
                Submit
              </button>
            </div>
            <br />
          </>
        </>
      )}
    </div>
  );
};

export default CourseContentMedia;
