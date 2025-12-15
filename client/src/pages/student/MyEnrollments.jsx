import React, { useContext, useState } from "react";
import { GlobalContext } from "../../context/AppContext";
import Footer from "../../components/student/Footer";
import { Line } from "rc-progress";

const MyEnrollments = () => {
  const { enrolledCourses, calculateCourseDuration, navigate } =
    useContext(GlobalContext);

  const [progressArray, setProgressArray] = useState([
    { lectureCompleted: 2, totalLectures: 4 },
    { lectureCompleted: 1, totalLectures: 5 },
    { lectureCompleted: 3, totalLectures: 6 },
    { lectureCompleted: 4, totalLectures: 4 },
    { lectureCompleted: 0, totalLectures: 3 },
    { lectureCompleted: 5, totalLectures: 7 },
    { lectureCompleted: 6, totalLectures: 8 },
    { lectureCompleted: 2, totalLectures: 6 },
    { lectureCompleted: 4, totalLectures: 10 },
    { lectureCompleted: 3, totalLectures: 5 },
    { lectureCompleted: 7, totalLectures: 7 },
    { lectureCompleted: 1, totalLectures: 4 },
    { lectureCompleted: 0, totalLectures: 2 },
    { lectureCompleted: 5, totalLectures: 5 },
  ]);
  return (
    <>
      <div className="pt-10 px-8 md:px-36">
        <h1 className="text-[18px] font-semibold">My Enrollments</h1>
        <table className="table-fixed md:table-auto w-full overflow-hidden border border-gray-200 mt-8">
          <thead className="text-gray-800 border-b border-gray-500/30 text-left text-[14px] max-sm:hidden">
            <tr>
              <th className="px-3 py-2 font-medium truncate">Course</th>
              <th className="px-3 py-2 font-medium truncate">Duration</th>
              <th className="px-3 py-2 font-medium truncate">Completed</th>
              <th className="px-3 py-2 font-medium truncate">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {enrolledCourses.map((course, i) => (
              <tr key={i} className="border-b border-gray-200">
                <td className="pl-2 md:pl-4 md:px-4 py-2 flex items-center space-x-3">
                  <img
                    src={course.courseThumbnail}
                    alt="courseThumbnail"
                    className="w-14 sm:w-20 md:w-24"
                  />
                  <div className="flex-1">
                    <p className="mb-1 text-[13px] font-medium">
                      {course.courseTitle}
                    </p>
                    <Line
                      strokeColor={"black"}
                      strokeWidth={1}
                      percent={
                        progressArray[i]
                          ? (progressArray[i].lectureCompleted * 100) /
                            progressArray[i].totalLectures
                          : 0
                      }
                      className="bg-gray-50 rounded-full"
                    />
                  </div>
                </td>
                <td className="px-4 py-2 max-sm:hidden text-[13px]">
                  {calculateCourseDuration(course)}
                </td>
                <td className="px-4 py-2 max-sm:hidden text-[13px]">
                  {progressArray[i] &&
                    `${progressArray[i].lectureCompleted} / ${progressArray[i].totalLectures}`}
                  <span> Lectures</span>
                </td>
                <td className="px-4 py-2 max-sm:text-right text-[13px]">
                  <button
                    className="px-2 sm:px-4 py-1 sm:py-2 bg-gray-950 text-white font-medium cursor-pointer"
                    onClick={() => navigate("/player/" + course._id)}
                  >
                    {progressArray[i] &&
                    progressArray[i].lectureCompleted /
                      progressArray[i].totalLectures ===
                      1
                      ? "Completed"
                      : "On Going"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
};

export default MyEnrollments;
