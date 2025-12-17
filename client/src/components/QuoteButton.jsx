import { Link } from "react-router-dom";

const QuoteButton = () => {
  return (
    <div>
      <button>
        <Link to="/quote">Get a Quote</Link>
      </button>
    </div>
  );
};

export default QuoteButton;
