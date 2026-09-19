'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Scale, Search, ShieldAlert, ArrowLeftRight, Anchor, Archive, BookOpen, Shield } from 'lucide-react';

export default function Header() {
  const pathname = usePathname();

  const links = [
    { name: 'Measures', href: '/', icon: Scale },
    { name: 'Rate Lookup', href: '/lookup', icon: Search },
    { name: 'Retaliation Chains', href: '/retaliation', icon: ShieldAlert },
    { name: 'Trade Flows', href: '/flows', icon: ArrowLeftRight },
    { name: 'Ports & Freight', href: '/ports', icon: Anchor },
    { name: '24-Mo Archive', href: '/archive', icon: Archive },
    { name: 'Sources (15)', href: '/sources', icon: BookOpen },
    { name: 'Admin', href: '/admin', icon: Shield },
  ];

  return (
    <header className="bg-[#FFFFFF] border-b border-[#E4E9F0]">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded bg-[#0E63C4] flex items-center justify-center text-white font-bold text-base">
            T
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-[#0B1220] text-lg font-mono tracking-tight">TRADELINES</span>
              <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-[#EBF3FD] text-[#0A3F73] font-semibold border border-[#CBD5E1]">
                Tariff Policy & Flows
              </span>
            </div>
            <p className="text-xs text-[#5B6779]">Tariffs and trade flows, with the legal instruments attached.</p>
          </div>
        </Link>

        <nav className="flex items-center gap-1 overflow-x-auto py-1">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                  isActive
                    ? 'bg-[#EBF3FD] text-[#0E63C4] font-semibold border border-[#CBD5E1]'
                    : 'text-[#24303F] hover:bg-[#F6F8FB]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
