import AdminSidebar from "@/components/admin/Sidebar";
import "../globals.css"; // Ensure globals are loaded

export const metadata = {
  title: "Admin Dashboard - Apthire",
  description: "Manage users and jobs",
};

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-emerald-500/30">
        <AdminSidebar />
        <main className="md:ml-64 p-4 md:p-8 min-h-screen transition-all duration-300">
          {children}
        </main>
    </div>
  );
}
