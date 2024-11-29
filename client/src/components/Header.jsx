import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center mx-auto max-w-6xl p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500">Oman</span>
            <span className="text-slate-700">Estate</span>
          </h1>
        </Link>

        <form
          action=""
          className="bg-slate-100 rounded-lg flex items-center p-2"
        >
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none w-30"
          />
          <FaSearch className="text-slate-500" />
        </form>

        <ul className="flex gap-4">
          <Link to="/">
            <li className="link">Home</li>
          </Link>
          <Link to="/about">
            <li className="link">About</li>
          </Link>
          <Link to="/sign-in">
            <li className="link">Login</li>
          </Link>
          <Link to="/sign-up">
            <li className="link">Sign Up</li>
          </Link>
          <Link to="/"></Link>
        </ul>
      </div>
    </header>
  );
}
