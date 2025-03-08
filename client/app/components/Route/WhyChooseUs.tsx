import React, { useEffect, useRef } from "react";
import Image from "next/image";
import aboutImg from "../../../public/assets/about_home.jpg";
import ProgressBar from "./ProgressBar";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WhyChooseUs: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const progressBarRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    gsap.fromTo(sectionRef.current, 
      { opacity: 0, y: 50 },
      { duration: 1, opacity: 1, y: 0, ease: "power3.out", scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%", // Animation starts when top of section is 80% from the top of the viewport
        end: "bottom 20%", // Animation ends when bottom of section is 20% from the bottom of the viewport
        scrub: 1, // Smooth animation
       //markers: true,
      }}
    );
    gsap.fromTo(titleRef.current, 
      { opacity: 0, x: -50 },
      { duration: 1, opacity: 1, x: 0, ease: "power3.out", delay: 0.2, scrollTrigger: {
        trigger: titleRef.current,
        start: "top 80%",
        end: "top 40%",
        scrub: 1,
      }}
    );
    gsap.fromTo(textRef.current, 
      { opacity: 0, x: -50 },
      { duration: 1, opacity: 1, x: 0, ease: "power3.out", delay: 0.4, scrollTrigger: {
        trigger: textRef.current,
        start: "top 80%",
        end: "top 40%",
        scrub: 1,
      }}
    );
    gsap.fromTo(imageRef.current, 
      { opacity: 0, scale: 0.95 },
      { duration: 1, opacity: 1, scale: 1, ease: "power3.out", delay: 0.6, scrollTrigger: {
        trigger: imageRef.current,
        start: "top 80%",
        end: "top 40%",
        scrub: 1,
      }}
    );
    progressBarRefs.current.forEach((progressBar, index) => {
      const finalWidth = progressBar.dataset.width; // Get final width from data attribute
      gsap.fromTo(progressBar, 
        { opacity: 0, width: '0%' },
        { duration: 1, opacity: 1, width: finalWidth, ease: "power3.out", delay: 0.8 + index * 0.2, scrollTrigger: {
          trigger: progressBar,
          start: "top 80%",
          end: "top 40%",
          scrub: 1,
        }}
      );
    });
  }, []);

  return (
    <div ref={sectionRef} className="px-4 sm:px-6 lg:px-8 bg-white dark:bg-dark-background text-light-text dark:text-dark-text">
      <div className="max-w-7xl mx-auto">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center my-10">
          <div>
            <h2 ref={titleRef} className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose Us
            </h2>
            <p ref={textRef} className="text-lg text-light-accent-darkGrey dark:text-dark-accent-lightGrey">
              STARFETCH envisions a future where education and technology
              seamlessly integrate, revolutionizing learning. Innovation is at
              our core, propelling us towards a future where progress knows no
              bounds.
            </p>
            <div className="mt-10">
              <ProgressBar ref={el => { progressBarRefs.current[0] = el! }} label="Innovation" percentage={90} />
              <ProgressBar ref={el => { progressBarRefs.current[1] = el! }} label="Technology Integration" percentage={80} />
              <ProgressBar ref={el => { progressBarRefs.current[2] = el! }} label="Future Readiness" percentage={85} />
              <ProgressBar ref={el => { progressBarRefs.current[3] = el! }} label="Learning Revolution" percentage={75} />
            </div>
          </div>
          <div ref={imageRef} className="mb-8 px-1">
            <Image
              src={aboutImg}
              alt="Vision Image"
              width={600}
              height={400}
              layout="responsive"
              className="rounded-[30px]"
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default WhyChooseUs;
