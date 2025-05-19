import { LogIn } from "lucide-react";
import Link from "next/link";
// import { useRouter } from 'next/navigation';


const Index = () => {
  // const router=useRouter();
  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center bg-gradient-to-br from-white via-purple-100 to-[#9b87f5] px-4">
      <div className="w-full max-w-xl bg-white/60 backdrop-blur-lg rounded-3xl shadow-2xl p-10 flex flex-col items-center gap-6 border border-gray-200">
        <div className="flex flex-col items-center gap-4">
          <div className="bg-vividPurple/5 rounded-full p-4 mb-2">
            <LogIn size={48} className="text-purple-500 drop-shadow-lg" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900">
            Welcome to <span className="text-[color:#9b87f5]">Employee Management System</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mt-2 max-w-md">
            Manage your team, leave records, and employee data with ease—all in one place.
          </p>
        </div>
        <Link href="/login" className="mt-4 w-full flex justify-center">
          <button className="inline-flex items-center gap-2 px-7 py-3 rounded-xl font-semibold text-white bg-[color:#9b87f5] hover:bg-[color:#7E69AB] shadow-xl transition duration-200 text-lg focus:outline-none focus:ring-4 focus:ring-purple-200">
            <LogIn className="mr-2" />
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Index;