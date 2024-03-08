import { getServerSession } from "next-auth"
import { authOptions } from "@/auth";
import DarkModeToggle from "../DarkModeToggle";
import Logo from "../Logo";
import UserButton from "../UserButton";
import Link from "next/link";
import { MessagesSquareIcon } from "lucide-react"
import CreateChatButton from "../chat/CreateChatButton";
import UpgradeBanner from "../subscription/UpgradeBanner";
import LanguageSelect from "../LanguageSelect";

// const routeList: RouteProps[] = [
//     {
//       href: "#Main",
//       label: "Main",
//     },
//     {
//       href: "#Features",
//       label: "Features",
//     },
//     {
//       href: "#Characters",
//       label: "Characters",
//     },
//     {
//       href: "#Play Now",
//       label: "Play Now",
//     },
//     {
//       href: "#Story",
//       label: "Story",
//     },
//     {
//       href: "#News",
//       label: "News",
//     },
//     {
//       href: "#Pricing",
//       label: "Pricing",
//     },
//   ];

async function Header() {
    const session = await getServerSession(authOptions);

    return (<header className="sticky  border-y-[2px] z-40 w-full bg-white dark:border-b-slate-700 dark:bg-slate-950 dark:bg-opacity-80">
        <nav className="flex flex-col sm:flex-row items-center p-5 pl-2  max-w-7xl mx-auto">
        <div className="font-bold text-xl gap-2">
              
               IRLQUEST.AI </div>

            <div className="flex-1 flex items-center justify-end space-x-4">
                <LanguageSelect />

                {session ? (
                    <>
                        <Link href={"/chat"} prefetch={false}>
                            <MessagesSquareIcon className="text-black dark:text-white" />
                        </Link>
                        <CreateChatButton />

                    </>
                ) : (
                    <Link href='/pricing'>Pricing</Link>
                )}

                <DarkModeToggle />
                <UserButton session={session} />

            </div>
        </nav>

        <UpgradeBanner />
    </header>
    );
}

export default Header;