import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Loading = () => {
  const { path } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (path) {
      const timer = setTimeout(() => {
        navigate(`/${path}`);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, []);
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-14 sm:w-16 aspect-square border-4 border-gray-300 border-t-4 border-t-black rounded-full animate-spin "></div>
    </div>
  );
};

export default Loading;
