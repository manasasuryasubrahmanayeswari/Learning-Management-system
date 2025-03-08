import React, { FC, useState, useEffect } from "react";
import SideBarProfile from "./SideBarProfile";
import { useLogOutMutation } from "@/redux/features/auth/authApi";
import { signOut } from "next-auth/react";
import ProfileInfo from "./ProfileInfo";
import ChangePassword from "./ChangePassword";
import CourseCard from "../Course/CourseCard";
import { useGetUsersAllCoursesQuery } from "@/redux/features/courses/coursesApi";

type Props = {
  user: any;
};

const Profile: FC<Props> = ({ user }) => {
  const [scroll, setScroll] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [active, setActive] = useState(1);
  const [logout, setLogout] = useState(false);
  const [logOut] = useLogOutMutation();
  const [courses, setCourses] = useState([]);
  const { data, isLoading, isError } = useGetUsersAllCoursesQuery(
    undefined,
    {}
  );

  const logOutHandler = async () => {
    await signOut();
    setLogout(true);
    await logOut();
    window.location.href = "/";
  };

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 85);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (data) {
      const filteredCourses = user.courses
        .map((userCourse: any) =>
          data.courses.find((course: any) => course._id === userCourse._id)
        )
        .filter((course: any) => course !== undefined);
      setCourses(filteredCourses);
    }
  }, [data, user]);

  return (
    <div className="w-full flex flex-col md:flex-row mx-auto p-4 md:p-8 lg:p-12 xl:p-16">
      <div
        className={`w-full md:w-[60px] md:min-w-[310px] h-[450px] bg-[#FFFFE0] dark:bg-[#333300] bg-opacity-90 border border-[#FFD700] rounded-[5px] shadow-sm mt-4 md:mt-0 mb-4 md:mb-0 md:mr-8 sticky ${
          scroll ? "md:top-[120px]" : "md:top-[30px]"
        } md:left-[30px]`}
      >
        <SideBarProfile
          user={user}
          active={active}
          avatar={avatar}
          setActive={setActive}
          logOutHandler={logOutHandler}
        />
      </div>
      {active === 1 && (
        <div className="w-full mt-4 md:mt-0 md:pl-8">
          <ProfileInfo user={user} avatar={avatar} />
        </div>
      )}
      {active === 2 && (
        <div className="w-full mt-4 md:mt-0 md:pl-8">
          <ChangePassword />
        </div>
      )}
      {active === 3 && (
        <div className="w-full pl-7 px-2 800px:px-10 800px:pl-8">
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px] mb-12 border-0">
            {courses &&
              courses.map((item: any, index: number) => (
                <CourseCard
                  key={index}
                  item={item}
                  user={user}
                  isProfile={true}
                />
              ))}
          </div>
          {courses.length === 0 && (
            <h1 className="text-center text-[18px] font-poppins">
              You don&apos;t have any purchased courses!
            </h1>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
