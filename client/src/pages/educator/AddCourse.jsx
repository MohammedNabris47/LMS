import uniqid from "uniqid";
import Quill from "quill";
import { useContext, useEffect, useRef, useState } from "react";
import assets from "../../assets/assets";
import { GlobalContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const AddCourse = () => {
  const { backendUrl, getToken } = useContext(GlobalContext);
  const quillRef = useRef(null);
  const editorRef = useRef(null);

  const [courseTitle, setCourseTitle] = useState("");
  const [coursePrice, setCoursePrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [image, setImage] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [currentChapterId, setCurrentChapterId] = useState(null);

  const [lectureDetails, setLectureDetails] = useState({
    lectureTitle: "",
    lectureDuration: "",
    lectureUrl: "",
    isPreviewFree: false,
  });

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
      });
    }
  }, []);

  const handleChapter = (action, chapterId) => {
    if (action === "add") {
      const title = prompt("Enter Chapter Name: ");
      if (title) {
        const newChapter = {
          chapterId: uniqid(),
          chapterTitle: title,
          chapterContent: [],
          collapsed: false,
          chapterOrder:
            chapters.length > 0 ? chapters.slice(-1)[0].chapterOrder + 1 : 1,
        };
        setChapters([...chapters, newChapter]);
      }
    } else if (action === "remove") {
      setChapters(
        chapters.filter((chapter) => chapter.chapterId !== chapterId)
      );
    } else if (action === "toggle") {
      setChapters(
        chapters.map((chapter) =>
          chapter.chapterId === chapterId
            ? { ...chapter, collapsed: !chapter.collapsed }
            : chapter
        )
      );
    }
  };

  const handleLecture = (action, chapterId, lectureIndex) => {
    if (action === "add") {
      setCurrentChapterId(chapterId);
      setShowPopup(true);
    } else if (action === "remove") {
      setChapters(
        chapters.map((chapter) => {
          if (chapter.chapterId === chapterId) {
            chapter.chapterContent.splice(lectureIndex, 1);
          }
          return chapter;
        })
      );
    }
  };

  const addLecture = () => {
    setChapters(
      chapters.map((chapter) => {
        if (chapter.chapterId === currentChapterId) {
          const newLecture = {
            ...lectureDetails,
            lectureOrder:
              chapter.chapterContent.length > 0
                ? chapter.chapterContent.slice(-1)[0].lectureOrder + 1
                : 1,
            lectureId: uniqid(),
          };
          chapter.chapterContent.push(newLecture);
        }
        return chapter;
      })
    );
    setShowPopup(false);
    setLectureDetails({
      lectureTitle: "",
      lectureDuration: "",
      lectureUrl: "",
      isPreviewFree: false,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!image) {
        toast.error("Thumbnail Not Selected");
      }
      const courseData = {
        courseTitle,
        courseDescription: quillRef.current.root.innerHTML,
        coursePrice: Number(coursePrice),
        discount: Number(discount),
        courseContent: chapters,
      };

      const formData = new FormData();
      formData.append("courseData", JSON.stringify(courseData));
      formData.append("image", image);

      const token = await getToken();
      const { data } = await axios.post(
        backendUrl + "/api/educator/add-course",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success(data.message);
        setCourseTitle("");
        setCoursePrice(0);
        setDiscount(0);
        setImage(null);
        setChapters([]);
        quillRef.current.root.innerHTML = "";
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="h-screen overflow-scroll flex flex-col items-start justify-between p-4 md:p-8 pb-0 pt-8">
      <form
        className="flex flex-col gap-3 w-full max-w-md text-gray-800"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-1">
          <p className="font-medium">CourseTitle</p>
          <input
            type="text"
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
            placeholder="Enter Course Title"
            required
            className="outline-0 px-2 py-1 md:py-2 rounded border border-gray-200 placeholder-gray-500 placeholder:text-[13px]"
          />
        </div>
        <div className="flex flex-col gap-1">
          <p className="font-medium">Course Description</p>
          <div ref={editorRef}></div>
        </div>

        <div className="flex items-center flex-wrap justify-between">
          <div className="flex flex-col gap-1">
            <p className="font-medium">Course Price</p>
            <input
              type="number"
              value={coursePrice}
              onChange={(e) => setCoursePrice(e.target.value)}
              placeholder="0"
              required
              className="outline-0 px-2 py-1 md:py-2 w-20 rounded border border-gray-200 placeholder-gray-500 placeholder:text-[13px]"
            />
          </div>

          <div className="flex flex-col md:flex-row items-center gap-2">
            <p className="font-medium">Course Thumbnail</p>
            <label htmlFor="thumbnailImg" className="flex items-center gap-2">
              <img
                src={assets.file_upload_icon}
                alt="fileIcon"
                className=" rounded p-1 cursor-pointer bg-gray-200"
              />
              <input
                type="file"
                id="thumbnailImg"
                onChange={(e) => setImage(e.target.files[0])}
                accept="image/*"
                hidden
              />
              <img
                src={image ? URL.createObjectURL(image) : ""}
                alt=""
                className="max-h-8"
              />
            </label>
          </div>
        </div>

        <div>
          <p className="font-medium">Discount %</p>
          <input
            type="number"
            required
            placeholder="0"
            min={0}
            max={100}
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            className="outline-0 px-2 py-1 md:py-2 w-20 rounded border border-gray-200 placeholder-gray-500 placeholder:text-[13px]"
          />
        </div>
        <div>
          {chapters.map((chapter, i) => (
            <div
              key={i}
              className="bg-gray-950 border border-gray-200 rounded-lg mb-3"
            >
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <div className="flex items-center">
                  <img
                    src={assets.dropdown_icon}
                    alt="dropdown icon"
                    onClick={() => handleChapter("toggle", chapter.chapterId)}
                    className={`mr-2 w-4 cursor-pointer transition-all ${
                      chapter.collapsed && "-rotate-90"
                    }`}
                  />
                  <span className="text-[13px] font-medium text-gray-700">
                    {i + 1} {chapter.chapterTitle}
                  </span>
                </div>
                <span className="text-gray-500 text-[13px]">
                  {chapter.chapterContent.length} Lectures
                </span>
                <img
                  src={assets.cross_icon}
                  alt="cross icon"
                  className="cursor-pointer w-2"
                  onClick={() => handleChapter("remove", chapter.chapterId)}
                />
              </div>
              {!chapter.collapsed && (
                <div className="p-4">
                  {chapter.chapterContent.map((lecture, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between mb-2"
                    >
                      <span className="text-[13px]">
                        {i + 1} {lecture.lectureTitle} -{" "}
                        {lecture.lectureDuration} mins -{" "}
                        <a
                          href={lecture.lectureUrl}
                          target="_blank"
                          className="text-blue-500"
                        >
                          Link
                        </a>{" "}
                        - {lecture.isPreviewFree ? "Free Preview" : "Paid"}
                      </span>
                      <img
                        src={assets.cross_icon}
                        alt="cross icon"
                        className="cursor-pointer w-2"
                        onClick={() =>
                          handleLecture("remove", chapter.chapterId, i)
                        }
                      />
                    </div>
                  ))}
                  <div
                    className="inline-flex bg-gray-800 text-gray-200 cursor-pointer mt-2 p-2 rounded text-[13px]"
                    onClick={() => handleLecture("add", chapter.chapterId)}
                  >
                    + Add Lecture
                  </div>
                </div>
              )}
            </div>
          ))}
          <div
            className="flex items-center justify-center p-2 bg-gray-950 cursor-pointer rounded-lg text-white text-[13px]"
            onClick={() => handleChapter("add")}
          >
            + Add Chapter
          </div>
          {showPopup && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-950 bg-opacity-75">
              <div className="bg-gray-100 text-gray-700 p-4 rounded w-full relative max-w-80">
                <h3 className="mb-3 text-[13px] font-medium">Add Lecture</h3>

                <div className="mb-2">
                  <p className="text-[13px]">Lecture Title</p>
                  <input
                    type="text"
                    value={lectureDetails.lectureTitle}
                    onChange={(e) =>
                      setLectureDetails({
                        ...lectureDetails,
                        lectureTitle: e.target.value,
                      })
                    }
                    className="mt-1 block w-full border border-gray-200 rounded py-1 px-2 outline-0"
                  />
                </div>

                <div className="mb-2">
                  <p className="text-[13px]">Duration (minutes)</p>
                  <input
                    type="number"
                    value={lectureDetails.lectureDuration}
                    onChange={(e) =>
                      setLectureDetails({
                        ...lectureDetails,
                        lectureDuration: e.target.value,
                      })
                    }
                    className="mt-1 block w-full border border-gray-200 rounded py-1 px-2 outline-0"
                  />
                </div>

                <div className="mb-2">
                  <p className="text-[13px]">Lecture URL</p>
                  <input
                    type="text"
                    value={lectureDetails.lectureUrl}
                    onChange={(e) =>
                      setLectureDetails({
                        ...lectureDetails,
                        lectureUrl: e.target.value,
                      })
                    }
                    className="mt-1 block w-full border border-gray-200 rounded py-1 px-2 outline-0"
                  />
                </div>

                <div className="flex gap-2 my-3">
                  <p className="text-[13px]">Is Preview Free?</p>
                  <input
                    type="checkbox"
                    checked={lectureDetails.isPreviewFree}
                    onChange={(e) =>
                      setLectureDetails({
                        ...lectureDetails,
                        isPreviewFree: e.target.checked,
                      })
                    }
                    className="mt-1 scale-110 outline-0"
                  />
                </div>

                <button
                  type="button"
                  className="w-full bg-gray-950 text-white py-1 px-3 rounded text-[13px] cursor-pointer"
                  onClick={addLecture}
                >
                  Add
                </button>
                <img
                  src={assets.cross_icon}
                  alt="cross icon"
                  onClick={() => setShowPopup(false)}
                  className="absolute w-3 top-4 right-4 cursor-pointer"
                />
              </div>
            </div>
          )}
        </div>
        <button
          type="submit"
          className="bg-gray-950 text-white rounded w-max my-3 py-2 px-4 cursor-pointer text-[13px]"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default AddCourse;
