import {
    useEditLayoutMutation,
    useGetHeroDataQuery,
  } from "@/redux/layout/layoutApi";
  import React, { useEffect, useState } from "react";
  import { HiMinus, HiPlus } from "react-icons/hi";
  import { AiOutlineDelete } from "react-icons/ai";
  import { IoMdAddCircleOutline } from "react-icons/io";
  import { styles } from "@/app/styles/style";
  import toast, { Toaster } from "react-hot-toast";
  
  type Props = {};
  
  const EditFaq = (props: Props) => {
    const { data, isLoading } = useGetHeroDataQuery("FAQ", {
      refetchOnMountOrArgChange: true,
    });
    const [questions, setQuestions] = useState<any[]>([]);
    const [editLayout, { isLoading: editLoading, error, isSuccess }] =
      useEditLayoutMutation();
  
    useEffect(() => {
      if (data) {
        setQuestions(data.layout.faq);
      }
    }, [data]);
  
    useEffect(() => {
      if (isSuccess) {
        toast.success("FAQ updated successfully!");
      }
      if (error) {
        toast.error("Failed to update FAQ. Please try again.");
      }
    }, [isSuccess, error]);
  
    const toggleQuestion = (id: string) => {
      setQuestions((prevQuestions) =>
        prevQuestions.map((q) => (q._id === id ? { ...q, active: !q.active } : q))
      );
    };
  
    const handleQuestionChange = (id: string, value: string) => {
      setQuestions((prevQuestions) =>
        prevQuestions.map((q) => (q._id === id ? { ...q, question: value } : q))
      );
    };
  
    const handleAnswerChange = (id: string, value: string) => {
      setQuestions((prevQuestions) =>
        prevQuestions.map((q) => (q._id === id ? { ...q, answer: value } : q))
      );
    };
  
    const newFaqHandler = () => {
      setQuestions([
        ...questions,
        { _id: Date.now().toString(), question: "", answer: "", active: true },
      ]);
    };
  
    const handleEdit = async () => {
      if (
        !areQuestionsUnchanged(data.layout.faq, questions) &&
        !isAnyQuestionEmpty(questions)
      ) {
        await editLayout({
          type: "FAQ",
          faq: questions,
        });
      }
    };
  
    const areQuestionsUnchanged = (originalQuestions: any[], newQuestions: any[]) => {
      return JSON.stringify(originalQuestions) === JSON.stringify(newQuestions);
    };
  
    const isAnyQuestionEmpty = (questions: any[]) => {
      return questions.some((q) => !q.question || !q.answer);
    };
  
    return (
      <div className="w-[90%] 800px:w-[80%] m-auto mt-[120px]">
        <Toaster />
        <div className="mt-12">
          <dl className="space-y-8">
            {questions.map((q: any) => (
              <div
                key={q._id}
                className={`${q._id !== questions[0]?._id && "border-t"} border-gray-200 pt-6`}
              >
                <dt className="text-lg">
                  <button
                    className="flex items-start dark:text-white text-black justify-between w-full text-left focus:outline-none"
                    onClick={() => toggleQuestion(q._id)}
                  >
                    <input
                      className="border-none text-black w-full focus:outline-none"
                      value={q.question}
                      onChange={(e) => handleQuestionChange(q._id, e.target.value)}
                      placeholder={"Add your question..."}
                    />
                    <span className="ml-6 flex-shrink-0">
                      {q.active ? (
                        <HiMinus className="h-6 w-6" />
                      ) : (
                        <HiPlus className="h-6 w-6" />
                      )}
                    </span>
                  </button>
                </dt>
                {q.active && (
                  <dd className="mt-2 pr-12">
                    <input
                      className="border-none text-black w-full focus:outline-none"
                      value={q.answer}
                      onChange={(e) => handleAnswerChange(q._id, e.target.value)}
                      placeholder={"Add your answer..."}
                    />
                    <span className="ml-6 flex-shrink-0">
                      <AiOutlineDelete
                        className="dark:text-white text-black text-[18px] cursor-pointer"
                        onClick={() => {
                          setQuestions((prevQuestions) =>
                            prevQuestions.filter((item) => item._id !== q._id)
                          );
                        }}
                      />
                    </span>
                  </dd>
                )}
              </div>
            ))}
          </dl>
          <br />
          <br />
          <IoMdAddCircleOutline
            className="dark:text-white text-black text-[25px] cursor-pointer"
            onClick={newFaqHandler}
          />
        </div>
        <div
          className={`${
            areQuestionsUnchanged(data?.layout?.faq, questions) ||
            isAnyQuestionEmpty(questions)
              ? "!cursor-not-allowed"
              : "!cursor-pointer !bg-[#42d383]"
          } ${
            styles.button
          } w-[100px] min-h-[40px] !h-[40px] text-center dark:text-white text-black bg-[#cccccc34] !rounded absolute bottom-12 right-12`}
          onClick={() =>
            areQuestionsUnchanged(data?.layout?.faq, questions) ||
            isAnyQuestionEmpty(questions)
              ? null
              : handleEdit()
          }
        >
          Save
        </div>
      </div>
    );
  };
  
  export default EditFaq;
  