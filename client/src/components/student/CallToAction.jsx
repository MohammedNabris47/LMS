import React from "react";
import assets from "../../assets/assets";

const CallToAction = () => {
  return (
    <div className="flex flex-col items-center gap-4 pt-8 pb-20 px-8 md:px-0">
      <h2 className="text-xl md:text-2xl text-gray-800 font-semibold">
        Learn anything, anytime, anywhere
      </h2>
      <p className="text-gray-600 sm:text-sm">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis nulla
        quisquam repellat vitae iure totam <br /> nemo quis eveniet debitis
        saepe et, inventore deserunt cupiditate .
      </p>
      <div className="flex items-center font-medium gap-5 mt-3">
        <button className="px-8 py-2 rounded-md text-white bg-blue-500 cursor-pointer text-[14px]">
          Get started
        </button>
        <button className="flex items-center gap-2 cursor-pointer text-[14px]">
          Learn more <img src={assets.arrow_icon} alt="arrowIcon" />
        </button>
      </div>
    </div>
  );
};

export default CallToAction;
