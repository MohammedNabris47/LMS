import React, { useContext } from "react";
import assets from "../../assets/assets";
import { Link } from "react-router-dom";
import { useClerk, useUser, UserButton } from "@clerk/clerk-react";
import { GlobalContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = () => {
  const isCourseListPage = location.pathname.includes("/course-list");
  const { navigate, isEducator, backendUrl, setIsEducator, getToken } =
    useContext(GlobalContext);
  const { openSignIn } = useClerk();
  const { user } = useUser();

  const becomeEducator = async () => {
    try {
      if (isEducator) {
        navigate("/educator");
        return;
      }
      const token = await getToken();
      const { data } = await axios.get(
        backendUrl + "/api/educator/update-role",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        setIsEducator(true);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div
      className={`flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-200 py-4  ${
        isCourseListPage ? "bg-white " : "bg-blue-100/75"
      }`}
    >
      <img
        src={assets.logo}
        alt="Logo"
        className="w-28 lg:w-32 cursor-pointer object-fit-contain"
        onClick={() => navigate("/")}
      />
      <div className="hidden md:flex items-center gap-4 text-gray-500">
        <div className="flex items-center gap-3">
          {user && (
            <>
              <button className="text-[14px]" onClick={becomeEducator}>
                {isEducator ? "Educator Dashboard" : "Become Educator"}
              </button>
              |
              <Link to={"/my-enrollments"} className="text-[14px]">
                My Enrollments
              </Link>
            </>
          )}
        </div>
        {user ? (
          <UserButton />
        ) : (
          <button
            className="bg-blue-400 text-white px-4 py-2 rounded-full text-sm cursor-pointer text-[14px] outline-0"
            onClick={() => openSignIn()}
          >
            Create Account
          </button>
        )}
      </div>
      <div className="md:hidden flex items-center gap-2 sm:gap-4 text-gray-500">
        <div className="flex items-center gap-1 sm:gap-1.5 max-sm:text-xs">
          {user && (
            <>
              <button className="text-[14px]" onClick={becomeEducator}>
                {isEducator ? "Educator Dashboard" : "Become Educator"}
              </button>
              |
              <Link to={"/my-enrollments"} className="text-[14px]">
                My Enrollments
              </Link>
            </>
          )}
        </div>
        {user ? (
          <UserButton />
        ) : (
          <button
            className="cursor-pointer outline-0"
            onClick={() => openSignIn()}
          >
            <img src={assets.user_icon} alt="userIcon" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
