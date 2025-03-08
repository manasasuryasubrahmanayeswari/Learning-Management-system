'use client'
import React, { FC, useState } from "react";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import AboutUs from "../components/About/AboutUs";
import Footer from "../components/Route/Footer";

type Props = {};

const Page: FC<Props> = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(2);
  const [route, setRoute] = useState("Login");
  
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
      <AboutUs />
      <Footer />
    </div>
  );
};

export default Page;
