import BgVideo from "@/components/BgVideo";
import TopNavigation from "@/components/navigation/Navigation";

export default function ChatsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className=" cursor-default">
            <TopNavigation/>
            <BgVideo/>
        
            {children}
        </div>
    );
}