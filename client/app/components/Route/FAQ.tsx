import { useGetHeroDataQuery } from '@/redux/layout/layoutApi';
import React, { useEffect, useState } from 'react'
import { HiMinus, HiPlus } from 'react-icons/hi';

type Props = {}

const FAQ = (props: Props) => {
    const { data, isLoading } = useGetHeroDataQuery("FAQ", {
        refetchOnMountOrArgChange: true,
    });
    const [questions, setQuestions] = useState<any[]>([]);
    const [activeQuestion, setActiveQuestion] = useState(null);

    useEffect(() => {
        if (data) {
            setQuestions(data.layout.faq);
        }
    }, [data])

    const toggleQuestion = (id: any) => {
        setActiveQuestion(id === activeQuestion ? null : id);
    }

    return (
        <div className='bg-light-text-background dark:bg-dark-background'>
            <div className="w-[90%] 800px:w-[80%] m-auto">
                <h1 className="text-center text-2xl sm:text-3xl lg:text-4xl font-bold text-light-text dark:text-dark-text">
                    Frequently Asked Questions
                </h1>
                <div className="mt-12">
                    <dl className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-8">
                        {questions.map((q: any) => (
                            <div
                                key={q._id}
                                className="border border-light-accent-grey dark:border-dark-accent-grey p-5 relative"
                            >
                                <div className="absolute left-0 top-0 h-full w-1 bg-light-primary dark:bg-light-accent-darkGrey "></div>
                                <dt className="text-lg">
                                    <button
                                        className="flex items-start text-light-text dark:text-dark-text justify-between w-full text-left focus:outline-none"
                                        onClick={() => toggleQuestion(q._id)}
                                    >
                                        <span className='font-medium'>{q.question}</span>
                                        <span className="ml-6 flex-shrink-0">
                                            {activeQuestion === q._id ? (
                                                <HiMinus className="h-6 w-6" />
                                            ) : (
                                                <HiPlus className="h-6 w-6" />
                                            )}
                                        </span>
                                    </button>
                                </dt>
                                {activeQuestion === q._id && (
                                    <dd className="mt-2 pr-12">
                                        <p className='text-base font-Josefin text-light-text dark:text-dark-text'>{q.answer}</p>
                                    </dd>
                                )}
                            </div>
                        ))}
                    </dl>
                    <br />
                    <br />
                    <br />
                </div>
            </div>
        </div>
    )
}

export default FAQ;
