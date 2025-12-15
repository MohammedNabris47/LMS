import { UserButton, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import assets, { dummyEducatorData } from "../../assets/assets";

const Navbar = () => {
  const educatorData = dummyEducatorData;
  const { user } = useUser();
  return (
    <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-100 py-3">
      <Link to={"/"}>
        <img
          src={assets.logo}
          alt="logo"
          className="w-28 lg:w-32 object-fit-contain select-none"
        />
      </Link>
      <div className="flex items-center gap-4 text-gray-500 relative">
        <p className="text-[13px]">Hi! {user ? user.fullName : "Developer"}</p>
        {user ? (
          <UserButton />
        ) : (
          <img
            src={assets.profile_img}
            alt="profile"
            className="max-w-8 select-none"
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
