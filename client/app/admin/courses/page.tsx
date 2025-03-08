'use clent'
import AdminProtected from '@/app/hooks/adminProtected'
import Heading from '@/app/utils/Heading'
import React from 'react'
import AdminSidebar from '../../components/Admin/Sidebar/AdminSidebar';
import DashboardHero from '../../components/Admin/DashboardHero'
import  AllCourses from "../../components/Course/AllCourses"
import DashboardHeader from '@/app/components/Admin/DashboardHeader';

type Props = {}

const page = (props: Props) => {
  return (
    <div>
      <AdminProtected>
        <Heading
          title="StarFetch-Admin"
          description="StarFetch is a platform to learn and get help from teachers"
          keywords="Programming,Aurduino,3D CAD"
        />
        <div className="flex h-screen">
          <div className="1500px:w-[16%] w-1/5">
            <AdminSidebar />
          </div>
          <div className="w-[85%]">
            <DashboardHeader/>
            <AllCourses/>
          </div>
        </div>
      </AdminProtected>
    </div>
  )
}

export default page