import { Outlet } from "react-router-dom";
import Navbar from "../../components/educator/Navbar";
import SideBar from "../../components/educator/SideBar";
import Footer from "../../components/educator/Footer";

const Educator = () => {
  return (
    <div className="bg-gray-100 min-h-screen text-[14px]">
      <Navbar />
      <div className="flex">
        <SideBar />
        <div className="flex-1">{<Outlet />}</div>
      </div>
      <Footer />
    </div>
  );
};

export default Educator;
