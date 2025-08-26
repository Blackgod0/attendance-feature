import { useEffect, useState } from 'react';
import api from '../api';

export default function AttendanceDashboard() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    api.get('/attendance').then((res) => setRecords(res.data));
  }, []);

  return (
    <div className="p-4 border rounded mb-6 overflow-x-auto">
      <h2 className="text-lg font-semibold mb-3">Attendance Report</h2>
      <table className="w-full table-auto border-collapse border border-gray-300 text-sm">
        <thead>
          <tr className="bg-blacl-100">
            <th className="border px-2 py-1">Name</th>
            <th className="border  px-2 py-1">Reg No</th>
            <th className="border  px-2 py-1">Date</th>
            <th className="border  px-2 py-1">Status</th>
          </tr>
        </thead>
        <tbody>
          {records.map((rec, i) => (
            <tr key={i}>
              <td className="border px-2 py-1">{rec.name}</td>
              <td className="border px-2 py-1">{rec.reg_no}</td>
              <td className="border px-2 py-1">{rec.date}</td>
              <td className="border px-2 py-1">{rec.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
