"use client";

import { cn } from "@/lib/utils";
import { Toaster } from "./ui/toaster";
import { useStore } from "@/lib/hooks/use-store";
import { useSidebarToggle } from "./sidebar/use-sidebar-toggle";
import { Sidebar } from "./sidebar/sidebar";

export default function AppLayout({
    children
}: {
    children: React.ReactNode;
}) {
    const sidebar = useStore(useSidebarToggle, (state) => state);

    if (!sidebar) return null;

    return (
        <>
            <Sidebar />
            <main
                className={cn(
                    "min-h-screen p-8 bg-zinc-50 dark:bg-zinc-900 transition-[margin-left] ease-in-out duration-300",
                    sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-72"
                )}
            >
                {children}
            </main>
            <Toaster />
        </>
    );
}
