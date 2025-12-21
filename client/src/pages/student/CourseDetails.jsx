import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../../context/AppContext";
import Loading from "../../components/student/Loading";
import assets from "../../assets/assets";
import humanizeDuration from "humanize-duration";
import Footer from "../../components/student/Footer";
import YouTube from "react-youtube";
import axios from "axios";
import { toast } from "react-toastify";

const CourseDetails = () => {
  const { id } = useParams();
  const {
    allCourses,
    calculateRating,
    calculateChapterTime,
    calculateCourseDuration,
    calculateNoOfLectures,
    currency,
    backendUrl,
    userData,
    getToken,
  } = useContext(GlobalContext);
  const [courseData, setCourseData] = useState(null);
  const [openSection, setOpenSection] = useState({});
  const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState(false);
  const [previewData, setPreviewData] = useState(null);

  const fetchCourseData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/course/" + id);

      if (data.success) {
        setCourseData(data.courseData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const enrollCourse = async () => {
    try {
      if (!userData) {
        return toast.warn("Login to Enroll");
      }
      if (isAlreadyEnrolled) {
        return toast.warn("Already Enrolled");
      }
      const token = await getToken();

      const { data } = await axios.post(
        backendUrl + "/api/user/purchase",
        { courseId: courseData._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        const { session_url } = data;
        window.location.replace(session_url);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const toggleSection = (index) => {
    setOpenSection((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  useEffect(() => {
    fetchCourseData();
  }, []);

  useEffect(() => {
    if (userData && courseData) {
      setIsAlreadyEnrolled(userData.enrolledCourses.includes(courseData._id));
    }
  }, [userData, courseData]);
  return courseData ? (
    <>
      <div className="flex flex-col-reverse  md:flex-row gap-10  relative items-start justify-between px-8 md:px-36 pt-10 md:pt-12 text-left">
        <div className="absolute top-0 left-0 w-full h-[500px] z-1 bg-linear-to-b from-blue-100/75"></div>
        <div className="max-w-xl z-10 text-gray-500">
          <h1 className="md:text-[20px] text-[18px] font-semibold text-gray-800">
            {courseData.courseTitle}
          </h1>
          <p
            className="pt-4 text-sm"
            dangerouslySetInnerHTML={{
              __html: `${courseData.courseDescription.slice(0, 200)}...`,
            }}
          ></p>

          <div className="flex items-center space-x-2 pt-3 pb-1 text-sm">
            <p>{calculateRating(courseData)}</p>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <img
                  key={i}
                  src={
                    i < Math.floor(calculateRating(courseData))
                      ? assets.star
                      : assets.star_blank
                  }
                  alt="star"
                  className="w-3 h-3"
                />
              ))}
            </div>
            <p className="text-blue-500">
              ({courseData.courseRatings.length}{" "}
              {courseData.courseRatings.length > 1 ? "ratings" : "rating"})
            </p>

            <p>
              {courseData.enrolledStudents.length}{" "}
              {courseData.enrolledStudents.length > 1 ? "students" : "student"}
            </p>
          </div>
          <p className="text-sm">
            Course by{" "}
            <span className="text-blue-500 underline">
              {courseData.educator.name}
            </span>
          </p>

          <div className="pt-7 text-gray-800">
            <h2 className="text-sm font-semibold">Course Structure</h2>

            <div className="pt-5">
              {courseData.courseContent.map((chapter, i) => (
                <div
                  key={i}
                  className="border border-gray-200 bg-gray-950 mb-2 text-white rounded"
                >
                  <div
                    className="flex items-center justify-between px-2 py-2 cursor-pointer select-none"
                    onClick={() => toggleSection(i)}
                  >
                    <div className="flex gap-2 items-center">
                      <img
                        className={`transform transition-transform ${
                          openSection[i] ? "rotate-180" : ""
                        }`}
                        src={assets.down_arrow_icon}
                        alt="down arrow icon"
                      />
                      <p className="text-[11px] md:text-[13px] font-medium">
                        {chapter.chapterTitle}
                      </p>
                    </div>
                    <p className="text-[11px] md:text-[13px] font-medium">
                      {chapter.chapterContent.length} lectures -{" "}
                      {calculateChapterTime(chapter)}
                    </p>
                  </div>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openSection[i] ? "max-h-96" : "max-h-0"
                    }`}
                  >
                    <ul className="list-disc pl-4 md:pl-10 pr-4 py-2 text-gray-600 border-t border-gray-500">
                      {chapter.chapterContent.map((lecture, i) => (
                        <li key={i} className="flex items-start gap-2 py-1">
                          <img
                            src={assets.play_icon}
                            alt="playIcon"
                            className="w-3 h-3 mt-1"
                          />
                          <div className="flex items-center justify-between w-full text-gray-700 text-[12px] md:text-[13px]">
                            <p>{lecture.lectureTitle}</p>
                            <div className="flex gap-2">
                              {lecture.isPreviewFree && (
                                <p
                                  className="text-blue-500 cursor-pointer"
                                  onClick={() =>
                                    setPreviewData({
                                      videoId: lecture.lectureUrl
                                        .split("/")
                                        .pop(),
                                    })
                                  }
                                >
                                  Preview
                                </p>
                              )}
                              <p>
                                {humanizeDuration(
                                  lecture.lectureDuration * 60 * 1000,
                                  { units: ["h", "m"] }
                                )}
                              </p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="py-16 text-[14px] md:tex-[15px]">
            <h3 className="text-gray-800 text-[15px] font-semibold">
              Course Description
            </h3>
            <p
              className="pt-2 rich-text "
              dangerouslySetInnerHTML={{ __html: courseData.courseDescription }}
            ></p>
          </div>
        </div>

        <div className="z-10 max-w-[350px] shadow-[0px_4px_15px_2px_rgba(0,0,0,0.1)] rounded-t-sm md:rounded-none overflow-hidden bg-gray-950 min-w-[280px] sm:min-w-[300px]">
          {previewData ? (
            <YouTube
              videoId={previewData.videoId}
              opts={{ playerVars: { autoplay: 1 } }}
              iframeClassName="w-full aspect-video"
            />
          ) : (
            <img
              src={courseData.courseThumbnail}
              alt="courseThumbnail"
              className="select-none"
            />
          )}
          <div className="p-4">
            <div className="flex items-center gap-2">
              <img
                src={assets.time_left_clock_icon}
                alt="left clock icon"
                className="w-3"
              />
              <p className="text-red-700 text-[13px]">
                <span className="font-medium">5 days</span> left at thi price!
              </p>
            </div>

            <div className="flex gap-2 items-center pt-2 ">
              <p className="text-white/90 md:text-xl text-base font-semibold">
                {currency}
                {(
                  courseData.coursePrice -
                  (courseData.discount * courseData.coursePrice) / 100
                ).toFixed(2)}
              </p>
              <p className="text-gray-400 line-through text-[14px] md:text-[15px]">
                {currency}
                {courseData.coursePrice}
              </p>
              <p className="text-gray-400  text-[14px] md:text-[15px]">
                {courseData.discount}% off
              </p>
            </div>

            <div className="flex items-center text-[13px] md:text-[15px] gap-3 pt-2 md:pt-3 text-gray-500">
              <div className="flex items-center gap-1">
                <img src={assets.star} alt="star" className="w-3 h-3" />
                <p className="text-[13px] ">{calculateRating(courseData)}</p>
              </div>

              <div className="h-4 w-px bg-gray-500"></div>

              <div className="flex items-center gap-1">
                <img
                  src={assets.time_clock_icon}
                  alt="clock"
                  className="w-3 h-3"
                />
                <p className="text-[13px] ">
                  {calculateCourseDuration(courseData)}
                </p>
              </div>

              <div className="h-4 w-px bg-gray-500"></div>

              <div className="flex items-center gap-1">
                <img
                  src={assets.lesson_icon}
                  alt="lesson"
                  className="w-3 h-3"
                />
                <p className="text-[13px] ">
                  {calculateNoOfLectures(courseData)} lessons
                </p>
              </div>
            </div>

            <button
              onClick={enrollCourse}
              className="cursor-pointer md:mt-5 py-2 mt-4 w-full rounded bg-white text-black text-sm font-semibold"
            >
              {isAlreadyEnrolled ? "Already Enrolled" : "Enroll Now"}
            </button>

            <div className="pt-5">
              <p className="text-gray-500 text-[14px] font-medium">
                What's in the course?
              </p>
              <ul className="ml-4 pt-2 text-[13px] text-gray-500 list-disc">
                <li>Lifetime access with free updates.</li>
                <li>Step-by-step, hands on project guidance.</li>
                <li>Downloadable resources and source code.</li>
                <li>Quizzes to test your knowledge.</li>
                <li>Certificate of completion</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  ) : (
    <Loading />
  );
};

export default CourseDetails;
