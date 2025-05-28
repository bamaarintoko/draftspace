'use client'
import ConfirmModal from "@/components/ConfirmModal";
import MenuItem from "@/components/MenuItem";
import { LogOut, Newspaper, Tag } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import Cookies from "js-cookie";
// import { useRouter } from "next/router";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [showModal, setShowModal] = useState(false)
    const pathname = usePathname();
    const router = useRouter()
    const pageTitle = getPageTitle(pathname);

    const handleLogout = () => {
        Cookies.remove("token");
        Cookies.remove("role");
        Cookies.remove("userId");
        // localStorage.removeItem("token");

        router.push("/auth/login");
    };
    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <aside className="w-[267px] bg-blue-600 text-white py-6 px-4">
                <img
                    src="/images/login_logo_white.png"
                    alt="Aplikasi Logo Putih"
                    className="xl:w-[134px] xl:h-[24px] w-[122px] h-[22px]"
                />
                <nav className='mt-6'>
                    <MenuItem icon={<Newspaper size={20} />} label="Articles" href="/admin/articles" />
                    <MenuItem icon={<Tag size={20} />} label="Category" href="/admin/category" />
                    <button
                        onClick={()=>setShowModal(true)}
                        className="w-full cursor-pointer flex items-center gap-3 rounded-md px-3 py-2 cursor-pointertext-white hover:bg-blue-500 hover:text-white"
                    >
                        <LogOut size={20} />
                        <span className="text-[16px] font-medium">Logout</span>
                    </button>
                    {/* <MenuItem icon={<LogOut size={20} />} label="Logout" href="" /> */}
                </nav>
            </aside>
            <ConfirmModal
                isOpen={showModal}
                title="Logout"
                description="Are you sure you want to logout?"
                onCancel={() => setShowModal(false)}
                onConfirm={handleLogout}
                confirmText="Logout"
                cancelText="Cancel"
            />
            {/* Main Content */}
            <main className="flex-1 overflow-y-auto bg-gray-100">
                <div className="sticky top-0 bg-white border-b border-slate-200 h-[68px] z-10 flex items-center justify-between px-6">
                    <h1 className="text-xl font-semibold">{pageTitle}</h1>
                </div>
                {children}
            </main>
        </div>
    )
}

function getPageTitle(pathname: string): string {
    if (pathname.startsWith("/admin/articles/")) return "Edit Article";
    if (pathname === "/admin/articles") return "Articles";
    if (pathname.startsWith("/admin/category/")) return "Edit Category";
    if (pathname === "/admin/category") return "Category";
    return "Admin Panel";
}