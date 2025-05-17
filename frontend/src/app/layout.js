import { AuthProvider } from '../context/AuthContext';
import './globals.css';

export const metadata = {
  title: "Employee Management System",
  description: "Track attendance, leaves, and payrolls",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-100 font-sans">
        <main className="max-w-7xl mx-auto p-4">
                  <AuthProvider>{children}</AuthProvider>

        </main>
      </body>
    </html>
  );
}
