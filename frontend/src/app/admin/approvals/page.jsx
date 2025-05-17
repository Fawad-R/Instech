'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import ProtectedRoute from '@/components/ProtectedRoute';

const ApprovalsPage = () => {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchPendingUsers = async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/admin/pending`, {
        withCredentials: true
      });
      setPendingUsers(res.data);
    };
    fetchPendingUsers();
  }, []);

  const handleChange = (userId, field, value) => {
    setFormData(prev => ({
      ...prev,
      [userId]: {
        ...prev[userId],
        [field]: value
      }
    }));
  };

  const approveUser = async (userId) => {
    const userData = formData[userId];
    if (!userData?.designation || !userData?.salary) {
      alert('Please enter designation and salary before approving.');
      return;
    }

    await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/approve`,
      {
        userId,
        designation: userData.designation,
        salary: userData.salary,
      },
      { withCredentials: true }
    );

    setPendingUsers(pendingUsers.filter((user) => user._id !== userId));
    const updatedFormData = { ...formData };
    delete updatedFormData[userId];
    setFormData(updatedFormData);
  };

  return (
    <ProtectedRoute adminOnly={true}>
    
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Pending Approvals</h1>
      <ul className="space-y-4">
        {pendingUsers.map((user) => (
          <li key={user._id} className="border p-4 rounded">
            <p className="font-semibold">{user.name} - {user.email}</p>
            <div className="mt-2 space-y-2">
              <input
                type="text"
                placeholder="Designation"
                className="border p-2 w-full"
                value={formData[user._id]?.designation || ''}
                onChange={(e) => handleChange(user._id, 'designation', e.target.value)}
              />
              <input
                type="number"
                placeholder="Fixed Monthly Salary"
                className="border p-2 w-full"
                value={formData[user._id]?.salary || ''}
                onChange={(e) => handleChange(user._id, 'salary', e.target.value)}
              />
              <button
                onClick={() => approveUser(user._id)}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Approve
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
    </ProtectedRoute>
  );
};

export default ApprovalsPage;
