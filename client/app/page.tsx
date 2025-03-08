"use client";
import React, { FC, useState } from "react";
import Heading from "./utils/Heading";
import Header from "./components/Header";
import Hero from "./components/Route/Hero";
import Courses from "./components/Route/Courses";
import Reviews from "./components/Route/Reviews";
import FAQ from "./components/Route/FAQ";
import Footer from "./components/Route/Footer";
import AboutUsHome from "./components/Route/AboutUsHome";
import WhyChooseUs from "./components/Route/WhyChooseUs";
import ContactUs from "./components/Route/ContactUs"
import StoreHome from "./components/Route/StoreHome";

interface Props {}

const Page: FC<Props> = () => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("Login");

  return (
    <div className="bg-white dark:bg-dark-background">
      <Heading title="starfetch" description="hello" keywords="programming" />
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        setRoute={setRoute}
        route={route}
      />
      <Hero />
      <AboutUsHome />
      <Courses />
      <StoreHome/>
      <WhyChooseUs />
      <Reviews />
      {/*<ContactUs/>
      <FAQ />*/}
      <Footer />
    </div>
  );
};

export default Page;
