"use client";
import { useEffect, useState } from 'react';
import BgVideo from '@/components/BgVideo';
import LoadingScreen from '@/components/Loadingscreen';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { EnvelopeOpenIcon } from '@radix-ui/react-icons';
import { signIn } from 'next-auth/react';

export default function LoginPage() {
  const [isLoading, setLoading] = useState(true);
  const [showLogin, setShowLogin] = useState(false); // State to control login screen visibility

  useEffect(() => {
    // Simulate loading for 5 seconds
    const timer = setTimeout(() => {
      setLoading(false);
      // Delay the login screen appearance for smooth transition
      setTimeout(() => setShowLogin(true), 500);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <section className="relative cursor-custom flex justify-center items-center h-screen overflow-hidden">
      <BgVideo></BgVideo>
      <div className="absolute inset-0 bg-black opacity-50"></div>
        <Card className={`transform transition-all duration-700 ease-out w-2/3 p-5 bg-black bg-opacity-30 backdrop-blur-md border border-gray-700 shadow-xl rounded-lg ${showLogin ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`} style={{ maxWidth: '600px' }}>
          <CardHeader className="text-center space-y-4">
            <CardTitle className="text-4xl md:text-5xl text-white font-bold tracking-wide">IRLQUEST.AI</CardTitle>
            <div className="flex flex-col md:flex-row gap-2">
              <Button className="bg-white hover:bg-blue-500 text-black rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 w-full">
                <EnvelopeOpenIcon onClick={() => signIn("google", { callbackUrl: "/" })} className="mr-2 h-4 w-4" /> Login with Gmail
              </Button>
              <Button className="bg-white hover:bg-purple-600 text-black rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 w-full">
                <EnvelopeOpenIcon onClick={() => signIn("google", { callbackUrl: "/" })} className="mr-2 h-4 w-4" /> Login with Email
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
            <Button className="bg-white hover:bg-indigo-600 hover:text-white text-black rounded-lg shadow-md px-10 py-2 font-semibold tracking-wide uppercase transition duration-300 ease-in-out transform hover:scale-105 h-16 text-xl md:text-2xl w-full" onClick={() => signIn("google", { callbackUrl: "/" })}>Start Game</Button>
          </CardFooter>
        </Card>
    </section>
  );
}