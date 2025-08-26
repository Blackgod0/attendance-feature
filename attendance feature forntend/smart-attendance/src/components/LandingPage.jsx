import { useNavigate } from 'react-router-dom';
import logo from "..//../public/logo.png"
import "./styles/LandingPage.scss"

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 relative">
      <div className="text-center">
        <img src={logo} alt="Logo" className="w-28 h-28 mx-auto mb-4" />
        <h1 className="text-3xl bg-black font-bold">Smart Classroom Attendance</h1>
      </div>

      <div className="absolute bottom-8 flex gap-6">
        <button
          onClick={() => navigate('/register')}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Student Registration
        </button>
        <button
          onClick={() => navigate('/dashboard')}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Attendance Dashboard
        </button>
      </div>
    </div>
  );
}
