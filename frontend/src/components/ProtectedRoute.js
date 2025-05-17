'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      // console.log('i am user',user)
  // console.log('i am user',user.role)
  // console.log('i am user',adminOnly)
      if (!user) {
        router.push('/login');
      } else if (adminOnly && user?.user?.role != 'admin') {
        router.push('/dashboard');
      }
    }
  }, [user, loading, adminOnly, router]);

  if (loading || !user) {
    return <p className="text-center p-4">Loading...</p>;
  }

  return children;
}
