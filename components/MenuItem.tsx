import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MenuItem({ icon, label, href }: { icon: React.ReactNode; label: string; href: string }) {
    const pathname = usePathname();
    const segment = pathname.split("/")[2]; // Ambil segmen kedua setelah /admin
    const base = href.split("/")[2];        // Ambil segmen kedua dari href
    const isActive = segment === base;
    return (
        <Link href={href}>
            <div
                className={`flex items-center gap-3 rounded-md px-3 py-2 cursor-pointer
          ${isActive ? "bg-blue-500 font-semibold text-white" : "text-white hover:bg-blue-500 hover:text-white"}`}
            >

                {icon}
                <span className="text-[16px] font-medium">{label}</span>
            </div>
        </Link>
    );
}