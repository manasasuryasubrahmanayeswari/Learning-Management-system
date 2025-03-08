'use client'
import React, { FC, Suspense, useEffect, useState } from "react";
import { useGetUsersAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import { useGetHeroDataQuery } from "@/redux/layout/layoutApi";
import { useSearchParams, useRouter } from "next/navigation";
import Header from "../components/Header";
import Heading from "../utils/Heading";
import Loader from "../components/Loader/Loader";
import { styles } from "../styles/style";
import CourseCard from "../components/Course/CourseCard";

type Props = {};

const CoursesContent: FC<Props> = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const search = searchParams?.get("title");
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("Login");
  const [courses, setCourses] = useState([]);
  const [category, setCategory] = useState("All");
  const [searchInput, setSearchInput] = useState(search || "");

  const { data, isLoading } = useGetUsersAllCoursesQuery(undefined, {});
  const { data: categoriesData } = useGetHeroDataQuery("Categories", {});

  useEffect(() => {
    if (data) {
      let filteredCourses = data.courses;

      if (category !== "All") {
        filteredCourses = filteredCourses.filter((course: any) =>
          course.categories === category
        );
      }

      if (search) {
        filteredCourses = filteredCourses.filter((course: any) =>
          course.name.toLowerCase().includes(search.toLowerCase())
        );
      }

      setCourses(filteredCourses);
    }
  }, [data, category, search]);

  const categories = categoriesData?.layout.categories;

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`?title=${searchInput}`);
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Header
            open={open}
            setOpen={setOpen}
            activeItem={1}
            setRoute={setRoute}
            route={route}
          />
          <div className="w-[95%] 800px:w-[85%] m-auto min-h-[70vh]">
            <Heading
              title="All courses - StarFetch"
              description="Explore all courses"
              keywords="programming, robotics, AI, machine learning"
            />
            <br />
            <div className="w-full flex items-center flex-wrap">
              <div
                className={`h-[35px] ${
                  category === "All" ? "bg-[crimson]" : "bg-[#5050cb]"
                } m-3 px-3 rounded-[30px] flex items-center justify-center font-poppins cursor-pointer`}
                onClick={() => setCategory("All")}
              >
                All
              </div>
              {categories &&
                categories.map((cat: any, index: number) => (
                  <div key={index}>
                    <div
                      className={`h-[35px] ${
                        category === cat.title ? "bg-[crimson]" : "bg-[#5050cb]"
                      } m-3 px-3 rounded-[30px] flex items-center justify-center font-poppins cursor-pointer`}
                      onClick={() => setCategory(cat.title)}
                    >
                      {cat.title}
                    </div>
                  </div>
                ))}
            </div>
            <br />
            <form onSubmit={handleSearch} className="w-full flex justify-center my-4">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-[70%] px-4 py-2 border rounded-md focus:outline-none"
                placeholder="Search courses by title"
              />
              <button
                type="submit"
                className="ml-2 px-4 py-2 bg-[crimson] text-white rounded-md"
              >
                Search
              </button>
            </form>
            {courses && courses.length === 0 && (
              <p className={`${styles.label} justify-center min-h-[50vh] flex items-center`}>
                {search ? "No courses found!" : "No courses yet"}
              </p>
            )}
            <br />
            <br />
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px] mb-12 border-0">
              {courses && courses.map((item: any, index: number) => (
                <CourseCard key={index} item={item} />
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

const Page: FC<Props> = (props) => {
  return (
    <Suspense fallback={<Loader />}>
      <CoursesContent />
    </Suspense>
  );
};

export default Page;
