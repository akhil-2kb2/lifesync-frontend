'use client';

import { useState } from "react";
import FormInput from "@/components/FormInput";
import { apiRequest } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await apiRequest("auth/login", "POST", { email, password });
      localStorage.setItem("token", res.token);
      router.push("/dashboard"); // 🚀 after login
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleLogin} className="flex flex-col gap-4 w-80">
        <h1 className="text-2xl font-bold text-center">Login</h1>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <FormInput label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <FormInput label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md">
          Login
        </button>

        <p className="text-sm text-center">
          Don't have an account? <a href="/register" className="text-blue-600 underline">Register</a>
        </p>
      </form>
    </div>
  );
}
