"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function LayoutWrapper({ children }) {
    const pathname = usePathname();
    const authRoutes = ["/dashboard"];

    const isAuthPage = authRoutes.some(route => pathname?.startsWith(route));

    return (
        <div className="flex flex-col min-h-screen">
            {!isAuthPage && <Navbar />}
            <div className="flex-1">{children}</div>
            {!isAuthPage && <Footer />}


        </div>
    );
}
