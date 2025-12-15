import React from "react";
import assets from "../../assets/assets";
import SearchBar from "./SearchBar";

const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full pt-16 md:pt-24 px-7 md:px-0 space-y-7 text-center bg-linear-to-b from-blue-100/75">
      <h1 className="font-bold relative text-gray-800 max-w-3xl mx-auto text-[28px] md:text-[36px]">
        Empower your future with the courses designed to
        <span className="text-blue-500"> fit your choice.</span>
        <img
          src={assets.sketch}
          alt="sketchIcon"
          className="hidden md:block absolute -bottom-5 right-28"
        />
      </h1>
      <p className="hidden md:block text-gray-600 max-w-2xl mx-auto ">
        we bring together world-class instructors, interactive content, and a
        supportive community to help you achieve your personal goals.
      </p>
      <p className="md:hidden text-gray-600 max-w-sm mx-auto">
        we bring together world-class instructors to help you achieve your
        personal goals
      </p>
      <SearchBar />
    </div>
  );
};

export default Hero;
