import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import Main from "./Pages/Main";

const App: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 p-4">
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/main" element={<Main />} />
      </Routes>
    </div>
  );
};

export default App;
