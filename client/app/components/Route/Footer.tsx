// components/Footer.tsx
import React from 'react';
import Link from 'next/link';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-10 px-16 m-auto">
      <div className="container mx-auto flex flex-wrap lg:flex-nowrap gap-8">
        {/* 1st Division */}
        <div className="flex flex-col items-center lg:items-start w-full lg:w-1/4 order-1 lg:order-2">
          <div className="space-y-4">
            <h3 className="text-white font-bold text-lg text-center lg:text-left">StarFetch Innovations</h3>
            <div className="flex space-x-4 justify-center lg:justify-start">
              <Link href="https://www.facebook.com">
                <FaFacebook className="text-gray-300 hover:text-white" />
              </Link>
              <Link href="https://www.instagram.com">
                <FaInstagram className="text-gray-300 hover:text-white" />
              </Link>
              <Link href="https://www.linkedin.com">
                <FaLinkedin className="text-gray-300 hover:text-white" />
              </Link>
              <Link href="https://www.twitter.com">
                <FaTwitter className="text-gray-300 hover:text-white" />
              </Link>
              <Link href="https://www.youtube.com">
                <FaYoutube className="text-gray-300 hover:text-white" />
              </Link>
            </div>
          </div>
          <div className="mt-8 w-full flex justify-center lg:justify-start">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.843231722707!2d-122.08424968468266!3d37.42199997982519!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fba6e4f0b83bb%3A0xfaa473c0f9c1557d!2sGoogleplex!5e0!3m2!1sen!2sus!4v1632281937699!5m2!1sen!2sus"
              width="100%"
              height="200"
              className="sm:w-[300px] md:w-[300px] lg:w-[250px] "
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
            ></iframe>
          </div>
        </div>

        {/* 2nd Division (Other Three Columns) */}
        <div className="flex flex-wrap justify-between w-full lg:w-3/4 order-2 lg:order-1">
          {/* 2nd Column */}
          <div className="flex flex-col items-center lg:items-start w-full md:w-1/3 mb-8 lg:mb-0">
            <h3 className="text-white font-bold mb-4 text-center lg:text-left">Courses</h3>
            <ul className="space-y-2 text-center lg:text-left">
              <li>
                <Link href="/courses/aurduino" className="hover:underline">
                  Aurduino
                </Link>
              </li>
              <li>
                <Link href="/courses/3d-cad" className="hover:underline">
                  3D CAD
                </Link>
              </li>
              <li>
                <Link href="/courses/drone" className="hover:underline">
                  Drone
                </Link>
              </li>
            </ul>
          </div>

          {/* 3rd Column */}
          <div className="flex flex-col items-center lg:items-start w-full md:w-1/3 mb-8 lg:mb-0">
            <h3 className="text-white font-bold mb-4 text-center lg:text-left">Blog</h3>
            <ul className="space-y-2 text-center lg:text-left">
              <li>
                <Link href="/blog/aurduino" className="hover:underline">
                  Aurduino Blogs
                </Link>
              </li>
              <li>
                <Link href="/blog/3d-cad" className="hover:underline">
                  3D CAD Blogs
                </Link>
              </li>
              <li>
                <Link href="/blog/drone" className="hover:underline">
                  Drone Blogs
                </Link>
              </li>
            </ul>
          </div>

          {/* 4th Column */}
          <div className="flex flex-col items-center lg:items-start w-full md:w-1/3 mb-8 lg:mb-0">
            <h3 className="text-white font-bold mb-4 text-center lg:text-left">Company</h3>
            <ul className="space-y-2 text-center lg:text-left">
              <li>
                <Link href="/about" className="hover:underline">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/legal" className="hover:underline">
                  Legal
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:underline">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/in-media" className="hover:underline">
                  In Media
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="hover:underline">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
