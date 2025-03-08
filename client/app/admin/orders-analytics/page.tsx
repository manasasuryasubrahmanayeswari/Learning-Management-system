'use client'
import React from 'react'
import AdminSidebar from '../../components/Admin/Sidebar/AdminSidebar';
import Heading from '../../../app/utils/Heading';
import OrdersAnalytics from "../../components/Admin/Analytics/OrdersAnalytics"
import DashboardHeader from '../../components/Admin/DashboardHeader';

type Props = {}

const Page: React.FC<Props> = () => {
  return (
    <div>
      <Heading
        title="StarFetch-Admin"
        description='Starfetch is a platform for students to learn and get help from teachers'
        keywords='Aurduino,3dcad'
      />
      <div className="flex">
        <div className="1500px:w-[16%] w-1/5">
          <AdminSidebar />
        </div>
        <div className="w-[85%]">
          <DashboardHeader />
          <OrdersAnalytics />
        </div>
      </div>
    </div>
  )
}

export default Page;
