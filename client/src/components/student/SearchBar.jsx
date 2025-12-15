import { useState } from "react";
import assets from "../../assets/assets";
import { useNavigate } from "react-router-dom";
const SearchBar = ({ data }) => {
  const navigate = useNavigate();
  const [input, setInput] = useState(data ? data : "");

  const searchSubmit = (e) => {
    e.preventDefault();
    navigate("/course-list/" + input);
  };
  return (
    <form
      className="max-w-xl w-full h-12 md:h-14 flex items-center bg-white border border-gray-500/20 rounded "
      onSubmit={searchSubmit}
    >
      <img
        src={assets.search_icon}
        alt="searchIcon"
        className="w-10 md:w-auto px-3"
      />
      <input
        type="text"
        placeholder="Search Courses Here"
        className="w-full h-full outline-0 text-gray-500/80 placeholder-sm"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-500 text-white rounded px-7 md:px-10 py-2 md:py-3 mx-1 cursor-pointer outline-0"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
