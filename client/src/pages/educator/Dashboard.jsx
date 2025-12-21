import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/AppContext";
import Loading from "../../components/student/Loading";
import axios from "axios";
import { toast } from "react-toastify";

const Dashboard = () => {
  const { currency, backendUrl, getToken, isEducator } =
    useContext(GlobalContext);
  const [dashBoardData, setDashBoardData] = useState(null);

  const fetchDashBoardData = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get(backendUrl + "/api/educator/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        setDashBoardData(data.dashBoardData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (isEducator) {
      fetchDashBoardData();
    }
  }, [isEducator]);
  return dashBoardData ? (
    <div className="flex min-h-screen flex-col items-start justify-between gap-6 p-4 md:p-8 pt-4 pb-0">
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-3 shadow-lg border border-gray-200 p-4 rounded-md w-48">
            <img
              src={assets.patients_icon}
              alt="patients icon"
              className="w-8 h-8 select-none"
            />
            <div>
              <p className="text-sm font-medium text-gray-800">
                {dashBoardData.enrolledStudentsData.length}
              </p>
              <p className="text-[13px] text-gray-700">Total Enrollments</p>
            </div>
          </div>
          <div className="flex items-center gap-3 shadow-lg border border-gray-200 p-4 rounded-md w-48">
            <img
              src={assets.earning_icon}
              alt="earning icon"
              className="w-8 h-8 select-none"
            />
            <div>
              <p className="text-sm font-medium text-gray-800">
                {currency}
                {dashBoardData.totalEarnings}
              </p>
              <p className="text-[13px] text-gray-700">Total Earnings</p>
            </div>
          </div>
          <div className="flex items-center gap-3 shadow-lg border border-gray-200 p-4 rounded-md w-48">
            <img
              src={assets.appointments_icon}
              alt="appointments icon"
              className="w-8 h-8 select-none"
            />
            <div>
              <p className="text-sm font-medium text-gray-800">
                {dashBoardData.totalCourses}
              </p>
              <p className="text-[13px] text-gray-700">Total Courses</p>
            </div>
          </div>
        </div>
        <div className="my-3">
          <h2 className="pb-4 text-[14px] font-medium">Latest Enrollments</h2>
          <div className="flex flex-col items-center w-full overflow-hidden max-w-3xl rounded-md bg-gray-950 border border-gray-200">
            <table className="table-fixed md:table-auto w-full overflow-hidden">
              <thead className="text-gray-900 border-b border-gray-200 text-left text-[13px]">
                <tr className="text-white">
                  <th className="px-4 py-3 font-medium text-center sm:table-cell hidden">
                    #
                  </th>
                  <th className="px-4 py-3 font-medium">Student Name</th>
                  <th className="px-4 py-3 font-medium">Course Title</th>
                </tr>
              </thead>
              <tbody className="text-[13px] text-gray-500">
                {dashBoardData.enrolledStudentsData.map((item, i) => (
                  <tr key={i} className="border-b border-gray-200">
                    <td className="px-4 py-3 text-center hidden sm:table-cell">
                      {i + 1}
                    </td>
                    <td className="px-2 md:px-4 py-3 flex items-center space-x-3">
                      <img
                        src={item.student.imageUrl}
                        alt="profile"
                        className="w-6 h-6 rounded-full"
                      />
                      <span className="truncate text-[13px]">
                        {item.student.name}
                      </span>
                    </td>
                    <td className="truncate px-4 py-3 text-[13px]">
                      {item.courseTitle}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Dashboard;
