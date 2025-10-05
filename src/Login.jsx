import { useState } from "react";
import { useLogin } from "./hooks/useLogin";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();

    if (!username || !password) return;

    login({ username, password });
    setUsername("");
    setPassword("");
  }

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 p-6 border-2 border-gray-300 rounded-lg shadow-md w-80 bg-white"
      >
        <h2 className="text-xl font-bold text-center">Login</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 rounded"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
          required
        />

        {error && (
          <p className="text-red-500 text-sm text-center">
            {error.message || "Invalid login"}
          </p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;
