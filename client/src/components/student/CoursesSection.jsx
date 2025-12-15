import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../context/AppContext";
import CourseCard from "./CourseCard";

const CoursesSection = () => {
  const { allCourses } = useContext(GlobalContext);
  return (
    <div className="py-12 px-8 md:px-40">
      <h2 className="text-gray-800 font-medium text-xl">Learn from the best</h2>
      <p className="text-sm md:text-base mt-3  text-gray-600 ">
        Discover our top-rated courses across various categories. From coding
        and design to <br /> business and wellness, our courses are crafted to
        deliver results.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-4 md:px-0 my-10 md:my-16 gap-4">
        {allCourses.slice(0, 4).map((course, i) => (
          <CourseCard key={i} course={course} />
        ))}
      </div>

      <Link
        to={"/course-list"}
        className="text-gray-600 border border-gray-500/30 px-10 py-3 rounded mt-4"
        onClick={() => scrollTo(0, 0)}
      >
        Show All Courses
      </Link>
    </div>
  );
};

export default CoursesSection;
