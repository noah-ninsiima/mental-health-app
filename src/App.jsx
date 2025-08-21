import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthModal from "./assets/Pages/Authentication/AuthModal"; // Relative path + capital 'S'
import Navbar from "./assets/components/Navbar/Navbar.jsx";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/authentication" replace />} />
        <Route path="/authentication" element={<AuthModal />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;