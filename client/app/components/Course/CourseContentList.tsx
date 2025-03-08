import React, { FC, useState } from "react";
import { BsChevronUp, BsChevronDown } from "react-icons/bs";
import { MdOutlineOndemandVideo } from "react-icons/md";

type Props = {
  data: any;
  activeVideo?: number;
  setActiveVideo?: (index: number) => void;
  isDemo?: boolean;
};

const CourseContentList: FC<Props> = ({
  data,
  activeVideo,
  setActiveVideo,
  isDemo,
}) => {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(
    new Set<string>()
  );

  const videoSections: string[] = [
    ...new Set<string>(data?.map((item: any) => item.videoSection)),
  ];

  let totalCount: number = 0; // Total count of videos from previous sections

  const toggleSection = (section: string) => {
    const newVisibleSections = new Set(visibleSections);
    if (newVisibleSections.has(section)) {
      newVisibleSections.delete(section);
    } else {
      newVisibleSections.add(section);
    }
    setVisibleSections(newVisibleSections);
  };

  return (
    <div
      className={`mt-[15px] w-full ${
        !isDemo && "ml-[-30px] min-h-screen sticky top-24 left-0 z-30"
      }`}
    >
      {videoSections.map((section: string) => {
        const isSectionVisible = visibleSections.has(section);
        // Filter videos by section
        const sectionVideos = data.filter(
          (item: any) => item.videoSection === section
        );
        const sectionVideoCount = sectionVideos.length; // Number of videos in the current section
        const sectionVideoLength = sectionVideos.reduce(
          (totalLength: number, item: any) => totalLength + item.videoLength,
          0
        );
        const sectionStartIndex = totalCount; // Start index of videos within the current section
        totalCount += sectionVideoCount; // Update the total count of videos
        const sectionContentHours = sectionVideoLength / 60;

        return (
          <div
            className={`${
              !isDemo && "border-b border-light-accent-darkGrey dark:border-dark-accent-grey pb-2"
            }`}
            key={section}
          >
            <div className="w-full flex">
              {/* Render video section */}
              <div className="w-full flex justify-between items-center">
                <h2 className="text-[22px] text-light-text dark:text-dark-text">
                  {section}
                </h2>
                <button
                  className="mr-4 cursor-pointer text-light-text dark:text-dark-text"
                  onClick={() => toggleSection(section)}
                >
                  {isSectionVisible ? (
                    <BsChevronUp size={20} />
                  ) : (
                    <BsChevronDown size={20} />
                  )}
                </button>
              </div>
            </div>
            <h5 className="text-light-text dark:text-dark-text">
              {sectionVideoCount} Lessons •{" "}
              {sectionVideoLength < 60
                ? sectionVideoLength
                : sectionContentHours.toFixed(2)}{" "}
              {sectionVideoLength > 60 ? "hours" : "minutes"}
            </h5>
            <br />
            {isSectionVisible && (
              <div className="w-full">
                {sectionVideos.map((item: any, index: number) => {
                  const videoIndex = sectionStartIndex + index; // Calculate the video index within the overall list
                  const contentLength = item.videoLength / 60;
                  return (
                    <div
                      className={`w-full ${
                        videoIndex === activeVideo ? "bg-light-secondary dark:bg-dark-accent-darkHighlight" : ""
                      } cursor-pointer transition-all p-2`}
                      key={item._id}
                      onClick={() =>
                        !isDemo && setActiveVideo && setActiveVideo(videoIndex)
                      }
                    >
                      <div className="flex items-start">
                        <div>
                          <MdOutlineOndemandVideo
                            size={25}
                            className={`mr-2 ${
                              videoIndex === activeVideo
                                ? "text-dark-secondary dark:text-dark-accent-lightGrey"
                                : "text-light-accent-darkGrey dark:text-dark-primary"
                            }`}
                          />
                        </div>
                        <h1 className="text-[18px] inline-block break-words text-light-text dark:text-dark-text">
                          {item.title}
                        </h1>
                      </div>
                      <h5 className="pl-8 text-light-text dark:text-dark-text">
                        {item.videoLength > 60
                          ? contentLength.toFixed(2)
                          : item.videoLength}{" "}
                        {item.videoLength > 60 ? "hours" : "minutes"}
                      </h5>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CourseContentList;
