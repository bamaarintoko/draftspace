'use client'
import Cookies from "js-cookie";
// import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormData } from "@/lib/schema/loginSchema";
import FormInput from "@/components/FormInput";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRequest } from "@/lib/request/useRequest";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";
import { getErrorMessage } from "@/lib/functions";
import Alert from "@/components/Alert";

export default function PageLogin() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });
    const router = useRouter()
    const { send, isLoading, error, data } = useRequest("/auth/login", {
        method: "post",
        autoFetch: false,
    });

    useEffect(() => {
        if (data) {
            Cookies.set("token", data.token);
            Cookies.set("role", data.role);
            if (data.role === "User") {

                router.push("/user");
            } else {
                router.push("/admin");
            }
        }
        console.log("data : ", data)
    }, [data])

    const onSubmit = (data: LoginFormData) => {
        console.log("Login with", data);
        // send({
        //     username: "testos",
        //     password: "test",
        // });

        send(data);
    };
    return (
        <div className="w-full xl:bg-gray-100 md:bg-gray-100 bg-white">
            <div className="max-w-screen-xl mx-auto p-4 flex items-center justify-center  px-4 h-screen">

                <div className="w-[400px] h-[376px] bg-white rounded-xl px-4 py-10 space-y-6">
                    <div className="flex items-center justify-center ">

                        <img src="/images/login_logo.png" alt="Logo" height="24" width="134" />
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md space-y-4">
                        <div className="space-y-3">

                            <FormInput
                                label="Username"
                                registration={register("username")}
                                error={errors.username?.message}
                            />

                            <FormInput
                                label="Password"
                                type="password"
                                registration={register("password")}
                                error={errors.password?.message}
                            />
                        </div>
                        {
                            error
                            &&
                            <Alert
                                type="danger"
                                title="Login gagal!"
                                message={getErrorMessage(error.response.data.error)}
                            />
                        }

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white px-4 py-2 rounded flex items-center justify-center gap-2"
                            disabled={isLoading}

                        >

                            {isLoading && (
                                <Loader className="w-5 h-5 animate-spin text-white" />
                            )}
                            {isLoading ? "Loading..." : "Login"}
                        </button>
                    </form>
                    <div className="flex justify-center">
                        <p className="text-sm text-gray-600">
                            Don&apos;t have an account?{" "}
                            <Link href="register" className="text-blue-600 underline hover:text-blue-800">
                                Register
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}