import clsx from "clsx";

interface AlertProps {
    type?: "danger" | "success" | "warning" | "info";
    title?: string;
    message: string;
}

export default function Alert({
    type = "danger",
    title = "Oops!",
    message,
}: AlertProps) {
    const baseStyle =
        "p-4 mb-4 text-sm rounded-lg border-l-4";

    const variants = {
        danger: "text-red-800 bg-red-50 border-red-500 ",
        success: "text-green-800 bg-green-50 border-green-500",
        warning: "text-yellow-800 bg-yellow-50 border-yellow-500 ",
        info: "text-blue-800 bg-blue-50 border-blue-500 ",
    };

    return (
        <div className={clsx(baseStyle, variants[type])} role="alert">
            {title && <span className="font-medium">{title} </span>}
            {message}
        </div>
    );
}
