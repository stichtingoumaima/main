import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image"


function UserAvatar({
    name,
    image,
    className
}: {
    name?: string | null;
    image?: string | null;
    className?: string;
}) {
    return <Avatar className={cn('bg-white text-black h-[40px] w-[40px] rounded-full overflow-hidden shadow-md transform transition duration-300 ease-in-out hover:border-white hover:border-4 hover:scale-125 hover:avatar-inner-glow', className)}>
    {image && (
        <Image
            src={image}
            alt={name || 'User name'}
            width={90}
            height={90}
            referrerPolicy="no-referrer"
            className="object-cover object-center w-full h-full"
        />

        )}
        <AvatarFallback
            delayMs={1000}
            className="dark:bg-whire dark:text-black text-lg"
        >
            {name
                ?.split(" ")
                .map((n) => n[0])
                .join("")}
        </AvatarFallback>
    </Avatar>


}

export default UserAvatar