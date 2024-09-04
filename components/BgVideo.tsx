"use client"
import React from 'react';

function BgVideo() {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden">
      {/* Apply aspect-video to keep the correct aspect ratio */}
      <div className="relative w-full h-full aspect-video md:aspect-video">
        <video
          autoPlay
          loop
          muted
          className="absolute top-0 left-0 w-full h-full object-cover lg:object-contain xl:object-contain"
          src="../assets/0.mp4"
        >
          <source src="../assets/0.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}

export default BgVideo;