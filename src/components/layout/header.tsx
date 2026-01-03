"use client";

import { SidebarTrigger } from '@/components/ui/sidebar';

export function Header({ title }: { title: string }) {
  return (
    <header className="flex h-16 items-center gap-4 border-b bg-card/50 px-6 sticky top-0 z-10 backdrop-blur-sm">
      <SidebarTrigger className="md:hidden" />
      <h1 className="text-2xl font-bold text-primary">{title}</h1>
    </header>
  );
}
