import { useEditLayoutMutation, useGetHeroDataQuery } from "@/redux/layout/layoutApi";
import React, { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineCamera } from "react-icons/ai";
import Image from "next/image";

type Props = {};

const EditHero: FC<Props> = () => {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const { data } = useGetHeroDataQuery("Banner", {
    refetchOnMountOrArgChange: true,
  });
  const [editLayout, { isLoading, isSuccess, isError, error }] = useEditLayoutMutation();

  useEffect(() => {
    if (data) {
      setTitle(data.layout.banner.title || "");
      setSubTitle(data.layout.banner.subTitle || "");
      setImage(data.layout.banner.bannerImage?.url || "");
    }
  }, [data]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Hero updated successfully!");
    } else if (isError && error && "data" in error) {
      const errorData = error as any;
      toast.error(errorData.data.message);
    }
  }, [isSuccess, isError, error]);

  const handleUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (reader.readyState === 2) {
          setImage(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = async () => {
    await editLayout({
      type: "Banner",
      image,
      title,
      subTitle,
    });
  };

  const isModified =
    data?.layout.banner.title !== title ||
    data?.layout.banner.subTitle !== subTitle ||
    data?.layout.banner.bannerImage?.url !== image;

  return (
    <div className="w-full flex flex-col lg:flex-row items-center justify-center relative py-12">
      <div className="w-full lg:w-[40%] flex items-center justify-center pt-0 lg:pt-[70px] z-10">
        <div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px] lg:w-[450px] lg:h-[450px] rounded-full overflow-hidden">
          <div className="absolute inset-0 flex items-center hero_animation justify-center">
            <Image
              src={image}
              alt="Hero"
              layout="fill"
              objectFit="cover"
              className="absolute inset-0 object-cover w-full h-full rounded-full"
            />
            <label
              htmlFor="banner"
              className="absolute bottom-4 right-4 z-20 bg-white rounded-full p-2 cursor-pointer"
              style={{ width: "36px", height: "36px" }}
            >
              <AiOutlineCamera className="text-[18px]" style={{ color: "#ffcc00" }} />
              <input
                type="file"
                id="banner"
                accept="image/*"
                onChange={handleUpdate}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-[60%] flex flex-col items-start text-left mt-8 lg:mt-0 px-4 lg:px-8">
        <textarea
          className="resize-none text-[#000000c7] text-[32px] sm:text-[40px] font-bold font-Josefin w-full"
          placeholder="Improve Your Online Learning Experience Instantly"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          rows={2}
        />
        <br />
        <textarea
          value={subTitle}
          onChange={(e) => setSubTitle(e.target.value)}
          placeholder="We have 40k+ Online courses & 500K+ Online registered students. Find your desired courses from them."
          className="text-[#000000ac] font-Josefin font-[500] text-[16px] sm:text-[18px] w-full bg-transparent"
          rows={4}
        />
        <div
          className={`${
            isModified ? "cursor-pointer bg-[#42d383]" : "cursor-not-allowed bg-[#cccccc34]"
          } mt-6 rounded min-w-[100px] min-h-[40px] flex items-center justify-center text-white`}
          onClick={isModified && !isLoading ? handleEdit : undefined}
        >
          {isLoading ? "Saving..." : "Save"}
        </div>
      </div>
    </div>
  );
};

export default EditHero;
