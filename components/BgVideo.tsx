"use client"
import React from 'react'

function BgVideo() {
  return (
    <video
      autoPlay
      loop
      muted
      className="h-screen  w-screen bg-cover absolute -z-10"
      src="../assets/0905.mp4"
    >
      <source src="../assets/0905.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>

  )
}

export default BgVideo