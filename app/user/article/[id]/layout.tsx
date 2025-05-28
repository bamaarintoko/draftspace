
import UserLayout from "../../__layout/layout";

export default function ArticleLayout({ children }: { children: React.ReactNode }) {
    return (
        <UserLayout>{children}</UserLayout>
    )
}