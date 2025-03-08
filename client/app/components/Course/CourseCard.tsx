import Link from "next/link";
import React, { FC } from "react";
import Image from "next/image";
import Ratings from "@/app/utils/Ratings";
import { AiOutlineUnorderedList } from "react-icons/ai";

type Props = {
  item: any;
  isProfile?: boolean;
  user?:any;
};

const CourseCard: FC<Props> = ({ item, isProfile }) => {
  return (
    <Link href={!isProfile ? `/course/${item._id}` : `/course-access/${item._id}`}>
      <div className="w-full min-h-[35vh] hover:bg-light-primary hover:opacity-85 dark:hover:bg-dark-accent-grey bg-light-background dark:bg-dark-background backdrop-blur border-4 border-light-primary dark:border-dark-accent-grey rounded-lg p-3 shadow-sm dark:shadow-inner">
        <div className="relative w-full h-32">
          <Image
            src={item.thumbnail?.url} // Ensure item.thumbnail.url exists or provide a fallback
            alt="course Thumbnail"
            layout="fill"
            objectFit="cover"
            className="rounded w-full"
          />
        </div>

        <h1 className="font-Josefin text-[16px] text-light-text dark:text-dark-text mt-3">
          {item.name}
        </h1>
        <div className="w-full flex items-center justify-between pt-2">
          <Ratings rating={item.ratings} />
          <h5
            className={`text-light-text dark:text-dark-text ${
              isProfile ? "hidden 800px:inline" : ""
            }`}
          >
            {item.purchased} Students
          </h5>
        </div>
        <div className="w-full flex items-center justify-between pt-3">
          <div className="flex items-center">
            <h2 className="text-light-text dark:text-dark-text">
              {item.price === 0 ? "Free" : `${item.price}$`}
            </h2>
            {item.estimatedPrice && (
              <h5 className="pl-3 text-[14px] line-through opacity-80 text-light-accent-darkGrey dark:text-dark-accent-lightGrey">
                {item.estimatedPrice}$
              </h5>
            )}
          </div>
          <div className="flex items-center">
            <AiOutlineUnorderedList size={20} className="text-light-text dark:text-dark-text" />
            <h5 className="pl-2 text-light-text dark:text-dark-text">
              {item.courseData?.length} Lectures
            </h5>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
