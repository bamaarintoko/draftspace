'use client'
import AvatarInitial from "@/components/AvatarInitial";
import { useRequest } from "@/lib/request/useRequest";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PageProfile() {
    const { data } = useRequest("/auth/profile");
    const router = useRouter()
    const username = data?.username ?? ''
    const role = data?.role ?? ''

    useEffect(() => {
        console.log("data : ", data)
    }, [data])
    return (
        <div className="max-w-[1120px] mx-auto my-5 px-4 xl:px0 flex-1 flex items-center justify-center">
            <div className="flex items-center flex-col ">
                <p className="text-xl font-semibold text-slate-900">User Profile</p>
                <div className="mt-5 mb-5">

                    <AvatarInitial name={username} size={68} />
                </div>
                <div className="space-y-3 mb-6">

                    <ListItem label="Username" value={username} />
                    <ListItem label="Password" value="•••••••••••••••••" />
                    <ListItem label="Role" value={role} />
                </div>
                <button
                    onClick={() => router.push("/")}
                    type="submit"
                    className=" w-full bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
                >
                    Back to home
                </button>
            </div>
        </div>
    )
}

const ListItem = ({ label, value }: { label: string, value: string }) => {
    return (

        <div className="xl:w-[368px] w-[303px] bg-gray-100 border rounded-md border-slate-200 px-3 py-2.5 flex">
            <div className=" w-[97px]">
                <span className="font-semibold text-gray-900">{label}</span>
            </div>
            <span>:</span>
            <div className="w-full  flex justify-center">
                <span className="text-slate-900">{value}</span>
            </div>
        </div>
    )
}