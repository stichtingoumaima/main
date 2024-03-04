import BgVideo from "@/components/BgVideo";

export default function ChatsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="cursor-custom">
            <BgVideo/>
        
            {children}
        </div>
    );
}