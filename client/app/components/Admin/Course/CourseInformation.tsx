import { styles } from "@/app/styles/style";
import { useGetHeroDataQuery } from "@/redux/layout/layoutApi";
import React, { FC, useEffect, useState } from "react";
import Image from "next/image";

type Props = {
  courseInfo: any;
  setCourseInfo: (courseInfo: any) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseInformation: FC<Props> = ({
  courseInfo,
  setCourseInfo,
  active,
  setActive,
}) => {
  const [dragging, setDragging] = useState(false);
  const { data } = useGetHeroDataQuery("Categories", {});
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (data) {
      setCategories(data.layout.categories);
    }
  }, [data]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Ensure categories field is set correctly before submitting
    if (!courseInfo.categories || !courseInfo.categories.length) {
      alert("Please select a category");
      return;
    }
    setActive(active + 1);
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setCourseInfo({ ...courseInfo, thumbnail: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: any) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCourseInfo({ ...courseInfo, thumbnail: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-[80%] m-auto mt-24">
      <form onSubmit={handleSubmit} className={`${styles.label}`}>
        <div>
          <label htmlFor="name">Course Name</label>
          <input
            type="text"
            name="name"
            required
            value={courseInfo.name}
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, name: e.target.value })
            }
            id="name"
            placeholder="Arduino Basics"
            className={`${styles.input} bg-yellow-200 border-yellow-600`}
          />
        </div>
        <br />
        <div className="mb-5">
          <label className={`${styles.label}`}>Course Description</label>
          <textarea
            name="description"
            id="description"
            cols={30}
            rows={10}
            placeholder="Write something amazing about Course"
            className={`${styles.input} bg-yellow-200 border-yellow-600`}
            value={courseInfo.description}
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, description: e.target.value })
            }
          ></textarea>
        </div>
        <br />
        <div className="w-full flex justify-between">
          <div className="w-[45%]">
            <label className={`${styles.label}`}>Course Price</label>
            <input
              type="number"
              name="price"
              required
              value={courseInfo.price}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, price: e.target.value })
              }
              id="price"
              placeholder="₹ 500"
              className={`${styles.input} bg-yellow-200 border-yellow-600`}
            />
          </div>
          <div className="w-[50%]">
            <label className={`${styles.label} w-[50%]`}>
              Estimated Price (optional!)
            </label>
            <input
              type="number"
              name="estimatedPrice"
              value={courseInfo.estimatedPrice}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, estimatedPrice: e.target.value })
              }
              id="estimatedPrice"
              placeholder="₹ 1000"
              className={`${styles.input} bg-yellow-200 border-yellow-600`}
            />
          </div>
        </div>
        <br />
        <div className="w-full flex justify-between">
          <div className="w-[45%]">
            <label className={`${styles.label}`} htmlFor="tags">
              Course Tags
            </label>
            <input
              type="text"
              name="tags"
              required
              value={courseInfo.tags}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, tags: e.target.value })
              }
              id="tags"
              placeholder="Arduino, IoT, Embedded Systems"
              className={`${styles.input} bg-yellow-200 border-yellow-600`}
            />
          </div>
          <div className="w-[50%]">
            <label className={`${styles.label} w-[50%]`}>Course Category</label>
            <select
              name="categories"
              id="categories"
              className={`${styles.input} bg-yellow-200 border-yellow-600`}
              value={courseInfo.categories}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, categories: e.target.value })
              }
            >
              <option value="">Select Category</option>
              {categories.map((item: any) => (
                <option value={item.title} key={item._id}>
                  {item.title}
                </option>
              ))}
            </select>
          </div>
        </div>
        <br />
        <div className="w-full flex justify-between">
          <div className="w-[45%]">
            <label className={`${styles.label}`}>Course Level</label>
            <input
              type="text"
              name="level"
              required
              value={courseInfo.level}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, level: e.target.value })
              }
              id="level"
              placeholder="Beginner/Intermediate/Expert"
              className={`${styles.input} bg-yellow-200 border-yellow-600`}
            />
          </div>
          <div className="w-[50%]">
            <label className={`${styles.label} w-[50%]`}>Demo Url</label>
            <input
              type="text"
              name="demoUrl"
              required
              value={courseInfo.demoUrl}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, demoUrl: e.target.value })
              }
              id="demoUrl"
              placeholder="eeer74fd"
              className={`${styles.input} bg-yellow-200 border-yellow-600`}
            />
          </div>
        </div>
        <br />
        <div className="w-full">
          <input
            type="file"
            accept="image/*"
            id="file"
            className="hidden"
            onChange={handleFileChange}
          />
          <label
            htmlFor="file"
            className={`w-full min-h-[10vh] border border-yellow-600 p-3 flex items-center justify-center bg-yellow-100 dark:bg-yellow-600 ${
              dragging ? "bg-yellow-400" : "bg-yellow-200"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {courseInfo.thumbnail ? (
              <Image
                src={courseInfo.thumbnail}
                alt="Course Thumbnail"
                layout="fill"
                objectFit="cover"
                className="max-h-full w-full object-cover"
              />
            ) : (
              <span className="text-black dark:text-white">
                Drag and Drop your Thumbnail here or click to Browse
              </span>
            )}
          </label>
        </div>
        <br />
        <div className="w-full flex items-center justify-end">
          <input
            type="submit"
            value="Next"
            className="w-full 800px:w-[180px] h-[40px] text-white dark:text-black bg-yellow-600 dark:bg-yellow-200 text-center rounded mt-8 cursor-pointer"
          />
        </div>
        <br />
        <br />
      </form>
    </div>
  );
};

export default CourseInformation;
