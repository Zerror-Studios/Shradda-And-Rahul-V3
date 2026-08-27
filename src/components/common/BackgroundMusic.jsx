"use client";
import { useEffect, useRef, useState } from "react";

const BackgroundMusic = ({ src = "/music/BGMUSIC2.mp3" }) => {
  const audioRef = useRef();
  const [isMuted, setIsMuted] = useState(false);
  const [needsInteraction, setNeedsInteraction] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.5; // default 50%

    // Try to autoplay WITH sound first.
    const tryPlay = async () => {
      try {
        audio.muted = false;
        await audio.play();
        setIsMuted(false);
      } catch (err) {
        // Most browsers block unmuted autoplay without prior interaction.
        // Fallback: autoplay muted (always allowed), and let the user
        // unmute manually via the button.
        try {
          audio.muted = true;
          await audio.play();
          setIsMuted(true);
          setNeedsInteraction(true);
        } catch (err2) {
          // Autoplay blocked entirely; wait for first user interaction.
          setNeedsInteraction(true);

          const resumeOnInteraction = () => {
            audio.muted = false;
            audio.play().then(() => setIsMuted(false)).catch(() => {});
            window.removeEventListener("click", resumeOnInteraction);
            window.removeEventListener("touchstart", resumeOnInteraction);
          };

          window.addEventListener("click", resumeOnInteraction, { once: true });
          window.addEventListener("touchstart", resumeOnInteraction, { once: true });
        }
      }
    };

    tryPlay();
  }, []);

  const toggleMute = () => {
    if (!audioRef.current) return;
    const nextMuted = !isMuted;
    audioRef.current.muted = nextMuted;
    if (!nextMuted) {
      audioRef.current.play().catch(() => {});
    }
    setIsMuted(nextMuted);
    setNeedsInteraction(false);
  };

  return (
    <>
      <audio ref={audioRef} src={src} loop preload="auto" />

      <button
        type="button"
        onClick={toggleMute}
        aria-label={isMuted ? "Unmute music" : "Mute music"}
        className="fixed top-[12%] right-[5%] z-[999] flex h-9 w-9 items-center justify-center rounded-full border border-[#F1E2C6]/50 bg-black/20 backdrop-blur-sm transition-colors duration-300 hover:bg-black/40"
      >
        {isMuted ? (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="#F1E2C6"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        ) : (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="#F1E2C6"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            <path d="M18.36 5.64a9 9 0 0 1 0 12.72" />
          </svg>
        )}
      </button>
    </>
  );
};

export default BackgroundMusic;