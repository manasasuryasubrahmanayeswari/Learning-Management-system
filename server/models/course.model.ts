import mongoose, { Document, Model, Schema } from "mongoose";
import { IUser } from "./user.model";

interface IComment extends Document {
  user: IUser;
  question: string;
  questionReplies?: IReply[];
}

interface IReply extends Document {
  user: IUser;
  answer: string;
}

interface IReviewReply extends Document {
  user: IUser;
  comment: string;
}

interface IReview extends Document {
  user: IUser;
  rating: number;
  comment: string;
  commentReplies: IComment[];
}

interface ILink extends Document {
  title: string;
  url: string;
}

interface ICourseData extends Document {
  title: string;
  description: string;
  videoUrl: string;
  videoThumbnail: object;
  videoSection: string;
  videoLength: number;
  videoPlayer: string;
  suggestion: string;
  questions: IComment[];
  links: ILink[];
  reviews: IReview[];
  ratings?: number;  // Add this line
}

interface ICourse extends Document {
  name: string;
  description?: string;
  categories: string;
  price: number;
  estimatedPrice?: number;
  thumbnail: object;
  tags: string;
  level: string;
  demoUrl: string;
  benefits: { title: string }[];
  prerequisites: { title: string }[];
  reviews: IReview[];
  courseData: ICourseData[];
  ratings?: number;
  purchased?: number;
}

const replySchema = new Schema<IReply>(
  {
    user: Object,
    answer: String,
  },
  { timestamps: true }
);

const commentSchema = new Schema<IComment>(
  {
    user: Object,
    question: String,
    questionReplies: [replySchema],
  },
  { timestamps: true }
);

const reviewReplySchema = new Schema<IReviewReply>(
  {
    user: Object,
    comment: String,
  },
  { timestamps: true }
);

const reviewSchema = new Schema<IReview>(
  {
    user: Object,
    rating: {
      type: Number,
      default: 0,
    },
    comment: String,
    commentReplies: [reviewReplySchema],
  },
  { timestamps: true }
);

const linkSchema = new Schema<ILink>({
  title: String,
  url: String,
});

const courseDataSchema = new Schema<ICourseData>({
  videoUrl: String,
  title: String,
  videoSection: String,
  description: String,
  videoLength: Number,
  videoPlayer: String,
  suggestion: String,
  questions: [commentSchema],
  links: [linkSchema],
  reviews: [reviewSchema],
  ratings: {
    type: Number,
    default: 0,
  },
});

const courseSchema = new Schema<ICourse>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    categories: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    estimatedPrice: {
      type: Number,
    },
    thumbnail: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    tags: {
      required: true,
      type: String,
    },
    level: {
      type: String,
      required: true,
    },
    demoUrl: {
      type: String,
      required: true,
    },
    benefits: [{ title: String }],
    prerequisites: [{ title: String }],
    reviews: [reviewSchema],
    courseData: [courseDataSchema],
    ratings: {
      type: Number,
      default: 0,
    },
    purchased: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const CourseModel: Model<ICourse> = mongoose.model("Course", courseSchema);

export default CourseModel;
