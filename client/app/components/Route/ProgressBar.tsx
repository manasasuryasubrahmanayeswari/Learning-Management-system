import React, { forwardRef } from "react";

type ProgressBarProps = {
  label: string;
  percentage: number;
};

const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(({ label, percentage }, ref) => (
  <div className="mb-4">
    <div className="flex justify-between mb-1">
      <span className="text-base font-medium text-light-text dark:text-dark-text">{label}</span>
      <span className="text-sm font-medium text-light-text dark:text-dark-text">{percentage}%</span>
    </div>
    <div className="w-full border-[1px] bg-light-primary dark:bg-light-accent-darkGrey rounded-full h-4">
      <div
        ref={ref}
        data-width={`${percentage}%`}
        className="dark:bg-light-primary bg-light-accent-darkGrey h-full rounded-full"
        style={{ width: '0%' }} // Initialize with 0% width for animation
      ></div>
    </div>
  </div>
));

ProgressBar.displayName = "ProgressBar";

export default ProgressBar;
