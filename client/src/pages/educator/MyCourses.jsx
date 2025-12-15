import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/AppContext";
import Loading from "../../components/student/Loading";

const MyCourses = () => {
  const { currency, allCourses } = useContext(GlobalContext);
  const [courses, setCourses] = useState(null);

  const fetchEducatorCourses = async () => {
    setCourses(allCourses);
  };

  useEffect(() => {
    fetchEducatorCourses();
  }, []);
  return courses ? (
    <div className="h-screen flex flex-col items-start justify-between p-4 md:p-8 pt-8 pb-0">
      <div className="w-full">
        <h2 className="pb-4 font-medium text-[14px]">My Courses</h2>
        <div className="flex flex-col items-center max-w-3xl w-full overflow-hidden rounded-md bg-gray-950 border border-gray-200">
          <table className="table-fixed md:table-auto w-full overflow-hidden ">
            <thead className="text-gray-900 border-b border-gray-200 text-left text-[14px]">
              <tr className="text-white">
                <th className="px-4 py-3 truncate text-[13px] font-medium">
                  All Courses
                </th>
                <th className="px-4 py-3 truncate text-[13px] font-medium">
                  Earnings
                </th>
                <th className="px-4 py-3 truncate text-[13px] font-medium">
                  Students
                </th>
                <th className="px-4 py-3 truncate text-[13px] font-medium">
                  Published On
                </th>
              </tr>
            </thead>
            <tbody className="text-[13px] text-gray-500">
              {courses.map((course) => (
                <tr key={course._id} className="border-b border-gray-800">
                  <td className="md:px-4 pl-2 py-3 md:pl-4 flex items-center truncate space-x-3">
                    <img
                      src={course.courseThumbnail}
                      alt="course img"
                      className="w-14 select-none"
                    />
                    <span className="truncate hidden md:block text-[13px]">
                      {course.courseTitle}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[13px]">
                    {currency}
                    {Math.floor(
                      course.enrolledStudents.length *
                        (course.coursePrice -
                          (course.discount * course.coursePrice) / 100)
                    )}
                  </td>
                  <td className="text-[13px] px-4 py-3">
                    {course.enrolledStudents.length}
                  </td>
                  <td className="text-[13px] px-4 py-3">
                    {new Date(course.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default MyCourses;
