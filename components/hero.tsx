"use client";

import { ScrollReveal } from "@/components/scroll-reveal";

export function HeroSection() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center">
      <ScrollReveal direction="up" duration={1.2} delay={0.1}>
        <h1 className="text-balance text-center font-sans text-6xl font-bold leading-[1.1] tracking-tight md:text-8xl lg:text-9xl">
          Happy
          <br />
          <span className="text-red-500 inline-block relative">
            hearts
            {/* Bottom hearts */}
            <span className="absolute -bottom-8 left-0 animate-float-up animation-delay-0">
              <svg
                className="w-6 h-6 md:w-8 md:h-8"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </span>
            <span className="absolute -bottom-10 left-1/4 animate-float-up animation-delay-300">
              <svg
                className="w-4 h-4 md:w-6 md:h-6"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </span>
            <span className="absolute -bottom-6 left-1/3 animate-float-up animation-delay-600">
              <svg
                className="w-5 h-5 md:w-7 md:h-7"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </span>
            <span className="absolute -bottom-7 left-1/2 animate-float-up animation-delay-900">
              <svg
                className="w-6 h-6 md:w-8 md:h-8"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </span>
            <span className="absolute -bottom-9 right-1/3 animate-float-up animation-delay-1200">
              <svg
                className="w-4 h-4 md:w-6 md:h-6"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </span>
            <span className="absolute -bottom-11 right-1/4 animate-float-up animation-delay-1500">
              <svg
                className="w-5 h-5 md:w-7 md:h-7"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </span>
            <span className="absolute -bottom-8 right-0 animate-float-up animation-delay-1800">
              <svg
                className="w-6 h-6 md:w-8 md:h-8"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </span>
            <span className="absolute -bottom-5 right-1/2 animate-float-up animation-delay-2100">
              <svg
                className="w-4 h-4 md:w-5 md:h-5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </span>
          </span>
          <br />
          <span>day!</span>
        </h1>
      </ScrollReveal>
      <ScrollReveal direction="up" duration={1.2}>
        <p className="mt-4 text-sm font-medium uppercase tracking-widest text-muted-foreground italic">
          from dwig to wendz~
        </p>
      </ScrollReveal>
      <style jsx>{`
        @keyframes float-up {
          0% {
            transform: translateY(0) scale(0.5);
            opacity: 0;
          }
          20% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(-120px) scale(1);
            opacity: 0;
          }
        }
        .animate-float-up {
          animation: float-up 4s ease-out infinite;
          color: rgba(239, 68, 68, 0.8);
        }
        .animation-delay-0 {
          animation-delay: 0s;
        }
        .animation-delay-300 {
          animation-delay: 0.5s;
        }
        .animation-delay-600 {
          animation-delay: 1s;
        }
        .animation-delay-900 {
          animation-delay: 1.5s;
        }
        .animation-delay-1200 {
          animation-delay: 2s;
        }
        .animation-delay-1500 {
          animation-delay: 2.5s;
        }
        .animation-delay-1800 {
          animation-delay: 3s;
        }
        .animation-delay-2100 {
          animation-delay: 3.5s;
        }
      `}</style>
    </section>
  );
}
