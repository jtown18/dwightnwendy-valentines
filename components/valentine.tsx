"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ScrollReveal } from "@/components/scroll-reveal";

export function Valentine() {
  const [answer, setAnswer] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    date: "",
    time: "",
    plans: "",
  });

  const handleYes = () => {
    setAnswer("yes");
  };

  const handleNo = () => {
    setAnswer("no");
  };

  const handleAnotherChance = () => {
    setAnswer(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (answer === "yes") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
        <h1 className="text-balance text-center font-sans text-6xl font-bold leading-[1.1] tracking-tight md:text-8xl lg:text-9xl mb-8">
          Yay!
        </h1>
        <img
          src="/form/success-seal.gif"
          alt="Success"
          className="w-64 h-64 md:w-80 md:h-80 object-contain mb-8"
        />
        <h3 className="text-balance text-red-500 text-center font-sans text-3xl font-bold leading-[1.1] tracking-tight md:text-5xl lg:text-6xl mb-8">
          See you soon!
        </h3>
      </div>
    );
  }

  if (answer === "no") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-balance text-center font-sans text-6xl font-bold leading-[1.1] tracking-tight md:text-8xl lg:text-9xl mb-8">
          Another
          <br />
          chance
          <br />
          <span className="text-red-500">please?</span>
        </h1>
        <img
          src="/form/failed-seal.gif"
          alt="Please"
          className="w-64 h-64 md:w-80 md:h-80 object-contain mb-8"
        />
        <Button
          onClick={handleAnotherChance}
          size="lg"
          className="bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white font-bold px-12 py-6 text-xl md:text-2xl shadow-lg hover:scale-110 transition-transform"
        >
          Give another chance
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <ScrollReveal direction="up" duration={1.2} delay={0.1}>
        <h1 className="text-balance text-center font-sans text-6xl font-bold leading-[1.1] tracking-tight md:text-8xl lg:text-9xl mb-12">
          Will you
          <br />
          be my
          <br />
          <span className="text-red-500">Valentine?</span>
        </h1>
      </ScrollReveal>
      <ScrollReveal direction="up" duration={1.2}>
        <div className="flex flex-row gap-8 justify-center items-center">
          <Button
            onClick={handleYes}
            size="lg"
            className="bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white font-bold px-12 py-6 text-xl md:text-2xl shadow-lg hover:scale-110 transition-transform"
          >
            Yes
          </Button>
          <Button
            onClick={handleNo}
            size="lg"
            variant="outline"
            className="border-2 border-gray-400 hover:border-gray-500 font-bold px-12 py-6 text-xl md:text-2xl transition-all"
          >
            No
          </Button>
        </div>
      </ScrollReveal>
    </div>
  );
}
