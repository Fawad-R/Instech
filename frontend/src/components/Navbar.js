'use client';

import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <Link href="/" className="text-lg font-bold">EMS</Link>
      <div className="space-x-4">
        {user ? (
          <>
            {user.role === 'admin' ? (
              <Link href="/admin">Admin</Link>
            ) : (
              <Link href="/dashboard">Dashboard</Link>
            )}
            <button onClick={logout} className="text-red-400">Logout</button>
          </>
        ) : (
          <>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
