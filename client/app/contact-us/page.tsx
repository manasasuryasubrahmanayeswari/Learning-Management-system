'use client'
import React, { useState } from "react";
import ContactUs from "../components/Route/ContactUs";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import Footer from "../components/Route/Footer";

type Props = {};

const Page: React.FC<Props> = () => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(4);
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
      <ContactUs />
      <Footer />
    </div>
  );
};

export default Page;
