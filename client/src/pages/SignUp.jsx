import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setloading] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);

  const navigate = useNavigate();

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
      setloading(true);

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!data.user) {
        setError(data.message);
        setloading(false);
        return;
      }

      setloading(false);
      setError(null);
      navigate("/");
    } catch (error) {
      setloading(false);
      setError(error.message);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">SignUp</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="username"
          className="border p-3 rounded-lg"
          id="username"
          onChange={handleFormChanges}
        />
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
            !formData.username ||
            !formData.email ||
            !formData.password ||
            formData.password.length < 6 ||
            !isEmailValid
          }
          className="bg-slate-700 text-white p-3 disabled:opacity-80 rounded-lg"
        >
          Sign up
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to="/sign-in" className="cursor-pointer text-blue-500">
          Sign in
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
}
