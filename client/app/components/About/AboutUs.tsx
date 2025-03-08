import React, { useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import aboutImg from "../../../public/assets/aboutustrail.jpg";
import aboutDiy from "../../../public/assets/about_robotics.png";

gsap.registerPlugin(ScrollTrigger);

const AboutUs = () => {
  useEffect(() => {
    // Initialize GSAP ScrollTrigger
    ScrollTrigger.defaults({ toggleActions: "play none none reverse" });

    // Animation for each section
    const sections = document.querySelectorAll(".about-section");

    sections.forEach((section) => {
      const left = section.querySelector(".about-left");
      const right = section.querySelector(".about-right");

      gsap.fromTo(
        left,
        { opacity: 0, x: -100 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 60%",
          },
        }
      );

      gsap.fromTo(
        right,
        { opacity: 0, x: 100 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 60%",
          },
        }
      );
    });
  }, []);

  return (
    <div className="bg-white dark:bg-dark-background text-light-text dark:text-dark-text min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <section className="about-section grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-10 mb-10">
          <div className="md:order-2 about-right px-1">
            <h1 className="text-4xl md:text-5xl font-bold text-light-text dark:text-dark-text mb-4">
              Welcome to STARFETCH – Pioneering the Future of Education and
              Technology
            </h1>
            <p className="text-lg text-light-accent-darkGrey dark:text-dark-accent-lightGrey mb-8">
              At STARFETCH, we are on a relentless mission to shape the world
              through innovation, education, and advanced technology. Our
              synergy of Robotics and Artificial Intelligence transcends
              boundaries, pushing the limits of what&apos;s possible.
            </p>
          </div>
          <div className="md:order-1 about-left">
            <div className="mb-8">
              <Image
                src={aboutImg}
                alt="About Us Hero Image"
                width={600}
                height={400}
                layout="responsive"
                className="rounded-[30px]"
              />
            </div>
          </div>
        </section>

        <hr className="mx-auto h-[2px] bg-light-text dark:bg-dark-accent-grey w-[70%] sm:w-[300px] md:w-[350px] lg:w-[400px] xl:w-[450px] opacity-20" />

        {/* Vision Section */}
        <section className="about-section grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-20 mb-10">
          <div className="about-left">
            <h2 className="text-3xl md:text-4xl font-bold text-light-text dark:text-dark-text mb-4">
              Our Vision
            </h2>
            <p className="text-lg text-light-accent-darkGrey dark:text-dark-accent-lightGrey">
              STARFETCH envisions a future where education and technology
              seamlessly integrate, revolutionizing learning. Innovation is at
              our core, propelling us towards a future where progress knows no
              bounds.
            </p>
          </div>
          <div className="about-right">
            <div className="mb-8 px-1">
              <Image
                src={aboutImg}
                alt="Vision Image"
                width={600}
                height={400}
                layout="responsive"
                className="rounded-[30px]"
              />
            </div>
          </div>
        </section>

        <hr className="mx-auto h-[2px] bg-light-text dark:bg-dark-accent-grey w-[70%] sm:w-[300px] md:w-[350px] lg:w-[400px] xl:w-[450px] opacity-20" />

        {/* Who We Are Section */}
        <section className="about-section grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-20 mb-10">
          <div className="md:order-2 about-right">
            <h2 className="text-3xl md:text-4xl font-bold text-light-text dark:text-dark-text mb-4">
              Who We Are
            </h2>
            <p className="text-lg text-light-accent-darkGrey dark:text-dark-accent-lightGrey">
              STARFETCH is more than a company; it&apos;s a collective of visionary
              engineers, educators, and technologists dedicated to creating
              impactful change. Our team&apos;s diversity and expertise converge to
              drive innovation and collaboration, shaping a transformative
              future.
            </p>
          </div>
          <div className="md:order-1 about-left">
            <div className="mb-8">
              <Image
                src={aboutImg}
                alt="Who We Are Image"
                width={600}
                height={400}
                layout="responsive"
                className="rounded-[30px]"
              />
            </div>
          </div>
        </section>

        <hr className="mx-auto h-[2px] bg-light-text dark:bg-dark-accent-grey w-[70%] sm:w-[300px] md:w/[350px] lg:w-[400px] xl:w/[450px] opacity-20" />

        {/* Explore Our Services Section */}
        <section className="about-section grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-20 mb-10">
          <div className="about-left">
            <h2 className="text-3xl md:text-4xl font-bold text-light-text dark:text-dark-text mb-4">
              Explore Our Services
            </h2>
            <p className="text-lg text-light-accent-darkGrey dark:text-dark-accent-lightGrey">
              Embark on a journey of knowledge exploration with STARFETCH. Our
              robotics courses and interactive workshops provide immersive
              educational experiences for learners of all ages.
            </p>
          </div>
          <div className="about-right">
            <div className="mb-8 px-1">
              <Image
                src={aboutImg}
                alt="Explore Services Image"
                width={600}
                height={400}
                layout="responsive"
                className="rounded-[30px]"
              />
            </div>
          </div>
        </section>

        <hr className="mx-auto h/[2px] bg-light-text dark:bg-dark-accent-grey w/[70%] sm:w/[300px] md:w/[350px] lg:w/[400px] xl:w/[450px] opacity-20" />

        {/* Starfetch Innovation (SIT) Lab Section */}
        <section className="about-section grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-20 mb-10">
          <div className="md:order-2 about-right">
            <h2 className="text-3xl md:text-4xl font-bold text-light-text dark:text-dark-text mb-4">
              Starfetch Innovation (SIT) Lab
            </h2>
            <p className="text-lg text-light-accent-darkGrey dark:text-dark-accent-lightGrey">
              At the STARFETCH Innovation Lab, curiosity meets innovation. It&apos;s
              a collaborative space designed to inspire creativity and nurture
              groundbreaking ideas. Join us in shaping a limitless future.
            </p>
          </div>
          <div className="md:order-1 about-left">
            <div className="mb-8">
              <Image
                src={aboutImg}
                alt="Innovation Lab Image"
                width={600}
                height={400}
                layout="responsive"
                className="rounded-[30px]"
              />
            </div>
          </div>
        </section>

        <hr className="mx-auto h/[2px] bg-light-text dark:bg-dark-accent-grey w/[70%] sm:w/[300px] md:w/[350px] lg:w/[400px] xl:w/[450px] opacity-20" />

        {/* What We Offer Section */}
        <section className="about-section grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-20 mb-10">
          <div className="about-left">
            <h2 className="text-3xl md:text-4xl font-bold text-light-text dark:text-dark-text mb-4">
              What We Offer
            </h2>
            <p className="text-lg text-light-accent-darkGrey dark:text-dark-accent-lightGrey">
              STARFETCH offers cutting-edge technology, hands-on learning
              experiences, expert guidance, collaboration opportunities, and
              continuous inspiration through our Innovation Lab.
            </p>
          </div>
          <div className="about-right">
            <div className="mb-8 px-1">
              <Image
                src={aboutImg}
                alt="What We Offer Image"
                width={600}
                height={400}
                layout="responsive"
                className="rounded/[30px]"
              />
            </div>
          </div>
        </section>

        <hr className="mx-auto h/[2px] bg-light-text dark:bg-dark-accent-grey w/[70%] sm:w/[300px] md:w/[350px] lg:w/[400px] xl:w/[450px] opacity-20" />

        {/* Importance of Agriculture Section */}
        <section className="about-section grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-20 mb-10">
          <div className="md:order-2 about-right">
            <h2 className="text-3xl md:text-4xl font-bold text-light-text dark:text-dark-text mb-4">
              Importance of Agriculture
            </h2>
            <p className="text-lg text-light-accent-darkGrey dark:text-dark-accent-lightGrey">
              Discover the critical role of agriculture in global
              sustainability. Explore sustainable farming practices and
              innovative solutions through collaborative projects at STARFETCH.
            </p>
          </div>
          <div className="md:order-1 about-left">
            <div className="mb-8">
              <Image
                src={aboutImg}
                alt="Agriculture Image"
                width={600}
                height={400}
                layout="responsive"
                className="rounded/[30px]"
              />
            </div>
          </div>
        </section>

        <hr className="mx-auto h/[2px] bg-light-text dark:bg-dark-accent-grey w/[70%] sm:w/[300px] md:w/[350px] lg:w/[400px] xl:w/[450px] opacity-20" />

        {/* DIY Tutorials and Projects Section */}
        <section className="about-section grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-20 mb-10">
          <div className="about-left">
            <h2 className="text-3xl md:text-4xl font-bold text-light-text dark:text-dark-text mb-4">
              DIY Tutorials and Projects
            </h2>
            <p className="text-lg text-light-accent-darkGrey dark:text-dark-accent-lightGrey">
              Dive into a world of creativity and skill development with
              STARFETCH&apos;s DIY tutorials. From robotics to arts and crafts, our
              projects empower learners to explore and innovate.
            </p>
          </div>
          <div className="about-right">
            <div className="mb-8 px-1">
              <Image
                src={aboutDiy}
                alt="DIY Tutorials and Projects Image"
                width={600}
                height={400}
                layout="responsive"
                className="rounded/[30px]"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
