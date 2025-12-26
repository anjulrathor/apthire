"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminSidebar() {
  const pathname = usePathname();

  const links = [
    { name: 'Dashboard', href: '/admin' },
    { name: 'Users', href: '/admin/users' },
    { name: 'Jobs', href: '/admin/jobs' },
    { name: 'Applications', href: '/admin/applications' },
  ];

  return (
    <aside className="w-64 bg-[#0d0d0d] border-r border-white/10 h-screen flex flex-col fixed left-0 top-0 z-50">
      <div className="p-6 border-b border-white/10">
        <h1 className="text-xl font-bold text-white tracking-widest">APT<span className="text-emerald-500">HIRE</span></h1>
        <p className="text-xs text-gray-500 mt-1">Admin Console</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`block px-4 py-2.5 rounded-md text-sm transition-colors ${
                isActive
                  ? 'bg-emerald-600 text-white'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              {link.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <Link 
            href="/"
            className="block px-4 py-2 text-sm text-gray-500 hover:text-white transition-colors"
        >
            Exit to Home
        </Link>
      </div>
    </aside>
  );
}
