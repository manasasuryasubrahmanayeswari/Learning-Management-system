import React, { useEffect, useState } from "react";
import CourseCard from "../Course/CourseCard"; // Adjust the import path as needed
import { useGetUsersAllCoursesQuery } from "@/redux/features/courses/coursesApi"; // Adjust the import path as needed

const Courses = () => {
  const { data, isLoading, isError } = useGetUsersAllCoursesQuery({});
  const [courses, setCourses] = useState<any>([]);

  useEffect(() => {
    if (!isLoading && !isError) {
      setCourses(data?.courses || []);
    }
  }, [data, isLoading, isError]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data...</div>;
  }

  return (
    <div className="flex items-center justify-center bg-light-background dark:bg-dark-background">
      <div className="w-[90%] 800px:w-[80%] m-auto">
        <h1 className="text-center font-Josefin text-[25px] leading-[35px] sm:text-3xl lg:text-4xl dark:text-dark-text 800px:!leading-[60px] text-light-text font-[700] tracking-tight pb-5">
          Expanding Your Career <span className="text-gradient">Opportunity</span>
          <br />
          Opportunity With Our Courses
        </h1>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px] mb-12 border-0">
          {courses.map((item: any) => (
            <CourseCard key={item._id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
