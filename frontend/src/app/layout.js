import { AuthProvider } from '../context/AuthContext';
import './globals.css';
import { Toaster } from 'react-hot-toast';
export const metadata = {
  title: "Employee Management System",
  description: "Track attendance, leaves, and payrolls",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-100 font-sans">
        <main className="">
          <AuthProvider>
             <Toaster position="top-right" />
            {children}
            </AuthProvider>
        </main>
      </body>
    </html>
  );
}
