import { FaStar } from "react-icons/fa";

export const renderStars = () => {
  return [...Array(5)].map((_, i) => {
  return <FaStar size={18} key={i} className="text-yellow-400" />;
  });
};
