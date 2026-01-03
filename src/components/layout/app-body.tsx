"use client";

import { useSettings } from '@/contexts/settings-context';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { BarBuddyIcon } from '@/components/icons';
import { Navigation } from '@/components/layout/navigation';
import { Toaster } from '../ui/toaster';

export function AppBody({ children }: { children: React.ReactNode }) {
  const { settings } = useSettings();
  return (
    <body className="font-body antialiased" data-font-size={settings.fontSize}>
      <SidebarProvider>
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2 w-full">
              <BarBuddyIcon className="w-8 h-8 text-primary" />
              <span className="text-xl font-headline font-bold text-sidebar-foreground group-data-[collapsible=icon]:hidden">
                BarBuddy
              </span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <Navigation />
          </SidebarContent>
          <SidebarFooter className="group-data-[collapsible=icon]:hidden">
            <p className="text-xs text-sidebar-foreground/50">Your AI Mixology Navigator</p>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
            {children}
        </SidebarInset>
      </SidebarProvider>
      <Toaster />
    </body>
  );
}
