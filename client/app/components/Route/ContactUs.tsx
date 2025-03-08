import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import { MdLocationOn, MdEmail, MdPhone, MdWeb } from "react-icons/md";
import contactImg from "../../../public/assets/contactus.png";

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gradientLight-start via-gradientLight-medium to-gradientLight-end dark:from-gradientDark-start dark:via-gradientDark-medium dark:to-gradientDark-end py-20">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
          <div className="md:flex">
            {/* Left side - Image and overlay */}
            <div className="md:w-1/2 relative h-64 md:h-auto">
              <Image
                src={contactImg}
                alt="Contact Us"
                layout="fill"
                objectFit="cover"
                className="absolute inset-0"
              />
              {/*<div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white p-8">
                <h2 className="text-4xl font-bold mb-4">Get in Touch</h2>
                <p className="text-xl text-center">
                  We're here to help and answer any question you might have. We look forward to hearing from you!
                </p>
              </div>*/}
            </div>

            {/* Right side - Contact information and form */}
            <div className="md:w-1/2 p-8">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">Contact Information</h3>
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <MdLocationOn className="text-blue-500 mr-4 text-2xl" />
                  <span className="text-gray-700">Sylhet 3100, Bangladesh</span>
                </div>
                <div className="flex items-center">
                  <MdEmail className="text-blue-500 mr-4 text-2xl" />
                  <Link href="mailto:contact@starfetch.in" className="text-gray-700 hover:text-blue-500 transition">
                    contact@starfetch.in
                  </Link>
                </div>
                <div className="flex items-center">
                  <MdPhone className="text-blue-500 mr-4 text-2xl" />
                  <Link href="tel:+8801714457298" className="text-gray-700 hover:text-blue-500 transition">
                    +8801714457298
                  </Link>
                </div>
                <div className="flex items-center">
                  <MdWeb className="text-blue-500 mr-4 text-2xl" />
                  <Link href="https://www.starfetch.in" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-blue-500 transition">
                    www.starfetch.in
                  </Link>
                </div>
              </div>

              {/* Quick Contact Form */}
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                  placeholder="Your Message"
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
                >
                  Send Message
                </button>
              </form>

              {/* Social Media Links */}
              <div className="mt-8">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Connect With Us</h4>
                <div className="flex space-x-4">
                  <Link href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600">
                    <FaFacebook size={24} />
                  </Link>
                  <Link href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-500">
                    <FaTwitter size={24} />
                  </Link>
                  <Link href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-800">
                    <FaLinkedin size={24} />
                  </Link>
                  <Link href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-600">
                    <FaInstagram size={24} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;