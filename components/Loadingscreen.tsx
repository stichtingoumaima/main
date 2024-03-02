"use client"
import { useEffect, useState } from 'react';

// Loading messages you might see in a game
const loadingMessages = [
  'Loading assets...',
  'Reticulating splines...',
  'Summoning elementals...',
  'Conjuring gameplay experience...',
  'Polishing graphics...',
  'Finalizing epic quests...',
  'Ready for adventure!',
];

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // Update progress
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return oldProgress + 1;
      });

      // Update loading message at specific progress intervals
      setMessageIndex((oldIndex) => {
        const newIndex = Math.floor(progress / (100 / loadingMessages.length));
        return newIndex;
      });
    }, 30); // Update every 30 milliseconds

    return () => clearInterval(interval);
  }, [progress]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex flex-col justify-center items-center z-50">
      <h1 className="text-5xl font-bold text-white mb-8">IRLQUEST</h1>
      <div className="w-3/4 bg-gray-700 rounded-full overflow-hidden mb-4">
        <div
          className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full"
          style={{ width: `${progress}%`, transition: 'width 300ms linear' }}
        ></div>
      </div>
      <p className="text-white text-lg">{loadingMessages[messageIndex]}</p>
    </div>
  );
};

export default LoadingScreen;