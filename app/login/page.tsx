"use client";
import { useEffect, useState } from 'react';
import BgVideo from '@/components/BgVideo';
import LoadingScreen from '@/components/Loadingscreen';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { EnvelopeOpenIcon } from '@radix-ui/react-icons';
import { signIn, useSession } from 'next-auth/react';
import { initializePlayerData } from '@/lib/services/initializeGame';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const { data: session } = useSession();
    const [isLoading, setLoading] = useState(true);
    
    const [showLogin, setShowLogin] = useState(false); // New state to control login screen visibility

    useEffect(() => {
      const timer = setTimeout(() => {
        setLoading(false);
        setTimeout(() => setShowLogin(true), 500); // Slight delay before showing login for smoother transition
      }, 5000); // 5 seconds for demo, adjust as needed
  
      return () => clearTimeout(timer);
    }, []);
  
    if (isLoading) {
      return <LoadingScreen />;
    }
  
    if (session) {
      
      // User is logged in, show the start game screen
      return (
        <> <video
        autoPlay
        loop
        muted
        className="h-screen  w-screen object-fill absolute -z-10"
        src="./assets/loginscreen2.mp4"
      >
        <source src="./assets/loginscreen2.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video><StartGameScreen /></>
      );
    }
  
    // User is not logged in, show the login form
    return (
      <>    <video
      autoPlay
      loop
      muted
      className="h-screen  w-screen object-fill absolute -z-10"
      src="./assets/loginscreen2.mp4"
    >
      <source src="./assets/loginscreen2.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video><LoginForm showLogin={showLogin} /></>
    );
  };
  const StartGameScreen = () => {
        const router = useRouter(); // Initialize useRouter hook
        const handleStartGameClick = () => {
          router.push('/chat'); // Navigate to /chat
      };
  
    const { data: session } = useSession();

    useEffect(() => {
      if (session?.user?.id) {
        // Initialize Player and their game data if new
        initializePlayerData(session.user.id);
      }
    }, [session?.user.id]);
    return (
      <div className="cursor-custom flex justify-center items-center h-screen bg-cover bg-center relative" style={{ backgroundImage: 'url(/your-background-image.jpg)' }}>
        <div className="text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <h1 onClick={handleStartGameClick} className="text-white text-6xl font-bold mb-4 animate-move-up-and-down hover:text-purple-100">Start Game</h1>
          <hr className="border-t border-gray-300 my-4 w-16 mx-auto" />
          <p className="text-white mt-2">Click to Begin</p>
        </div>
      </div>
    );
  };
  interface LoginFormProps {
    showLogin: boolean;
  }
  
  const LoginForm = ({ showLogin }: LoginFormProps) => {

  return (
    <section className="relative flex justify-center items-center h-screen overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-5"></div>
        <Card className={`transform transition-all duration-700 ease-out w-2/3 p-5 bg-black bg-opacity-30 backdrop-blur-md border border-gray-700 shadow-xl rounded-lg ${showLogin ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`} style={{ maxWidth: '600px' }}>
          <CardHeader className="text-center space-y-4">
            <CardTitle className="text-4xl md:text-5xl text-white font-bold tracking-wide">IRLQUEST.AI</CardTitle>
            <div className="flex flex-col md:flex-row gap-2">
              <Button className="hover:cursor-custom bg-white hover:bg-blue-500 text-black rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 w-full">
                <EnvelopeOpenIcon onClick={() => signIn("google", { callbackUrl: "/login" })} className="mr-2 h-4 w-4" /> Login with Gmail
              </Button>
              <Button className="bg-white hover:bg-indigo-600 text-black rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 w-full">
                <EnvelopeOpenIcon onClick={() => signIn("google", { callbackUrl: "/login" })} className="mr-2 h-4 w-4" /> Login with Email
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <form>
              <div className="w-full grid gap-4">
                <div className="flex flex-col space-y-3">
                  <Input className="bg-white border-gray-500 border-[1.5px] h-14" id="email" placeholder="Enter email/username" />
                  <Input className="bg-white border-gray-600 border-[1.5px] h-14" id="password" placeholder="Enter password" />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="w-full">
            <Button className="bg-white hover:bg-indigo-600 hover:text-white text-black rounded-lg shadow-md px-10 py-2 font-semibold tracking-wide uppercase transition duration-300 ease-in-out transform hover:scale-105 h-16 text-xl md:text-2xl w-full" onClick={() => signIn("google", { callbackUrl: "/login" })}>Start Game</Button>
          </CardFooter>
        </Card>
    </section>
  );
}