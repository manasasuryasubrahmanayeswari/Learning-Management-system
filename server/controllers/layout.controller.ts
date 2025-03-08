import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/ErrorHandler";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import LayoutModel from "../models/layout.model";
import cloudinary from "cloudinary";

// Create layout
export const createLayout = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { type } = req.body;
      const isTypeExist = await LayoutModel.findOne({ type });

      if (isTypeExist) {
        return next(new ErrorHandler(`${type} Layout already exists`, 400));
      }

      let layoutData: any = {};

      if (type === "Banner") {
        const { image, title, subTitle } = req.body;
        const myCloud = await cloudinary.v2.uploader.upload(image, {
          folder: "layout",
        });

        layoutData = {
          type: "Banner",
          banner: {
            bannerImage: {
              public_id: myCloud.public_id,
              url: myCloud.secure_url,
            },
            title,
            subTitle,
          },
        };
      } else if (type === "FAQ") {
        const { faq } = req.body;
        const faqItems = await Promise.all(
          faq.map(async (item: any) => ({
            question: item.question,
            answer: item.answer,
          }))
        );

        layoutData = {
          type: "FAQ",
          faq: faqItems,
        };
      } else if (type === "Categories") {
        const { categories } = req.body;
        const categoriesItems = await Promise.all(
          categories.map(async (item: any) => ({
            title: item.title,
          }))
        );

        layoutData = {
          type: "Categories",
          categories: categoriesItems,
        };
      }

      await LayoutModel.create(layoutData);

      res.status(200).json({
        success: true,
        message: "Layout created successfully",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// Edit layout
// Edit layout
interface PlainBannerImage {
  public_id: string;
  url: string;
}

// Edit layout
export const editLayout = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { type } = req.body;

      if (type === "Banner") {
        const { image, title, subTitle } = req.body;
        const bannerData = await LayoutModel.findOne({ type: "Banner" }).lean();

        if (!bannerData) {
          return next(new ErrorHandler("Banner layout not found", 404));
        }

        let updatedImage: PlainBannerImage = bannerData.banner.bannerImage;

        if (!image.startsWith("https")) {
          const uploadResult = await cloudinary.v2.uploader.upload(image, {
            folder: "layout",
          });
          updatedImage = {
            public_id: uploadResult.public_id,
            url: uploadResult.secure_url,
          };
        }

        const updatedBanner = {
          bannerImage: updatedImage,
          title,
          subTitle,
        };

        await LayoutModel.findOneAndUpdate(
          { type: "Banner" },
          {
            $set: {
              banner: updatedBanner,
            },
          },
          { new: true }
        );
      } else if (type === "FAQ") {
        const { faq } = req.body;
        const faqItems = faq.map((item: any) => ({
          question: item.question,
          answer: item.answer,
        }));

        await LayoutModel.findOneAndUpdate(
          { type: "FAQ" },
          {
            $set: {
              faq: faqItems,
            },
          },
          { new: true }
        );
      } else if (type === "Categories") {
        const { categories } = req.body;
        const categoriesItems = categories.map((item: any) => ({
          title: item.title,
        }));

        await LayoutModel.findOneAndUpdate(
          { type: "Categories" },
          {
            $set: {
              categories: categoriesItems,
            },
          },
          { new: true }
        );
      }

      res.status(200).json({
        success: true,
        message: "Layout updated successfully",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);


// Get layout by type
export const getLayoutByType = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { type } = req.params;

    const layout = await LayoutModel.findOne({ type });

    if (!layout) {
      return next(new ErrorHandler(`Layout of type '${type}' not found`, 404));
    }

    res.status(200).json({
      success: true,
      layout,
    });
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 500));
  }
});