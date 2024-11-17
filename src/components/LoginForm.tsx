import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/login", {
        username,
        password,
      });

      if (response.data.success) {
        sessionStorage.setItem("isLoggedIn", "true");
        navigate("/main");
      }
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  return (
    <form
      className="bg-white p-6 rounded shadow-md w-96"
      onSubmit={handleSubmit}
    >
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      {error && (
        <div className="bg-red-100 text-red-700 p-2 rounded mb-4">{error}</div>
      )}
      <div className="mb-4">
        <label className="block text-gray-700">Username</label>
        <input
          type="text"
          className="w-full p-2 border rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Password</label>
        <input
          type="password"
          className="w-full p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
