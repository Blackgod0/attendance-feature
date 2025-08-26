import { useState } from 'react';
import api from '../api';

export default function UploadAttendance() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('image', image);

    try {
      const res = await api.post('/upload_attendance', formData);
      setResult(res.data);
    } catch (err) {
      alert('Upload failed: ' + err.message);
    }
  };

  return (
    <div className="p-4 border rounded mb-6">
      <h2 className="text-lg font-semibold mb-3">Upload Class Image</h2>
      <input type="file" accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        className="w-full mb-2"
      />
      <button onClick={handleUpload}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
        Mark Attendance
      </button>

      {result && (
        <div className="mt-4">
          <p className="font-semibold">Present Students:</p>
          <ul className="list-disc ml-5">
            {result.present.map((reg, i) => <li key={i}>{reg}</li>)}
          </ul>
          <p className="mt-2">Date: {result.attendance_date}</p>
        </div>
      )}
    </div>
  );
}
