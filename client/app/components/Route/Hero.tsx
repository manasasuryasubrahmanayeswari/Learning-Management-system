'use client'
import React, { FC, useState } from "react";
import Image from 'next/image'; // Assuming you are using Next.js, otherwise import appropriately
import Link from 'next/link';
import { useGetHeroDataQuery } from "@/redux/layout/layoutApi";
import BackgroundIcon from "../BackgroundIcons";
import { FaFacebook, FaInstagram, FaLinkedin, FaReact } from "react-icons/fa";
import { AiOutlineCode } from "react-icons/ai";
import { FaTwitter } from 'react-icons/fa';
import Loader from "../Loader/Loader";
import { useRouter } from "next/navigation";
import { BiSearch } from "react-icons/bi";

type Props = {};

const Hero: FC<Props> = (props) => {
  const { data,isLoading, refetch } = useGetHeroDataQuery("Banner", {});
  const [search,setSearch] = useState("");
  const router = useRouter();

  const handleSearch = ()=>{
    if(search === ""){
      return
    }else{
      router.push(`/courses?title=${search}`);
    }
  }

  return (
    <>
    {
      isLoading?(
        <Loader/>
      ):(
        <div className="relative w-full h-screen bg-transparent dark:bg-transparent">
      {/*<BackgroundIcon position="top" icon={FaReact} size={40} bgColor="bg-transparent" opacity={0} top="10px" left="10px" className="animate-bounce" />
      <BackgroundIcon position="bottom" icon={AiOutlineCode} size={40} bgColor="bg-transparent" opacity={25} bottom="100px" right="10px" className="animate-spin-slow" />*/}

      <div className="w-full h-full relative overflow-hidden">
        {/* Image Section */}
        {data?.layout?.banner?.bannerImage?.url && (
          <Image
            src={data.layout.banner.bannerImage.url}
            alt="Hero Image"
            layout="fill"
            objectFit="cover"
            className="absolute inset-0"
          />
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-70"></div>

        {/* Overlay Content Section */}
        <div className="absolute top-0 right-0 w-full lg:w-[50%] h-full flex flex-col justify-center items-start text-left p-4 lg:p-8 bg-opacity-90 bg-transparent dark:bg-transparent">
          <h2 className="text-[32px] sm:text-[40px] font-bold font-Josefin text-dark-text dark:text-dark-text uppercase">
            {data?.layout?.banner?.title}
          </h2>
          <p className="text-dark-secondary dark:text-dark-accent-lightGrey text-[16px] sm:text-[18px] mt-4">
            {data?.layout?.banner?.subTitle}
          </p>
          {/*<div className="w-full mt-6 flex items-center">
          <input
            type="search"
            placeholder="Search Courses..."
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            className="bg-transparent border-2 border-light-primary dark:border-dark-secondary dark:bg-dark-background dark:placeholder-dark-text-accent placeholder-light-accent-grey rounded-l-[5px] p-2 w-full h-[50px] outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary transition-shadow"
          />
          <div className="flex items-center justify-center w-[50px] cursor-pointer h-[50px] bg-light-primary dark:bg-dark-primary rounded-r-[5px] hover:bg-light-accent-grey dark:hover:bg-dark-accent-darkHighlight transition-colors"
          onClick={handleSearch}>
            <BiSearch className="text-light-text dark:text-dark-text" size={30} />
          </div>
        </div>*/}

          <div className="flex items-center space-x-4 relative mt-8">
            <div className="flex space-x-4">
              <Link href="/courses" passHref>
                <div className="bg-light-primary text-light-text dark:bg-dark-primary dark:text-dark-text px-6 py-2 rounded-[5px] hover:bg-light-accent-grey dark:hover:bg-dark-accent-darkHighlight transition-colors cursor-pointer">
                  View Courses
                </div>
              </Link>
              <Link href="/about" passHref>
                <div className="bg-light-primary text-light-text dark:bg-dark-primary dark:text-dark-text px-6 py-2 rounded-[5px] hover:bg-light-accent-grey dark:hover:bg-dark-accent-darkHighlight transition-colors cursor-pointer">
                  Learn More
                </div>
              </Link>
            </div>
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-4 mt-8">
            <Link href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" passHref>
              <div className="text-light-primary dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
                <FaFacebook size={24} />
              </div>
            </Link>
            <Link href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" passHref>
              <div className="text-light-primary dark:text-gray-300 hover:text-blue-400 dark:hover:text-blue-300 transition-colors cursor-pointer">
                <FaTwitter size={24} />
              </div>
            </Link>
            <Link href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" passHref>
              <div className="text-light-primary dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-500 transition-colors cursor-pointer">
                <FaLinkedin size={24} />
              </div>
            </Link>
            <Link href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" passHref>
              <div className="text-light-primary dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 transition-colors cursor-pointer">
                <FaInstagram size={24} />
              </div>
            </Link>
          </div>
        </div>

        {/* Scroll Indicator 
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
          <div className="scroll-indicator">
            <span style={{ width: "50px", height: "5px", backgroundColor: "#ffffff", display: "block" }}></span>
          </div>
        </div>*/}
      </div>
    </div>
      )
    }
    </>
  );
};

export default Hero;
