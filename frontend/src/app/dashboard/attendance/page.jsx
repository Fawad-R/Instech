'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import ProtectedRoute from '../../../components/ProtectedRoute';
import Link from 'next/link';

const AttendancePage = () => {
  const [attendance, setAttendance] = useState([]);
  const [todayStatus, setTodayStatus] = useState(null);

  const fetchAttendance = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/attendance/me`, {
  withCredentials: true
});
console.log('res.data',res.data)
console.log('res.data.records',res.data.records)
    setAttendance(res.data);
    setTodayStatus(res.data.today); // { status: "Present" | "Leave" | null, checkIn, checkOut }
  };

  const checkIn = async () => {
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/attendance/check-in`,{}, {
        withCredentials: true
      });
    fetchAttendance();
  };

  const checkOut = async () => {
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/attendance/check-out`,{}, {
        withCredentials: true
      });
    fetchAttendance();
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  return (
    <ProtectedRoute>
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Attendance</h2>

        <div className="mb-6 border p-4 bg-gray-50">
          <p className="mb-2">Today's Status: <strong>{todayStatus?.status || 'Not Marked'}</strong></p>
          <div className="space-x-4 flex justify-between">
            {!todayStatus?.checkIn && (
              <button onClick={checkIn} className="px-4 py-2 bg-green-600 text-white rounded">Check In</button>
            )}
            {todayStatus?.checkIn && !todayStatus?.checkOut && (
              <button onClick={checkOut} className="px-4 py-2 bg-yellow-500 text-white rounded">Check Out</button>
            )}
<Link href="/dashboard/attendance/leave" className="text-blue-500 underline">Apply for Leave</Link>

          </div>
        </div>

        <h3 className="text-lg font-medium mb-2">Your Attendance Records</h3>
        <table className="w-full bg-white text-sm">
          <thead>
            <tr>
              <th className="py-2">Date</th>
              <th className="py-2">Status</th>
              <th className="py-2">Check In</th>
              <th className="py-2">Check Out</th>
            </tr>
          </thead>
          <tbody>
            {attendance?.map((a) => (
              <tr key={a._id}>
                <td className="text-center py-1">{new Date(a.date).toLocaleDateString()}</td>
                <td className="text-center py-1">{a.status}</td>
                <td className="text-center py-1">{a.checkIn ? a.checkIn : '--'}</td>
                <td className="text-center py-1">{a.checkOut ? new Date(a.checkOut).toLocaleTimeString() : '--'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ProtectedRoute>
  );
};

export default AttendancePage;
