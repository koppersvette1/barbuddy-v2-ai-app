import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { SettingsProvider } from '@/contexts/settings-context';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { BarBuddyIcon } from '@/components/icons';
import { Navigation } from '@/components/layout/navigation';

export const metadata: Metadata = {
  title: 'BarBuddy: Your AI Mixology Navigator',
  description: 'Your creative Mixology Partner and Flavor Architect.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <SettingsProvider>
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
        </SettingsProvider>
      </body>
    </html>
  );
}
