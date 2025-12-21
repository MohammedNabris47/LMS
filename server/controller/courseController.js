import Course from "../model/course.js";

export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({
      isPublished: true,
    })
      .select(["-courseContent", "-enrolledStudents"])
      .populate({ path: "educator" });

    res.json({ success: true, courses });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: err.message });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    const courseData = await Course.findById(id).populate({ path: "educator" });

    courseData.courseContent.forEach((chapter) => {
      chapter.chapterContent.forEach((lecture) => {
        if (!lecture.isPreviewFree) {
          lecture.lectureUrl = "";
        }
      });
    });
    res.json({ success: true, courseData });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: err.message });
  }
};
