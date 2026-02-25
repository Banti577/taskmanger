"use client";

import Navbar from '@/components/Navbar';
import Footer from '../../components/Footer';
import SideNav from './dashboard/SideNav';



export default function DashboardLayout({ children }) {

    return (
        <div className="flex h-screen w-full overflow-hidden bg-white">

            <aside className="w-[15%] h-full shrink-0 ">
                <SideNav />
            </aside>
            <div className="flex flex-1 flex-col overflow-hidden">
                <header className="sticky top-0 z-10 w-full bg-white border-b border-gray-200">
                    <Navbar />
                </header>

                <main className="flex-1 overflow-y-auto p-4 bg-gray-100">
                    {children}
                </main>

                <Footer />
            </div>
        </div>

    );
}
