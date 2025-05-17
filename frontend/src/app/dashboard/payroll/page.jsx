'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function PayrollPage() {
  const [payroll, setPayroll] = useState(null);
  const [loading, setLoading] = useState(false);
  const [month, setMonth] = useState(new Date().getMonth() + 1); // 1-12
  const [year, setYear] = useState(new Date().getFullYear());

  const fetchPayroll = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/payroll/generate`,
        {
          employeeId: 'me', // or actual employee ID if admin view
          month,
          year,
        },
        {
          withCredentials: true
        }
      );

      setPayroll(res.data);
    } catch (err) {
      console.error('Failed to fetch payroll:', err);
      setPayroll(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayroll();
  }, [month, year]);

  return (
<ProtectedRoute>
    
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Payroll</h1>

      <div className="flex gap-4 mb-6">
        <select value={month} onChange={(e) => setMonth(Number(e.target.value))} className="p-2 border rounded">
          {[...Array(5)].map((_, i) => (
            <option key={i + 1} value={i + 1}>{new Date(0, i).toLocaleString('default', { month: 'long' })}</option>
          ))}
        </select>
        <select value={year} onChange={(e) => setYear(Number(e.target.value))} className="p-2 border rounded">
          {[ 2025].map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </div>

      {loading && <p>Loading payroll...</p>}

      {payroll && (
        <div>
          <div className="mb-4">
            <p><strong>Employee:</strong> {payroll.employee}</p>
            <p><strong>Designation:</strong> {payroll.designation}</p>
            <p><strong>Total Working Days:</strong> {payroll.totalDays}</p>
            <p><strong>Present:</strong> {payroll.present}</p>
            <p><strong>Leave:</strong> {payroll.leave}</p>
            <p><strong>Absent:</strong> {payroll.absent}</p>
            <p><strong>Total Salary:</strong> ₹{payroll?.totalSalary?.toFixed(2)}</p>
          </div>

          <h2 className="text-lg font-semibold mb-2">Daily Breakdown</h2>
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Date</th>
                <th className="border p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {payroll.detailedRecords.map((rec, index) => (
                <tr key={index}>
                  <td className="border p-2">{rec.date}</td>
                  <td className="border p-2">
                    <span className={
                      rec.status === 'Present' ? 'text-green-600' :
                        rec.status === 'Leave' ? 'text-yellow-600' :
                          'text-red-600'
                    }>
                      {rec.status}
                    </span>
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
}
