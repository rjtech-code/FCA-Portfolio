import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const ScrollVideo = () => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;

    // Start the animation once video metadata (duration, etc.) has loaded
    const handleLoadedMetadata = () => {
      // Create the GSAP timeline
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: container, // The element that triggers the scroll animation
          start: "top top", // Begin when the top of the container reaches the top of the viewport
          end: "+=3000", // Total scroll distance of 3000px
          scrub: 1, // Smoothly scrub the animation with scrolling
          pin: true, // Keep the video pinned in place on screen
          markers: false, // Enable for debugging markers
        },
      });

      // Animate the video's current playback time
      tl.to(video, {
        currentTime: video.duration,
        ease: "none",
      });
    };

    // Attach the event listener
    if (video) {
      video.addEventListener("loadedmetadata", handleLoadedMetadata);

      // If the video is already loaded (from cache)
      if (video.readyState >= 1) {
        handleLoadedMetadata();
      }
    }

    // Cleanup: remove ScrollTrigger when the component unmounts
    return () => {
      if (video) {
        video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      }
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} style={styles.videoSection}>
      <video
        ref={videoRef}
        src="/mp_.mp4" // Place your video path here
        playsInline
        muted
        preload="auto"
        style={styles.video}
      />
    </div>
  );
};

// Inline CSS styles (replace with CSS module or Tailwind if preferred)
const styles = {
  videoSection: {
    width: "100%",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
    overflow: "hidden",
  },
  video: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
};

export default ScrollVideo;
