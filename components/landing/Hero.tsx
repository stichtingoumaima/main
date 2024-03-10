
"use client"
import { signIn } from "next-auth/react";
import { Button } from "../ui/button";
import { HeroCards } from "./HeroCards";
export const Hero = () => {
  return (
   
<section className=" grid lg:grid-cols-2 place-items-center py-20 md:py-32 gap-10 bg-cover bg-no-repeat bg-center h-screen w-full " >
  <div className="absolute overflow-hidden w-full h-screen -z-50 "> 
    <video
      autoPlay
      loop
      muted
      className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
      src="./assets/video.mp4"
    >
      <source src="./assets/video.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>
      <div className="text-center space-y-6 ">
        <main className="text-5xl md:text-6xl font-bold">
          <h1 className="inline">
            <span className="inline bg-gradient-to-r from-[#b2b2b2]  to-[#a0a0a0] text-transparent bg-clip-text">
              IRLQUEST
            </span>{" "}
          </h1>{" "}
      self improvement through{" "}
          <h2 className="inline">
            <span className="inline bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text">
            AI GAMING
            </span>{" "}

          </h2>
        </main>

        <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
        Powered by GPT4 and CHATGPT to provide each person a unique experience!
        </p>

        <div className="space-y-4 md:space-y-0 md:space-x-4">
        <Button  className="w-full md:w-1/3"variant={'outline'} onClick={() => signIn()}>
            Sign In
        </Button>
        </div>
      </div>

      {/* Hero cards sections */}
      <div className="z-10">
        <HeroCards />
      </div>

      {/* Shadow effect */}
      <div className="shadow"></div>
    </section>
  );
};
