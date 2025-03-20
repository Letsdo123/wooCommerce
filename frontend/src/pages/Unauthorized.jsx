import { Link } from "react-router-dom";
import unauthorized_access from "../assets/images/unauthorized_access.gif";
const Unauthorized = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-2xl p-8 bg-white shadow-lg rounded-2xl text-center">
        <img
          src={unauthorized_access}
          alt="Unauthorized Access"
          className="mx-auto w-64"
        />
        <h2 className="text-3xl font-bold text-red-600 mt-6">Access Denied!</h2>
        <p className="text-gray-600 mt-4 text-lg">
          Oops! You don’t have permission to view this page.  
          If you think this is a mistake, please contact support.
        </p>

        <div className="mt-6">
          <Link
            to="/"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium transition duration-300 hover:bg-blue-700"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
