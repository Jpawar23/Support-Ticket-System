import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import { useState } from "react";
import { toast } from "react-toastify";
import api from "../utils/axiosInstance";
export default function LoginPage() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!data.email || !data.password) {
      toast.error("All fields are required");
      return;
    }
    try {
      const res = await api.post("/auth/login", data);
      console.log("Login success:", res.data);
      // save token
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("name", res.data.name);
      signIn(res.data);
      // navigate("/");
      if (res.data.user.role === "admin") {
        navigate("/");
      } else {
        // navigate("/employee-dashboard");
        navigate("/user-ticket");
      }
    } catch (error) {
      console.error("error", error.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      {/* Card */}
      <div className="w-full max-w-md bg-white shadow-md rounded-xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Login
        </h2>

        <form onSubmit={handleLogin}>
          {/* Email field */}
          <div className="mb-4 text-left">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-900"
            >
              Email
            </label>
            <div className="mt-1 relative">
              <input
                id="email"
                name="email"
                type="email"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                placeholder="you@example.com"
                className={` block w-full rounded-md border  bg-white py-2 px-3 pr-10 focus:outline-none focus:ring-2  sm:text-sm`}
              />
            </div>
          </div>

          {/* Password field */}
          <div className="mb-6 text-left">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-900"
            >
              Password
            </label>
            <div className="mt-1 relative">
              <input
                id="password"
                name="password"
                type="password"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
                placeholder="Enter your password"
                className={`block w-full rounded-md border  bg-white py-2 px-3 pr-10 focus:outline-none focus:ring-2  sm:text-sm`}
              />
            </div>
          </div>

          {/* Sign in button */}
          <button
            type="submit"
            className="w-full rounded-md bg-indigo-600 py-2 px-4 text-white font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
