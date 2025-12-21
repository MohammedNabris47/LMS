import { useContext } from "react";
import assets from "../../assets/assets";
import { GlobalContext } from "../../context/AppContext";
import { Link } from "react-router-dom";

const CourseCard = ({ course }) => {
  const { currency, calculateRating } = useContext(GlobalContext);
  return (
    <Link
      to={"/course/" + course._id}
      onClick={() => scrollTo(0, 0)}
      className="border border-gray-500/30 pb-6 overflow-hidden rounded-lg"
    >
      <img
        src={course.courseThumbnail}
        alt="courseThumbnail"
        className="w-full select-none"
      />
      <div className="text-left p-3">
        <h3 className="text-sm font-semibold">{course.courseTitle}</h3>
        <p className="text-gray-700 text-[13px]">{course.educator.name}</p>
        <div className="flex items-center space-x-2">
          <p>{calculateRating(course)}</p>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <img
                key={i}
                src={
                  i < Math.floor(calculateRating(course))
                    ? assets.star
                    : assets.star_blank
                }
                alt="star"
                className="w-3 h-3"
              />
            ))}
          </div>
          <p className="text-gray-600">{course.courseRatings.length}</p>
        </div>
        <p className="text-gray-800 text-base font-semibold">
          {currency}
          {(
            course.coursePrice -
            (course.discount * course.coursePrice) / 100
          ).toFixed(2)}
        </p>
      </div>
    </Link>
  );
};

export default CourseCard;
