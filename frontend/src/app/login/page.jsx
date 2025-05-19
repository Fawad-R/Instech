'use client';

import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const { register, handleSubmit } = useForm();
  const { login } = useAuth();
  const router = useRouter();

  const onSubmit = async (data) => {
  try {
    const res = await login(data); // assuming login() returns the axios response
    toast.success(res?.message || 'Login successful!');
    router.push('/dashboard');
  } catch (err) {
    console.error(err);

    // Extract the error message from the response or default to "Login failed"
    const errorMessage = err?.response?.data?.message || 'Login failed';
    toast.error(errorMessage);
  }
};

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-md p-8 rounded-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="block mb-2 text-sm text-gray-700">Email</label>
          <input
            type="email"
            {...register('email')}
            placeholder="Enter your email"
            required
            className="w-full px-3 py-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label className="block mb-2 text-sm text-gray-700">Password</label>
          <input
            type="password"
            {...register('password')}
            placeholder="Enter your password"
            required
            className="w-full px-3 py-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
