import { useState } from 'react';
import api from '../api';

export default function StudentRegister() {
  const [name, setName] = useState('');
  const [regNo, setRegNo] = useState('');
  const [images, setImages] = useState([]);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('reg_no', regNo);
    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]);
    }

    try {
      await api.post('/register', formData);
      alert('Student registered successfully');
    } catch (err) {
      alert('Registration failed: ' + err.message);
    }
  };

  return (
    <div className="p-4 border rounded mb-6">
      <h2 className="text-lg font-semibold mb-3">Student Registration</h2>
      <input type="text" placeholder="Name" value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 border mb-2 rounded"
      />
      <input type="text" placeholder="Register Number" value={regNo}
        onChange={(e) => setRegNo(e.target.value)}
        className="w-full p-2 border mb-2 rounded"
      />
      <input type="file" multiple accept="image/*"
        onChange={(e) => setImages(e.target.files)}
        className="w-full mb-2"
      />
      <button onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Register
      </button>
    </div>
  );
}
