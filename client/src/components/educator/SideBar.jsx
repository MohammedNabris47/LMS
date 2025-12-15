import { useContext } from "react";
import assets from "../../assets/assets";
import { GlobalContext } from "../../context/AppContext";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  const { isEducator } = useContext(GlobalContext);
  const menuItems = [
    { name: "Dashboard", path: "/educator", icon: assets.home_icon },
    { name: "Add Course", path: "/educator/add-course", icon: assets.add_icon },
    {
      name: "My Courses",
      path: "/educator/my-courses",
      icon: assets.my_course_icon,
    },
    {
      name: "Student Enrolled",
      path: "/educator/student-enrolled",
      icon: assets.person_tick_icon,
    },
  ];

  return (
    isEducator && (
      <div className="w-16 md:w-52 border-r min-h-screen text-[14px] border-gray-200 py-2 flex flex-col">
        {menuItems.map((item) => (
          <NavLink
            to={item.path}
            key={item.name}
            end={item.path === "/educator"}
            className={({ isActive }) =>
              `flex items-center flex-col md:flex-row justify-center md:justify-start py-3 gap-2 md:px-8 ${
                isActive
                  ? "bg-gray-950 border-r-[5px] border-white text-white"
                  : "hover:bg-gray-200 border-r-[5px] border-white/60 hover:border-gray-200"
              }`
            }
          >
            <img src={item.icon} alt="icon" className="w-4 h-4" />
            <p className="hidden md:block text-center text-[13px]">
              {item.name}
            </p>
          </NavLink>
        ))}
      </div>
    )
  );
};

export default SideBar;
