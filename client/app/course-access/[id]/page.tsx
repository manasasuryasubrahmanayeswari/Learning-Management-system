'use client'
import Loader from '@/app/components/Loader/Loader';
import { useLoadUserQuery } from '@/redux/features/api/apiSlice';
import { redirect } from 'next/navigation';
import React, { FC, useEffect } from 'react';
import CourseContent from "../../components/Course/CourseContent";

type Props = {
    params: { id: string };
}

const Page: FC<Props> = ({ params }) => {
    const { id } = params;
    const { isLoading, error, data } = useLoadUserQuery(undefined, {});

    useEffect(() => {
        if (data) {
            const isPurchased = data.user.courses.some((item: any) => item._id === id);
            if (!isPurchased) {
                redirect("/");
            }
        } else if (error) {
            redirect("/");
        }
    }, [data, error, id]);

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <div>
                    <CourseContent id={id} user={data?.user}/>
                </div>
            )}
        </>
    );
}

export default Page;
