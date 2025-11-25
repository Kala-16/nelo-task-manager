import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/authService";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const nav = useNavigate();

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    if (!email || !password) {
      setErr("Email and password are required");
      return;
    }
    const ok = authService.login(email, password);
    if (!ok) {
      setErr("Login failed");
      return;
    }
    nav("/tasks");
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form className="w-full max-w-md bg-white p-6 rounded shadow" onSubmit={submit}>
        <h2 className="text-2xl mb-4">Task Manager — Login</h2>
        {err && <div className="text-sm text-red-600 mb-2">{err}</div>}
        <label className="block mb-2">
          <input className="w-full border p-2 rounded" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        </label>
        <label className="block mb-4">
          <input type="password" className="w-full border p-2 rounded" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        </label>
        <button className="w-full bg-indigo-600 text-white py-2 rounded">Login</button>
      </form>
    </div>
  );
}