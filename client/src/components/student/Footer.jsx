import React from "react";
import assets from "../../assets/assets";

const Footer = () => {
  return (
    <footer className="bg-gray-950 md:px-36 text-left mt-10 w-full">
      <div className="flex flex-col md:flex-row items-start px-8 md:px-0 justify-center gap-8 md:gap-32 py-10 border-b border-white/30">
        <div className="flex flex-col items-center md:items-start w-full">
          <img
            src={assets.logo}
            alt="logo"
            className="w-28 lg:w-32 object-fit-cover"
          />
          <p className="mt-5 text-center md:text-left text-sm text-white/80">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum
            numquam.
          </p>
        </div>
        <div className="flex flex-col w-full items-center md:items-start">
          <h2 className="font-semibold text-white/90 mb-5">Company</h2>
          <ul className="flex md:flex-col w-full justify-between text-sm text-white/80 md:space-y-2">
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">About us</a>
            </li>
            <li>
              <a href="#">Contact us</a>
            </li>
            <li>
              <a href="#">Privacy policy</a>
            </li>
          </ul>
        </div>
        <div className="hidden md:flex flex-col items-start w-full">
          <h2 className="font-semibold text-white/90 mb-5">
            Subscribe to our newsletter
          </h2>
          <p className="text-sm text-white/80">
            The latest news, articles, and resources, sent to your inbox weekly.
          </p>
          <div className="flex items-center gap-2 pt-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="border border-gray-500/30 bg-gray-800 text-gray-500 placeholder-gray-500 outline-0 w-64 h-9  rounded text-sm pl-1"
            />
            <button className="bg-blue-500 w-24 h-9 text-white rounded text-[14px] cursor-pointer">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      <p className="py-4 text-center text-xs md:text-sm text-white/60">
        Copyright 2025 &copy; Moodle. All Right Reserved.
      </p>
    </footer>
  );
};

export default Footer;
