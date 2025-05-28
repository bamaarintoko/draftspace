
// import UserLayout from "../../__layout/layout";

import UserLayout from "../__layout/layout";

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
    return (
        <UserLayout>{children}</UserLayout>
    )
}