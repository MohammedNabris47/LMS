import React from "react";
import assets from "../../assets/assets";

const Footer = () => {
  return (
    <footer className="flex flex-col-reverse md:flex-row items-center justify-between text-left w-full px-8 border-t border-gray-200 ">
      <div className="flex items-center gap-3">
        <img src={assets.logo} alt="logo" className="hidden md:block w-20" />
        <div className="hidden md:block h-7 w-px bg-gray-300"></div>
        <p className="py-4 text-center text-xs md:text-sm text-gray-800">
          Copyright 2025 &copy; Moodle. All Right Reserved.
        </p>
      </div>
      <div className="flex items-center gap-2 max-md:mt-4">
        <a href="#">
          <img
            src={assets.facebook_icon}
            alt="facebook icon"
            className="w-7 h-7 "
          />
        </a>
        <a href="#">
          <img
            src={assets.instagram_icon}
            alt="instagram icon"
            className="w-7 h-7"
          />
        </a>
        <a href="#">
          <img
            src={assets.twitter_icon}
            alt="twitter icon"
            className="w-7 h-7"
          />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
