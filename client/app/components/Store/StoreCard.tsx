// components/StoreCard.tsx
import React, { FC } from "react";
import Image from "next/image";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

type Props = {
  item: {
    image: string;
    title: string;
    price: string;
    rating: number;
    reviews: number;
    affiliateLink: string;
  };
};

const StarRating: FC<{ rating: number }> = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStars = rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStars;

  return (
    <div className="flex items-center">
      {Array(fullStars)
        .fill(0)
        .map((_, i) => (
          <FaStar key={i} className="text-yellow-500" />
        ))}
      {halfStars === 1 && <FaStarHalfAlt className="text-yellow-500" />}
      {Array(emptyStars)
        .fill(0)
        .map((_, i) => (
          <FaRegStar key={i} className="text-yellow-500" />
        ))}
    </div>
  );
};

const StoreCard: FC<Props> = ({ item }) => {
  return (
    <div className="w-full p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md transition-shadow hover:shadow-lg">
      <div className="relative w-full h-48 mb-4">
        <Image
          src={item.image}
          alt="Product Thumbnail"
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>

      <h1 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        {item.title}
      </h1>
      <div className="flex items-center justify-between mb-2">
        <StarRating rating={item.rating} />
        <span className="text-sm text-gray-600 dark:text-gray-400">
          ({item.reviews} Reviews)
        </span>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          {item.price}
        </h2>
      </div>
      <a
        href={item.affiliateLink}
        className="inline-block w-full px-4 py-2 text-center bg-blue-500 text-white font-medium rounded hover:bg-blue-600 transition-colors"
        target="_blank"
        rel="noopener noreferrer"
      >
        Buy Now
      </a>
    </div>
  );
};

export default StoreCard;
