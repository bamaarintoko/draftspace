'use client'
import Cookies from "js-cookie";
import FormInput from "@/components/FormInput";
import FormSelect from "@/components/FormSelect";
import { useRequest } from "@/lib/request/useRequest";
import { RegisterFormData, registerSchema } from "@/lib/schema/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Alert from "@/components/Alert";
import { getErrorMessage } from "@/lib/functions";
import { Loader } from "lucide-react";

export default function PageRegister() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
    });

    const { send, isLoading, error, data } = useRequest("/auth/register", {
        method: "post",
        autoFetch: false,
    });
    const { send: login, isLoading: loginIsLoading, data: dataLogin } = useRequest("/auth/login", {
        method: "post",
        autoFetch: false,
    });
    useEffect(() => {
        if (dataLogin) {
            Cookies.set("token", data.token);
            Cookies.set("role", data.role);
            if (dataLogin.role === "User") {
                router.push("/user");
            } else {
                router.push("/admin");
            }
        }
    }, [dataLogin])

    useEffect(() => {
        if (data) { // success register, run onLogin
            onLogin()
        }
        console.log("data : ", data)
    }, [data])

    useEffect(() => {
        console.log("error : ", error)
    }, [error])

    const onSubmit = (data: RegisterFormData) => { // register
        console.log("Form submitted:", data);
        setPassword(data.password)
        setUsername(data.username)
        send(data)
        // send({
        //     username: "testos",
        //     password: "test",
        //     role: "User",
        // });
    };

    const onLogin = () => { // login
        login({
            username: username,
            password: password,
        })
    }

    return (
        <div className="w-full xl:bg-gray-100 md:bg-gray-100 bg-white">
            <div className="max-w-screen-xl mx-auto p-4 flex items-center justify-center  px-4 h-screen">

                <div className="w-[400px] bg-white rounded-xl px-4 py-10 space-y-6">
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
                            <FormSelect
                                label="Role"
                                registration={register("role")}
                                options={[
                                    { value: "User", label: "User" },
                                    { value: "Admin", label: "Admin" },
                                ]}
                                error={errors.role?.message}
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
                        <button type="submit" className="w-full bg-blue-600 text-white px-4 py-2 rounded flex items-center justify-center gap-2" disabled={isLoading || loginIsLoading}>
                            {isLoading || loginIsLoading && (
                                <Loader className="w-5 h-5 animate-spin text-white" />
                            )}
                            Register
                        </button>
                    </form>
                    <div className="flex justify-center">
                        <p className="text-sm text-gray-600">
                            Already have an account?{" "}
                            <Link href="login" className="text-blue-600 underline hover:text-blue-800">
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>


        </div>
    )
}