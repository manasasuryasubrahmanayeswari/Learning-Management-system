import Image, { StaticImageData } from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { FaQuoteLeft, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import contactImg from "../../../public/assets/hanish.jpg";

gsap.registerPlugin(ScrollTrigger);

interface TestimonialProps {
  imageSrc: StaticImageData;
  name: string;
  designation: string;
  quote: string;
}

const TestimonialCard: React.FC<TestimonialProps & { isMobile: boolean; className?: string }> = ({
  imageSrc,
  name,
  designation,
  quote,
  isMobile,
  className = "",
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;

    gsap.fromTo(
      card,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
          end: "bottom 20%",
          scrub: true,
          toggleActions: "play reverse play reverse",
        },
      }
    );
  }, []);

  return (
    <div
      ref={cardRef}
      className={`bg-white dark:bg-dark-background text-light-text dark:text-dark-text rounded-lg shadow-md overflow-hidden p-6 transition-all duration-300 hover:shadow-xl ${
        isMobile ? "h-full" : "h-auto"
      } ${className}`}
    >
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-16 h-16 relative rounded-full overflow-hidden flex-shrink-0">
          <Image
            src={imageSrc}
            alt="Customer Image"
            layout="fill"
            objectFit="cover"
            className="rounded-full"
          />
        </div>
        <div>
          <div className="text-lg font-semibold text-light-text dark:text-light-text">
            {name}
          </div>
          <div className="text-sm text-light-text dark:text-dark-accent-lightGrey">
            {designation}
          </div>
        </div>
      </div>
      <div className="text-sm text-light-text dark:text-light-text">
        <FaQuoteLeft className="h-5 w-5 text-light-accent-darkGrey dark:text-dark-accent-lightGrey inline-block mr-2" />
        <p className="inline-block">{quote}</p>
      </div>
    </div>
  );
};

const Reviews = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const testimonials: TestimonialProps[] = [
    {
      imageSrc: contactImg,
      name: "Mary Gillis",
      designation: "Brooklyn, NY",
      quote: "Mauris faucibus ante quis arcu pellentesque congue. In faucibus ipsum vitae libero hendrerit volutpat. Sed quis mauris consequat, sollicitudin urna ac, mattis neque.",
    },
    {
      imageSrc: contactImg,
      name: "John Doe",
      designation: "Los Angeles, CA",
      quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pulvinar tortor nec lorem consectetur ullamcorper.",
    },
    {
      imageSrc: contactImg,
      name: "Jane Smith",
      designation: "San Francisco, CA",
      quote: "Aliquam erat volutpat. Proin at metus eget turpis maximus vehicula. Ut quis felis nec lectus finibus ultricies.",
    },
    {
      imageSrc: contactImg,
      name: "Emily Johnson",
      designation: "Austin, TX",
      quote: "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis quis lorem ultricies, convallis nisi eget, dignissim sapien.",
    },
    {
      imageSrc: contactImg,
      name: "Michael Brown",
      designation: "Chicago, IL",
      quote: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed euismod nunc id quam tincidunt, a faucibus nisi ultrices.",
    },
    {
      imageSrc: contactImg,
      name: "Sarah Davis",
      designation: "Miami, FL",
      quote: "Fusce vehicula dolor arcu, sit amet blandit dolor mollis nec. Donec viverra eleifend lacus, vitae ullamcorper metus.",
    },
    {
      imageSrc: contactImg,
      name: "David Wilson",
      designation: "Seattle, WA",
      quote: "Curabitur aliquet quam id dui posuere blandit. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus.",
    },
    {
      imageSrc: contactImg,
      name: "Laura Martinez",
      designation: "Denver, CO",
      quote: "Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.",
    },
  ];

  
  const DesktopView = () => (
    <div className="flex flex-wrap -mx-2">
      <div className="w-full px-2 mb-4">
        <TestimonialCard {...testimonials[0]} isMobile={false} className="min-h-[100px]" />
      </div>
      <div className="w-2/3 px-2 mb-4">
        <TestimonialCard {...testimonials[1]} isMobile={false} className="min-h-[100px]" />
      </div>
      <div className="w-1/3 px-2 mb-4">
        <TestimonialCard {...testimonials[2]} isMobile={false} className="min-h-[100px]" />
      </div>
      <div className="w-1/2 px-2 mb-4">
        <TestimonialCard {...testimonials[3]} isMobile={false} className="min-h-[100px]" />
      </div>
      <div className="w-1/2 px-2 mb-4">
        <TestimonialCard {...testimonials[4]} isMobile={false} className="min-h-[100px]" />
      </div>
      <div className="w-1/3 px-2 mb-4">
        <TestimonialCard {...testimonials[5]} isMobile={false} className="min-h-[100px]" />
      </div>
      <div className="w-2/3 px-2 mb-4">
        <TestimonialCard {...testimonials[6]} isMobile={false} className="min-h-[100px]" />
      </div>
      <div className="w-full px-2 mb-4">
        <TestimonialCard {...testimonials[7]} isMobile={false} className="min-h-[100px]" />
      </div>
    </div>
  );

  const MobileView = () => {
    useEffect(() => {
      const interval = setInterval(() => {
        handleNext();
      }, 5000);

      return () => clearInterval(interval);
    }, [currentIndex]);

    const handlePrev = () => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
      );
    };

    const handleNext = () => {
      setCurrentIndex((prevIndex) =>
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    };

    return (
      <div className="relative">
        <div
          ref={carouselRef}
          className="overflow-hidden"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {testimonials.map((testimonial, index) => (
              <div key={index} className="w-full flex-shrink-0 px-4">
                <TestimonialCard {...testimonial} isMobile={true} />
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={handlePrev}
          className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white dark:bg-dark-background rounded-full p-2 shadow-md"
        >
          <FaChevronLeft className="text-light-accent-darkGrey dark:text-dark-accent-lightGrey" />
        </button>
        <button
          onClick={handleNext}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white dark:bg-dark-background rounded-full p-2 shadow-md"
        >
          <FaChevronRight className="text-light-accent-darkGrey dark:text-dark-accent-lightGrey" />
        </button>
      </div>
    );
  };

  return (
    <div className="bg-light-background dark:bg-dark-background text-dark-text dark:text-light-text py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-base font-semibold tracking-wide uppercase text-light-accent-darkGrey dark:text-dark-accent-lightGrey">
            Words from our customers
          </h2>
          <p className="mt-2 text-3xl font-extrabold text-dark-text dark:text-light-text sm:text-4xl">
            What they say about us
          </p>
          <p className="mt-4 text-lg text-light-accent-darkGrey dark:text-dark-accent-lightGrey max-w-2xl mx-auto">
            Discover the experiences of our satisfied customers. Their feedback inspires us to keep improving and providing the best service possible.
          </p>
        </div>

        {isMobile ? <MobileView /> : <DesktopView />}
      </div>
    </div>
  );
};

export default Reviews;