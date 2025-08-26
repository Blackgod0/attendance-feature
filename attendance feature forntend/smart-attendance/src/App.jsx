import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import StudentRegister from './components/StudentRegister';
import UploadAttendance from './components/UploadAttendance';
import AttendanceDashboard from './components/AttendanceDashboard';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/register" element={
        <div className="flex flex-col md:flex-row p-4 gap-4">
          <div className="md:w-1/2">
            <StudentRegister />
        <div className='flex flex-col md:flex-row p-4 gap-4'>

          <UploadAttendance/>
          </div>
          
            
          </div>
          
        </div>
      } />
      <Route path="/dashboard" element={<AttendanceDashboard />} />
    </Routes>
  );
}
