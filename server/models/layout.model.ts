import { Schema, model, Document } from "mongoose";
import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/ErrorHandler";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import cloudinary from "cloudinary";

// Define interfaces
interface FaqItem extends Document {
  question: string;
  answer: string;
}

interface Category extends Document {
  title: string;
}

interface BannerImage extends Document {
  public_id: string;
  url: string;
}

interface PlainBannerImage {
  public_id: string;
  url: string;
}

interface Layout extends Document {
  type: string;
  faq: FaqItem[];
  categories: Category[];
  banner: {
    bannerImage: BannerImage;
    title: string;
    subTitle: string;
  };
}

// Define schemas
const faqSchema = new Schema<FaqItem>({
  question: { type: String },
  answer: { type: String },
});

const CategorySchema = new Schema<Category>({
  title: { type: String },
});

const bannerImageSchema = new Schema<BannerImage>({
  public_id: { type: String },
  url: { type: String },
});

const layoutSchema = new Schema<Layout>({
  type: { type: String },
  faq: [faqSchema],
  categories: [CategorySchema],
  banner: {
    bannerImage: bannerImageSchema,
    title: { type: String },
    subTitle: { type: String },
  },
});

const LayoutModel = model<Layout>("Layout", layoutSchema);



export default LayoutModel;
