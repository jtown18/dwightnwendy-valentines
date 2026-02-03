"use client";

import { HeroSection } from "@/components/hero";
import TimeMachine from "@/components/time-machine";
import { Valentine } from "@/components/valentine";
import { Spinner } from "@/components/ui/spinner";
import { useEffect, useMemo, useRef, useState } from "react";

type StartPhase = "loading" | "ready" | "started";

function preloadImage(src: string) {
  return new Promise<void>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => reject(new Error(`Failed to preload ${src}`));
    img.src = src;
  });
}

export default function Page() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [phase, setPhase] = useState<StartPhase>("loading");

  const assetsToPreload = useMemo(
    () => [
      "/images/d1.jpg",
      "/images/d2.jpg",
      "/images/d3.jpg",
      "/images/d4.jpg",
      "/images/d5.jpg",
      "/form/success-seal.gif",
      "/form/failed-seal.gif",
    ],
    []
  );

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      try {
        await Promise.allSettled(assetsToPreload.map(preloadImage));
      } finally {
        if (!cancelled) setPhase("ready");
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [assetsToPreload]);

  const handleStart = async () => {
    try {
      if (audioRef.current) {
        audioRef.current.volume = 0.6;
        await audioRef.current.play();
      }
    } catch (error) {
      console.log("Audio play blocked:", error);
    } finally {
      setPhase("started");
    }
  };

  return (
    <main className="w-full min-h-screen bg-white">
      <audio ref={audioRef} loop preload="auto" playsInline>
        <source src="/music/bg-music.mp3" type="audio/mpeg" />
      </audio>

      {phase !== "started" ? (
        <div
          className={
            "fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-white px-6 text-center" +
            (phase === "ready" ? " cursor-pointer" : "")
          }
          onClick={phase === "ready" ? handleStart : undefined}
          role={phase === "ready" ? "button" : undefined}
          tabIndex={phase === "ready" ? 0 : -1}
          aria-label={phase === "ready" ? "Click anywhere to start" : undefined}
        >
          {phase === "loading" ? (
            <>
              <Spinner className="size-10" />
              <p className="font-sans text-lg font-semibold tracking-tight text-muted-foreground">
                Loading
              </p>
            </>
          ) : (
            <>
              <p className="font-sans text-lg font-semibold tracking-tight text-muted-foreground">
                Click anywhere to start
              </p>
            </>
          )}
        </div>
      ) : (
        <>
          <TimeMachine />
          <HeroSection />
          <Valentine />
        </>
      )}
    </main>
  );
}
