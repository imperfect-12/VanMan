import { Link } from "react-router-dom";

const QuoteButton = () => {
  return (
    <div className="flex justify-center">
      <Link
        to="/quote"
        className="px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg
               hover:bg-blue-700 transition-colors duration-200
               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Get a Quote
      </Link>
    </div>
  );
};

export default QuoteButton;
