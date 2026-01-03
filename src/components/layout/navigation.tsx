'use client';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { LayoutGrid, Archive, BookOpen, Settings, GraduationCap } from 'lucide-react';
import { useSettings } from '@/contexts/settings-context';

export function Navigation() {
  const pathname = usePathname();
  const { settings } = useSettings();

  const navItems = [
    { href: '/', label: 'Dashboard', icon: LayoutGrid },
    { href: '/inventory', label: 'Inventory', icon: Archive },
    { href: '/recipes', label: 'Recipes', icon: BookOpen },
    ...(settings.showBeta ? [{ href: '/learn', label: 'Learn', icon: GraduationCap }] : []),
    { href: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <SidebarMenu>
      {navItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <SidebarMenuButton
            asChild
            isActive={pathname === item.href}
            tooltip={item.label}
          >
            <Link href={item.href}>
              <item.icon />
              <span>{item.label}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
