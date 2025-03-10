import React, { FC } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BsStarHalf } from "react-icons/bs";

type Props = {
  rating: number;
};

const Ratings: FC<Props> = ({ rating }) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(
        <AiFillStar
          key={i}
          size={20}
          className="mr-2 cursor-pointer text-yellow-500 dark:text-yellow-400"
        />
      );
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      stars.push(
        <BsStarHalf
          key={i}
          size={17}
          className="mr-2 cursor-pointer text-yellow-500 dark:text-yellow-400"
        />
      );
    } else {
      stars.push(
        <AiOutlineStar
          key={i}
          size={20}
          className="mr-2 cursor-pointer text-yellow-500 dark:text-yellow-400"
        />
      );
    }
  }

  return <div className="flex mt-1 ml-2">{stars}</div>;
};

export default Ratings;
