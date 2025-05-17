'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';

const LeavePage = () => {
  const [date, setDate] = useState('');
  const [reason, setReason] = useState('');
  const router = useRouter();

  const handleLeaveSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/attendance/leave`, { date, reason }, {
      withCredentials: true
    });
    alert('Leave applied successfully!');
    router.push('/dashboard/attendance');
  };

  return (
    <ProtectedRoute>
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Apply for Leave</h2>
      <form onSubmit={handleLeaveSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Date</label>
          <input
            type="date"
            required
            min={new Date().toISOString().split("T")[0]} // today's date
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border p-2"
          />

        </div>
        <div>
          <label className="block mb-1">Reason</label>
          <textarea
            required
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full border p-2"
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Submit Leave</button>
      </form>
    </div>
     </ProtectedRoute>
  );
};

export default LeavePage;
