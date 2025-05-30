'use client'
import ConfirmModal from "@/components/ConfirmModal";
import MenuItem from "@/components/MenuItem";
import { LogOut, Newspaper, Tag } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import { useRequest } from "@/lib/request/useRequest";
import AvatarInitial from "@/components/AvatarInitial";
import { getPageTitle } from "@/lib/functions";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [showModal, setShowModal] = useState(false)
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();
    const router = useRouter()
    const pageTitle = getPageTitle(pathname);
    const { data } = useRequest("/auth/profile");

    const username = data?.username ?? ""

    const handleGoToProfil = () => {
        router.push('/admin/profile')
        setOpen(false)
    }

    const handleLogout = () => {
        Cookies.remove("token");
        Cookies.remove("role");
        Cookies.remove("userId");
        // localStorage.removeItem("token");

        router.push("/auth/login");
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

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
                        onClick={() => setShowModal(true)}
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
            <main className="flex-1 overflow-y-auto bg-gray-50 flex flex-col">
                <div className="sticky top-0 bg-white border-b border-slate-200 py-5 z-10 flex items-center justify-between px-6">
                    <h1 className="text-xl font-semibold">{pageTitle}</h1>
                    <div className="flex items-center gap-2 relative" ref={dropdownRef}>

                        <button
                            onClick={() => setOpen(!open)}
                            className="flex items-center gap-2 focus:outline-none cursor-pointer"
                        >

                            <div className="flex justify-center items-center gap-[6px]">
                                <AvatarInitial name={username} />
                                <p className="text-slate-900 text-sm font-medium">{username}</p>
                            </div>
                        </button>
                        {open && (
                            <div className="absolute top-[110%] right-0 w-56 bg-white border-slate-200 rounded-md shadow-md z-50">
                                <ul className="py-2">
                                    <div className="w-full" onClick={handleGoToProfil}>
                                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-slate-600">My Profile</li>
                                    </div>
                                    <div className="border-t my-1 border-slate-100" />
                                    <li onClick={() => {
                                        setOpen(false)
                                        setShowModal(true)
                                    }} className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-red-500 flex items-center gap-2">
                                        <LogOut className="h-4 w-4" />
                                        Logout</li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
                <div className="p-6 flex-1 flex">

                    {children}
                </div>
            </main>
        </div>
    )
}

// function getPageTitle(pathname: string): string {
//     if (pathname.startsWith("/admin/articles/")) return "Edit Article";
//     if (pathname === "/admin/articles") return "Articles";
//     if (pathname.startsWith("/admin/category/")) return "Edit Category";
//     if (pathname === "/admin/category") return "Category";
//     return "Admin Panel";
// }