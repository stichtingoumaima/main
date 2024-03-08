import { Badge } from "../ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { AlarmClock, InfoIcon } from "lucide-react";
import Image from "next/image";

export const HeroCards = () => {
  return (
    <div className="hidden lg:flex flex-row flex-wrap gap-8 relative w-[700px] h-[500px] ">
      {/* Testimonial 
      <Card className="absolute w-[340px] -top-[15px] drop-shadow-xl shadow-black/10 dark:shadow-white/10 ">
        <CardHeader className="flex flex-row items-center gap-4 pb-2">
          <Avatar>
            <AvatarImage
              alt=""
              src="https://github.com/shadcn.png"
            />
            <AvatarFallback>SH</AvatarFallback>
          </Avatar>

          <div className="flex flex-col">
            <CardTitle className="text-lg">John Doe React</CardTitle>
            <CardDescription>@john_doe</CardDescription>
          </div>
        </CardHeader>

        <CardContent>This landig page is awesome!</CardContent>
      </Card>*/}
<Card className="absolute w-[340px] right-[20px] top-4  drop-shadow-xl shadow-black/10 dark:shadow-white/10 bg-slate-950 bg-opacity-60 text-white">
  <CardHeader className="bg-black bg-opacity-70 p-4 flex justify-between items-start">
    <div className="flex flex-col">
      <CardTitle>ITEM DROP</CardTitle>
      <div className="border-l-4 border-yellow-400 pl-2 mt-2">
        <h3 className="font-bold">NAME: DEMON KING&apos;S DAGGER</h3>
        <p>ITEM CLASS: S</p>
        <p>TYPE: DAGGER</p>
      </div>
    </div>
    <button className="text-white">
      <i>{/* Your close icon here */}</i>
    </button>
  </CardHeader>

  <CardContent className="p-4">
    <div className="flex items-center gap-4 mb-4">
      <div className="p-2 border border-yellow-400">
        {/* Your item image here */}
        <Image
      src="/assets/barran.png"
      width={80}
      height={80}
      alt="DEMON KING'S DAGGER"
    />
    
      </div>
      <div>
        <p className="text-yellow-400 font-bold">ATTACK +220</p>
        <p>DAGGER OBTAINED FROM THE DEMON KING BARAN.</p>
      </div>
    </div>
    <p>SET EFFECT WILL ACTIVATE IF BOTH &apos;DEMON KING&apos;S DAGGERS&apos; ARE EQUIPPED AT THE SAME TIME.</p>
    <p className="mt-2">
      <span className="font-bold">SET EFFECT &apos;TWO AS ONE&apos;:</span>
      ADDITIONAL ATTACK WILL APPLY TO EACH DAGGER BY THE AMOUNT OF THE STRENGTH STAT.
    </p>
  </CardContent>
</Card>
      {/* Team */}
   

      {/* Pricing */}
      <Card className="absolute top-[150px] left-[50px] w-72 drop-shadow-xl shadow-black/10 dark:shadow-white/10 bg-gray-900 bg-opacity-80 text-white rounded-lg border border-blue-400 border-opacity-50">
  <CardHeader className="bg-slate-950 bg-opacity-60 p-4 rounded-t-lg border-b border-blue-400 border-opacity-50">
    <CardTitle className="text-center mt-2 mb-4">
    <InfoIcon size="35" className="text-blue-400" /> QUEST INFO
    </CardTitle>
    <CardDescription className="text-xs mb-4">
      DAILY QUEST - TRAIN TO BECOME A FORMIDABLE COMBATANT
    </CardDescription>
  </CardHeader>

  <CardContent className="px-4 py-2">
    <Badge className="bg-green-500">GOALS</Badge>
    <ul className="list-none space-y-2 mt-4 mb-4">
      <li className="flex justify-between">
        <span>PUSH-UPS</span> <span>[0/100]</span>
      </li>
      <li className="flex justify-between">
        <span>SIT-UPS</span> <span>[0/100]</span>
      </li>
      <li className="flex justify-between">
        <span>SQUATS</span> <span>[0/100]</span>
      </li>
      <li className="flex justify-between">
        <span>RUN</span> <span>[0/10KM]</span>
      </li>
    </ul>
    <p className="text-red-500 text-xs">
      CAUTION! - IF THE DAILY QUEST REMAINS INCOMPLETE, PENALTIES WILL BE GIVEN ACCORDINGLY.
    </p>
  </CardContent>

  <CardFooter className="px-4 py-2 flex justify-center items-center  bg-opacity-60 rounded-b-lg ">
    <span className="text-blue-400">
     <AlarmClock/>
    </span>
  </CardFooter>
</Card>
      {/* Service */}
   {/*    <Card className="absolute w-[350px] -right-[10px] bottom-[35px]  drop-shadow-xl bg-slate-950 bg-opacity-60 shadow-black/10 dark:shadow-white/10">
        <CardHeader className="space-y-1 flex md:flex-row justify-start items-start gap-4">
          <div className="mt-1 bg-primary/20 p-1 rounded-2xl">
            <LightBulbIcon />
          </div>
          <div>
            <CardTitle>Light & dark mode</CardTitle>
            <CardDescription className="text-md mt-2">
              Lorem ipsum dolor sit amet consect adipisicing elit. Consectetur
              natusm.
            </CardDescription>
          </div>
        </CardHeader>
      </Card>*/}
    </div>
  );
};
