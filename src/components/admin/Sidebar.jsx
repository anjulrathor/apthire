"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  FileText, 
  MessageSquare, 
  User, 
  LogOut, 
  ExternalLink,
  PlusCircle,
  BarChart3,
  ShieldCheck,
  Bell
} from 'lucide-react';
import Logo from '../ui/Logo';

export default function AdminSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const links = [
    { name: 'Dashboard', href: '/admin', icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: 'Manage Users', href: '/admin/users', icon: <Users className="w-5 h-5" /> },
    { name: 'Manage Jobs', href: '/admin/jobs', icon: <Briefcase className="w-5 h-5" /> },
    { name: 'Applications', href: '/admin/applications', icon: <FileText className="w-5 h-5" /> },
    { name: 'Contact Leads', href: '/admin/leads', icon: <MessageSquare className="w-5 h-5" /> },
  ];

  const secondaryLinks = [
    { name: 'Site Analytics', href: '/admin/analytics', icon: <BarChart3 className="w-5 h-5" />, badge: 'Pro' },
    { name: 'Audit Logs', href: '/admin/logs', icon: <ShieldCheck className="w-5 h-5" /> },
    { name: 'System Alerts', href: '/admin/alerts', icon: <Bell className="w-5 h-5" /> },
  ];

  return (
    <aside className="w-64 bg-[#0d0d0d] border-r border-white/10 h-screen flex flex-col fixed left-0 top-0 z-50 shadow-2xl">
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-2.5 group cursor-pointer mb-2">
            <div className={`relative w-8 h-8 flex items-center justify-center`}>
                <div className="absolute inset-0 bg-emerald-600 rounded-lg rotate-6 opacity-20 group-hover:rotate-12 transition-all"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg shadow-lg shadow-emerald-500/20"></div>
                <span className={`relative font-black text-white text-base tracking-tighter`}>A</span>
            </div>
            <span className={`font-head font-black tracking-tighter text-lg text-white group-hover:text-emerald-400 transition-colors`}>
                Apthire<span className="text-emerald-500">.</span>
            </span>
        </div>
        <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full inline-block">
          <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">Administrator</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-8 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        {/* Main Navigation */}
        <nav className="space-y-1">
          <p className="px-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 opacity-50">Management</p>
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all group ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/20'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <span className={`${isActive ? 'text-white' : 'text-gray-500 group-hover:text-emerald-400'} transition-colors`}>
                  {link.icon}
                </span>
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Professional Tools */}
        <nav className="space-y-1">
          <p className="px-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 opacity-50">Admin Tools</p>
          {secondaryLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:bg-white/5 hover:text-white transition-all group`}
            >
              <div className="flex items-center gap-3">
                <span className="text-gray-500 group-hover:text-emerald-400 transition-colors">
                    {link.icon}
                </span>
                {link.name}
              </div>
              {link.badge && (
                <span className="text-[10px] bg-white/10 text-gray-400 px-1.5 py-0.5 rounded font-bold">{link.badge}</span>
              )}
            </Link>
          ))}
        </nav>

        {/* Quick Links */}
        <nav className="space-y-1">
          <p className="px-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 opacity-50">Quick Links</p>
          <Link
            href="/admin/jobs/new"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:bg-white/5 hover:text-white transition-all group"
          >
            <PlusCircle className="w-5 h-5 text-gray-500 group-hover:text-emerald-400" />
            Post New Job
          </Link>
          <Link
            href="/profile"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:bg-white/5 hover:text-white transition-all group"
          >
            <User className="w-5 h-5 text-gray-500 group-hover:text-emerald-400" />
            My Admin Profile
          </Link>
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-emerald-500 hover:bg-emerald-500/10 transition-all group"
          >
            <ExternalLink className="w-5 h-5" />
            Live Website
          </Link>
        </nav>
      </div>

      {/* User Session */}
      <div className="p-4 border-t border-white/10 bg-[#0a0a0a]">
        {user && (
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 mb-2 border border-white/5">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-black text-sm shrink-0 shadow-lg">
               {user.name[0]}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-white truncate">{user.name}</p>
              <p className="text-[10px] text-gray-500 truncate">{user.role}</p>
            </div>
          </div>
        )}
        <button 
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-500/10 transition-all group"
        >
          <LogOut className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          Logout Session
        </button>
      </div>
    </aside>
  );
}
