'use client';

import { useAuth } from '../../context/AuthContext';
import ProtectedRoute from '../../components/ProtectedRoute';
import Link from 'next/link';

const DashboardPage = () => {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      <div className="p-6">
        <h1 className="text-2xl font-bold">Welcome, {user?.name}</h1>
        <div className="mt-4 space-x-4">
          <Link href="/dashboard/attendance" className="underline text-blue-600">Attendance</Link>
          <Link href="/dashboard/payroll" className="underline text-green-600">Payroll</Link>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default DashboardPage;
