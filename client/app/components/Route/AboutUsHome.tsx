import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import aboutImg from "../../../public/assets/about_home.jpg";

gsap.registerPlugin(ScrollTrigger);

const AboutUsHome = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const sectionElement = sectionRef.current;
    const subtitleElement = subtitleRef.current;

    if (sectionElement && subtitleElement) {
      const left = sectionElement.querySelector(".about-left");
      const right = sectionElement.querySelector(".about-right");

      // Animation for left and right sections
      gsap.fromTo(
        left,
        { opacity: 0, x: -100 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8, // Adjusted duration for faster animation
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionElement,
            start: "top 80%",
            end: "bottom 60%",
            scrub: true, // Smooth animation effect
            //markers: true, // Show ScrollTrigger markers for debugging
          },
        }
      );

      gsap.fromTo(
        subtitleElement,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8, // Adjusted duration for faster animation
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionElement,
            start: "top 80%",
            end: "bottom 60%",
            scrub: true, // Smooth animation effect
          },
        }
      );

      gsap.fromTo(
        right,
        { opacity: 0, x: 100 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8, // Adjusted duration for faster animation
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionElement,
            start: "top 80%",
            end: "bottom 60%",
            scrub: true, // Smooth animation effect
          },
        }
      );
    }
  }, []);

  return (
    <div
      ref={sectionRef}
      className="bg-white dark:bg-dark-background text-light-text dark:text-dark-text py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-10 mb-10">
          <div className="md:order-1 about-left">
            <div className="mb-8">
              <Image
                src={aboutImg}
                alt="About Us Hero Image"
                width={400}
                height={600}
                layout="responsive"
                className="rounded-[30px]"
              />
            </div>
          </div>
          <div className="md:order-2 about-right">
            <h1
              ref={subtitleRef}
              className="text-4xl md:text-5xl font-bold text-light-text dark:text-dark-text mb-4"
            >
              Welcome to STARFETCH &ndash; Pioneering the Future of Education and Technology
            </h1>
            <p className="text-lg text-light-accent-darkGrey dark:text-dark-accent-lightGrey mb-8">
              At STARFETCH, we are on a relentless mission to shape the world through innovation, education, and advanced technology. Our synergy of Robotics and Artificial Intelligence transcends boundaries, pushing the limits of what&apos;s possible.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUsHome;
