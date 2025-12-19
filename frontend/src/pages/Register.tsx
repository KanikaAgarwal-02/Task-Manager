import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      navigate("/login");
    },
  });

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Register clicked", { name, email, password });
    mutation.mutate({ name, email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <form onSubmit={submitHandler} className="bg-gray-800 p-6 rounded w-80">
        <h2 className="text-xl mb-4">Register</h2>

        <input
          className="w-full p-2 mb-3 text-black"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />

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

        <button className="w-full bg-green-600 p-2 rounded">Register</button>

        {mutation.isSuccess && (
          <p className="text-green-400 mt-2">Registered successfully</p>
        )}

        <p className="text-sm text-gray-300 mt-4 text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-400 hover:underline font-medium"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
