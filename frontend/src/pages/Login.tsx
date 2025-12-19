import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: loginUser,

    onSuccess: () => {
      localStorage.setItem("isAuth", "true");
      navigate("/dashboard");
    },

    onError: (error: any) => {
      console.error("Login error:", error.response?.data || error.message);
    },
  });

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <form onSubmit={submitHandler} className="bg-gray-800 p-6 rounded w-80">
        <h2 className="text-xl mb-4">Login</h2>

        <input
          className="w-full p-2 mb-3 text-black"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full p-2 mb-3 text-black"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          disabled={mutation.isPending}
          className="w-full bg-blue-600 p-2 rounded disabled:opacity-50"
        >
          {mutation.isPending ? "Logging in..." : "Login"}
        </button>

        {mutation.isError && (
          <p className="text-red-400 mt-2">
            {(mutation.error as any)?.response?.data?.message || "Login failed"}
          </p>
        )}

        <p className="text-sm text-gray-300 mt-4 text-center">
          New user?{" "}
          <Link
            to="/register"
            className="text-blue-400 hover:underline font-medium"
          >
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
}
