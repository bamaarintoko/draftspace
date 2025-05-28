'use client'
import { useEffect, useRef, useState } from "react";
import { LogOut } from 'lucide-react';
import Cookies from "js-cookie";
import { useRouter, usePathname } from "next/navigation";
import classNames from "classnames";
import ConfirmModal from "./ConfirmModal";
import Link from "next/link";
import { useRequest } from "@/lib/request/useRequest";
import AvatarInitial from "./AvatarInitial";

export default function TopNavbar() {
    const [showModal, setShowModal] = useState(false)
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const router = useRouter()
    const pathname = usePathname();
    const { data } = useRequest("/auth/profile");

    const username = data?.username ?? ''

    const isHome = pathname === "/user" || pathname === "/admin";
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        console.log("open : ", open)
    }, [open])

    const handleLogout = () => {
        Cookies.remove("token");
        Cookies.remove("role");
        Cookies.remove("userId");
        // localStorage.removeItem("token");

        router.push("/auth/login");
    };

    return (
        <div className={classNames(
            "xl:h-24 h-16 flex items-center xl:px-[60px] px-[20px] transition-colors duration-300 z-50",
            {
                "xl:bg-transparent xl:absolute top-0 left-0 right-0 bg-white": isHome,
                "bg-white relative shadow-md": !isHome,
            }
        )}>
            <div onClick={() => router.push("/")} className="cursor-pointer">
                <img
                    src="/images/login_logo.png"
                    alt="Aplikasi Logo"
                    className={classNames(
                        "w-[122px] h-[22px] xl:w-[134px] xl:h-[24px]",
                        {
                            "xl:hidden": isHome, // hide di desktop kalau home
                        }
                    )}
                />
                {isHome && (
                    <img
                        src="/images/login_logo_white.png"
                        alt="Aplikasi Logo Putih"
                        className="hidden xl:block w-[134px] h-[24px]"
                    />
                )}
            </div>
            <div className="flex-1">

            </div>
            <div className="flex items-center gap-2 relative" ref={dropdownRef}>
                <button
                    onClick={() => setOpen(!open)}
                    className="flex items-center gap-2 focus:outline-none"
                >
                    <AvatarInitial name={username} />
                    <p
                        className={classNames("text-[16px] xl:block hidden focus:outline-none cursor-pointer", {
                            "text-slate-900": !isHome,
                            "text-white": isHome
                        })}
                    >
                        {username}
                    </p>
                </button>
                {/* Dropdown */}
                {open && (
                    <div className="absolute top-[110%] right-0 w-56 bg-white border-slate-200 rounded-md shadow-md z-50">
                        <ul className="py-2">
                            <Link href={"/user/profile"}>
                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-slate-600">My Profile</li>
                            </Link>
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
            <ConfirmModal
                isOpen={showModal}
                title="Logout"
                description="Are you sure you want to logout?"
                onCancel={() => setShowModal(false)}
                onConfirm={handleLogout}
                confirmText="Logout"
                cancelText="Cancel"
            />

        </div>
    )
}