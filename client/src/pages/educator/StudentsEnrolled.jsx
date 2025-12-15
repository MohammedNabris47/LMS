import { useEffect, useState } from "react";
import { dummyStudentEnrolled } from "../../assets/assets";
import Loading from "../../components/student/Loading";

const StudentsEnrolled = () => {
  const [enrolledStudents, setEnrolledStudents] = useState([]);
  const fetchEnrolledStudents = async () => {
    setEnrolledStudents(dummyStudentEnrolled);
  };
  useEffect(() => {
    fetchEnrolledStudents();
  }, []);
  return enrolledStudents ? (
    <div className="min-h-screen flex flex-col items-start justify-between p-4 md:p-8 pt-8 pb-0">
      <div className="flex flex-col items-center w-full max-w-3xl overflow-hidden rounded-md bg-gray-950  border border-gray-200">
        <table className="table-fixed md:table-auto w-full overflow-hidden pb-4">
          <thead className="text-white text-[13px] border-b border-gray-200 text-left">
            <tr>
              <th className="hidden text-center text-[13px] px-4 py-3 sm:table-caption font-medium">
                #
              </th>
              <th className="px-4 py-3 text-[13px] font-medium">
                Student Name
              </th>
              <th className="px-4 py-3 text-[13px] font-medium">
                Course Title
              </th>
              <th className="px-4 py-3 text-[13px] hidden sm:table-cell font-medium">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="text-[13px]">
            {enrolledStudents.map((item, i) => (
              <tr key={i} className="border-b border-gray-200 text-gray-100">
                <td className="px-4 py-3 text-left hidden sm:table-cell ">
                  {i + 1}
                </td>
                <td className="flex items-center px-2 md:px-4 py-3 space-x-3">
                  <img
                    src={item.student.imageUrl}
                    alt="profile"
                    className="w-6 h-6 rounded-full"
                  />
                  <span className="truncate text-[12px]">
                    {item.student.name}
                  </span>
                </td>
                <td className="px-4 py-3 text-[13px] truncate">
                  {item.courseTitle}
                </td>
                <td className="px-4 py-3 text-[12px] hidden sm:table-cell">
                  {new Date(item.purchaseDate).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default StudentsEnrolled;
