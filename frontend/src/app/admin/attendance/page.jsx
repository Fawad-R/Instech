'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import ProtectedRoute from '../../../components/ProtectedRoute';

const AdminAttendancePage = () => {
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/attendance/all`, {
        withCredentials: true
      });
      console.log(res.data,'users')
      setAttendanceData(res.data);
    };
    fetchData();
  }, []);

  return (
    <ProtectedRoute adminOnly={true}>
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4">All Employee Attendance</h2>

        {attendanceData.length === 0 ? (
          <p>No attendance records found.</p>
        ) : (
          <div className="overflow-auto">
            <table className="min-w-full bg-white text-sm border">
              <thead>
                <tr>
                  <th className="py-2 px-4 border">Employee</th>
                  <th className="py-2 px-4 border">Date</th>
                  <th className="py-2 px-4 border">Status</th>
                  <th className="py-2 px-4 border">Check-In</th>
                  <th className="py-2 px-4 border">Check-Out</th>
                </tr>
              </thead>
              <tbody>
                {attendanceData?.map((record) => (
                  <tr key={record._id}>
                    <td className="text-center border px-4 py-2">{record?.userId?.name}</td>
                    <td className="text-center border px-4 py-2">
                      {new Date(record?.date).toLocaleDateString()}
                    </td>
                    <td className="text-center border px-4 py-2">{record?.status}</td>
                    <td className="text-center border px-4 py-2">
                      {record?.checkIn ? record?.checkIn : '--'}
                    </td>
                    <td className="text-center border px-4 py-2">
                      {record?.checkOut ? new Date(record?.checkOut).toLocaleTimeString() : '--'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
};

export default AdminAttendancePage;
