import Footer from "@/components/Footer";
import TopNavbar from "@/components/TopNavbar";

export default function UserLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen">
            <TopNavbar />
            <main className="flex-1 flex">
                {children}
            </main>
            <Footer />
        </div>
    )
}