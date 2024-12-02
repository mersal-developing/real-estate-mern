import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { singInSuccess } from "../redux/user/userSlice";

import {
  apiCallStart,
  apiCallSuccess,
  apiCallFailed,
} from "../redux/apiCallStatus/loadingSlice";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const [isEmailValid, setIsEmailValid] = useState(true);
  const { loading, error } = useSelector((state) => state.loading);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFormChanges = (e) => {
    const { id, value } = e.target;

    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });

    if (id === "email") {
      setIsEmailValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(apiCallStart());

      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.message) {
        dispatch(apiCallFailed(data.message));
        return;
      }

      dispatch(singInSuccess(data));
      dispatch(apiCallSuccess());

      navigate("/");
    } catch (error) {
      dispatch(apiCallFailed(error.message));
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg"
          id="email"
          onChange={handleFormChanges}
        />
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg"
          id="password"
          minLength="6"
          onChange={handleFormChanges}
        />
        <button
          disabled={
            loading ||
            !formData.email ||
            !formData.password ||
            formData.password.length < 6 ||
            !isEmailValid
          }
          className="bg-slate-700 text-white p-3 disabled:opacity-80 rounded-lg"
        >
          Sign In
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Don&apos;t Have an account?</p>
        <Link to="/sign-up" className="cursor-pointer text-blue-500">
          Sign Up
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
}
