"use client"
import React from 'react'

function BgVideo() {
  return (
    <video
      autoPlay
      loop
      muted
      className="h-screen  w-screen object-fill absolute -z-10"
      src="../assets/sequence.mp4"
    >
      <source src="../assets/sequence.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>

  )
}

export default BgVideo