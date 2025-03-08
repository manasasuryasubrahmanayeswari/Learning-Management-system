import {
    useEditLayoutMutation,
    useGetHeroDataQuery,
  } from "@/redux/layout/layoutApi";
  import React, { useEffect, useState } from "react";
  import Loader from "../../Loader/Loader";
  import { styles } from "@/app/styles/style";
  import { AiOutlineDelete } from "react-icons/ai";
  import { IoMdAddCircleOutline } from "react-icons/io";
  import toast from "react-hot-toast";
  
  type Props = {};
  
  const EditCategories = (props: Props) => {
    const { data, isLoading } = useGetHeroDataQuery("Categories", {
      refetchOnMountOrArgChange: true,
    });
  
    const [editLayout, { isLoading: editLoading, error, isSuccess }] =
      useEditLayoutMutation();
    const [categories, setCategories] = useState<any[]>([]);
  
    useEffect(() => {
      if (data) {
        setCategories(data.layout.categories);
      }
    }, [data]);
  
    useEffect(() => {
      if (isSuccess) {
        toast.success("Categories updated successfully!");
      }
      if (error) {
        toast.error("Failed to update categories");
      }
    }, [isSuccess, error]);
  
    const handleCategoriesAdd = (id: string, title: string) => {
      setCategories((prevCategories) =>
        prevCategories.map((category) =>
          category._id === id ? { ...category, title } : category
        )
      );
    };
  
    const handleDeleteCategory = (id: string) => {
      setCategories((prevCategories) =>
        prevCategories.filter((category) => category._id !== id)
      );
    };
  
    const newCategoriesHandler = () => {
      if (categories.length && categories[categories.length - 1].title === "") {
        toast.error("Category title cannot be empty");
      } else {
        setCategories((prevCategory: any) => [...prevCategory, { title: "" }]);
      }
    };
  
    const areCategoriesUnchanged = (
      initialCategories: any[],
      updatedCategories: any[]
    ) => {
      return (
        initialCategories.length === updatedCategories.length &&
        initialCategories.every(
          (cat, idx) => cat.title === updatedCategories[idx].title
        )
      );
    };
  
    const isAnyCategoryTitleEmpty = (categories: any[]) => {
      return categories.some((category) => category.title.trim() === "");
    };
  
    const editCategoriesHandler = async () => {
      if (
        !areCategoriesUnchanged(data.layout.categories, categories) &&
        !isAnyCategoryTitleEmpty(categories)
      ) {
        await editLayout({
          type: "Categories",
          categories,
        });
      }
    };
  
    return (
      <>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="mt-[120px] text-center">
            <h1 className={`${styles.title}`}>All Categories</h1>
            {categories &&
              categories.map((item, index) => {
                return (
                  <div key={index} className="p-3">
                    <div className="flex items-center w-full justify-center">
                      <input
                        className={`${styles.input} !w-[unset] !border-none !text-[20px]`}
                        value={item.title}
                        onChange={(e) =>
                          handleCategoriesAdd(item._id, e.target.value)
                        }
                        placeholder="Enter category title..."
                      />
                      <AiOutlineDelete
                        className="dark:text-white text-black text-[18px] cursor-pointer"
                        onClick={() => handleDeleteCategory(item._id)}
                      />
                    </div>
                  </div>
                );
              })}
            <br />
            <br />
            <div className="w-full flex justify-center">
              <IoMdAddCircleOutline
                className="dark:text-white text-black text-[25px] cursor-pointer"
                onClick={newCategoriesHandler}
              />
            </div>
            <div
              className={`${styles.button} !w-[100px] !min-h-[40px] !h-[40px] dark:text-white text-black bg-[#cccccc34] ${
                areCategoriesUnchanged(data.layout.categories, categories) ||
                isAnyCategoryTitleEmpty(categories)
                  ? "!cursor-not-allowed"
                  : "!cursor-pointer !bg-[#42d383]"
              } !rounded absolute bottom-12 right-12`}
              onClick={
                areCategoriesUnchanged(data.layout.categories, categories) ||
                isAnyCategoryTitleEmpty(categories)
                  ? () => null
                  : editCategoriesHandler
              }
            >
              Save
            </div>
          </div>
        )}
      </>
    );
  };
  
  export default EditCategories;
  