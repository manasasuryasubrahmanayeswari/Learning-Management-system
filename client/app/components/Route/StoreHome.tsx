"use client";
import React from "react";
import StoreCard from "../Store/StoreCard";

type Props = {};

const StoreHome = (props: Props) => {
  const products = [
    {
      image: "https://m.media-amazon.com/images/I/71YEaWZUQ4L._SX522_.jpg",
      title: "Sample Product 1",
      price: "$99.99",
      rating: 4.5,
      reviews: 120,
      affiliateLink:
        "https://www.amazon.in/ApTechDeals-Electric-Magnetic-Gearbox-Plastic/dp/B07Q22QS3R/ref=pd_rhf_gw_s_pd_crcd_d_sccl_1_4/257-4357967-2790321?pd_rd_w=CyXaq&content-id=amzn1.sym.785b16db-ca40-46a3-ae75-2b38bb48d1aa&pf_rd_p=785b16db-ca40-46a3-ae75-2b38bb48d1aa&pf_rd_r=2JFA7G7CR47EF9C58RC0&pd_rd_wg=FfowV&pd_rd_r=7c801514-9143-4cfb-9727-2478e2e670f3&pd_rd_i=B07Q22QS3R&psc=1",
    },
    {
      image: "https://m.media-amazon.com/images/I/71YEaWZUQ4L._SX522_.jpg",
      title: "Sample Product 2",
      price: "$49.99",
      rating: 4.0,
      reviews: 80,
      affiliateLink:
        "https://www.amazon.in/ApTechDeals-Electric-Magnetic-Gearbox-Plastic/dp/B07Q22QS3R/ref=pd_rhf_gw_s_pd_crcd_d_sccl_1_4/257-4357967-2790321?pd_rd_w=CyXaq&content-id=amzn1.sym.785b16db-ca40-46a3-ae75-2b38bb48d1aa&pf_rd_p=785b16db-ca40-46a3-ae75-2b38bb48d1aa&pf_rd_r=2JFA7G7CR47EF9C58RC0&pd_rd_wg=FfowV&pd_rd_r=7c801514-9143-4cfb-9727-2478e2e670f3&pd_rd_i=B07Q22QS3R&psc=1",
    },
    // Add more products as needed
  ];

  return (
    <div className="flex items-center justify-center bg-light-background dark:bg-dark-background">
      <div className="w-[90%] 800px:w-[80%] m-auto ">
        <h1 className="text-center font-Josefin text-[25px] leading-[35px] sm:text-3xl lg:text-4xl dark:text-dark-text 800px:!leading-[60px] text-light-text font-[700] tracking-tight pb-5">
          Discover the <span className="text-gradient">Best Deals</span>
          <br />
          on Your Favorite Products
        </h1>

        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px] mb-12 border-0">
          {products.map((product, index) => (
            <StoreCard key={index} item={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StoreHome;
