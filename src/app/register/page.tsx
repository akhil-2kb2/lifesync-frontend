'use client';

import { useState } from "react";
import FormInput from "@/components/FormInput";
import { apiRequest } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiRequest("auth/register", "POST", { name, email, password });
      router.push("/login"); // 🚀 after registration
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleRegister} className="flex flex-col gap-4 w-80">
        <h1 className="text-2xl font-bold text-center">Register</h1>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <FormInput label="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <FormInput label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <FormInput label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

        <button type="submit" className="bg-green-600 hover:bg-green-700 text-white py-2 rounded-md">
          Register
        </button>

        <p className="text-sm text-center">
          Already have an account? <a href="/login" className="text-blue-600 underline">Login</a>
        </p>
      </form>
    </div>
  );
}
