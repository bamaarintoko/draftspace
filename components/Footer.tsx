export default function Footer() {
    return (
        <footer className="h-[100px] bg-[#2563EBDB]/86 text-center flex items-center justify-center text-sm text-white xl:gap-4 xl:flex-row flex-col">
            <img
                src="/images/login_logo_white.png"
                alt="Aplikasi Logo Putih"
                className="xl:w-[134px] xl:h-[24px] w-[122px] h-[22px]"
            /> <p>&copy; {new Date().getFullYear()} Blog genzet. All rights reserved.</p>
        </footer>
    );
}
