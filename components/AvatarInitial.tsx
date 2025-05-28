import React from "react";
import clsx from "clsx";

interface AvatarInitialProps {
    name: string;
    size?: number; // dalam px (default: 40)
    backgroundColor?: string; // optional custom bg
    textColor?: string; // optional text color
}

const AvatarInitial: React.FC<AvatarInitialProps> = ({
    name,
    size = 40,
    backgroundColor = "bg-blue-600",
    textColor = "text-white",
}) => {
    const getInitial = (name: string) => {
        const words = name.trim().split(" ");
        if (words.length === 1) return words[0][0]?.toUpperCase();
        return `${words[0][0]}${words[1][0]}`.toUpperCase();
    };

    const fontSize = Math.floor(size / 2.5);

    return (
        <div
            className={clsx(
                "flex items-center justify-center rounded-full font-semibold",
                backgroundColor,
                textColor
            )}
            style={{
                width: size,
                height: size,
                fontSize: fontSize,
            }}
        >
            {getInitial(name)}
        </div>
    );
};

export default AvatarInitial;
