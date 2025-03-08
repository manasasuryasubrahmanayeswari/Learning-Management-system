"use client";
import React, { FC, useState } from "react";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import Footer from "../components/Route/Footer";
import StoreCard from "../components/Store/StoreCard";

type Props = {};

const Page: FC<Props> = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(3);
  const [route, setRoute] = useState("Login");
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
    <div>
      <Heading title="starfetch" description="hello" keywords="programming" />
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        setRoute={setRoute}
        route={route}
      />
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <StoreCard key={index} item={product} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Page;
