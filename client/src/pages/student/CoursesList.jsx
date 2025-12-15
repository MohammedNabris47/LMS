import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { GlobalContext } from "../../context/AppContext";
import SearchBar from "../../components/student/SearchBar";
import { useParams } from "react-router-dom";
import CourseCard from "../../components/student/CourseCard";
import assets from "../../assets/assets";
import Footer from "../../components/student/Footer";

const CoursesList = () => {
  const { navigate, allCourses } = useContext(GlobalContext);
  const [filteredCourse, setFilteredCourse] = useState([]);
  const { input } = useParams();

  useEffect(() => {
    if (allCourses && allCourses.length > 0) {
      let tempCourses = allCourses.slice();

      input
        ? setFilteredCourse(
            tempCourses.filter((course) =>
              course.courseTitle.toLowerCase().includes(input.toLowerCase())
            )
          )
        : setFilteredCourse(tempCourses);
    }
  }, [allCourses, input]);
  return (
    <>
      <div className="relative px-8 md:px-36 mt-16 text-left ">
        <div className="flex flex-col md:flex-row items-start justify-between gap-5 w-full">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">
              Course List
            </h1>
            <p className="text-gray-600">
              <span
                className="text-blue-600 cursor-pointer"
                onClick={() => navigate("/")}
              >
                Home
              </span>{" "}
              / <span> Course List</span>
            </p>
          </div>
          <SearchBar data={input} />
        </div>

        {input && (
          <div className="inline-flex items-center gap-3 px-4 py-2 border border-gray-100 mt-8 -mb-8 text-gray-600">
            <p className="text-sm">{input}</p>
            <img
              src={assets.cross_icon}
              alt="crossIcon"
              className="cursor-pointer"
              onClick={() => navigate("/course-list")}
            />
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-16 gap-3 px-2 md:px-0">
          {filteredCourse.length > 0 ? (
            filteredCourse.map((course, i) => (
              <CourseCard key={i} course={course} />
            ))
          ) : (
            <p className="text-center text-xl  w-[500px]">
              Sorry! No such course
            </p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CoursesList;
