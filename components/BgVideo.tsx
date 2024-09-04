"use client"
import React from 'react';

function BgVideo() {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10">
      <video
        autoPlay
        loop
        muted
        className="w-full h-full object-cover md:aspect-video"
        src="../assets/0905.mp4"
      >
        <source src="../assets/0905.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default BgVideo;