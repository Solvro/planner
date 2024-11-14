"use client"

import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Loader2Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type React from "react";
import { type ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Block = ({
  className,
  ...rest
}: ComponentProps<(typeof motion)["div"]> & { className: string }) => {
  return (
    <motion.div
      variants={{
        initial: {
          scale: 0.5,
          y: 50,
          opacity: 0,
        },
        animate: {
          scale: 1,
          y: 0,
          opacity: 1,
        },
      }}
      transition={{
        type: "spring",
        mass: 3,
        stiffness: 400,
        damping: 50,
      }}
      className={twMerge("col-span-4 rounded-lg p-6", className)}
      {...rest}
    />
  );
};

const AnimationLogo = () => (
  <Block
    whileHover={{
      rotate: "0.0deg",
      scale: 1.01,
    }}
    className="flex content-center items-center justify-center text-center align-middle md:mt-10"
  >
    <div className="items-center justify-center gap-4 sm:gap-6 md:flex">
      <div className="mb-5 md:mb-0 md:mt-5">
        <p className="text-4xl font-bold text-white sm:text-5xl md:text-6xl lg:text-7xl">
          SOLVRO
        </p>
      </div>

      <a href="https://solvro.pwr.edu.pl/">
        <Image
          src="/assets/logo/logo_solvro_mono.png"
          alt="Logo Koła Naukowego Solvro w kolorze"
          width={200}
          height={200}
          className="animate-waving-hand cursor-pointer rounded-md pb-10 duration-5000"
        />
      </a>

      <div className="mb:mt-5">
        <p className="text-4xl font-bold text-white sm:text-5xl md:text-6xl lg:text-7xl">
          PLANER
        </p>
      </div>
    </div>
  </Block>
);

const JoinUsBlock = () => {
  const query = useQuery({
    queryKey: ["auth"],
    queryFn: async () => {
      const res = await fetch("/api/profile");

      if (res.status === 401) {
        throw new Error("Unauthorized");
      }

      return res.json();
    },
    retry: false,
    gcTime: 5000,
  });

  return (
    <Block className="flex flex-col items-center justify-center gap-6 md:gap-10">
      <div className="">
        <h1 className="text-center text-4xl font-medium leading-tight md:text-left">
          <span className="font-inter tracking-wide text-white animate-in">
            Stwórz swój plan używając{" "}
            <span className="font-bold uppercase">darmowego</span> zapisownika!
          </span>
        </h1>
      </div>
      <div className="">
        <p className="text-center text-white md:mr-4 md:text-2xl">
          Zaloguj się do platformy USOS i stwórz swój plan na semestr!
        </p>
      </div>
      <div className="z-50">
        {query.isLoading ? (
          <div className="flex h-20 animate-spin items-center justify-center text-xl text-white">
            <Loader2Icon size={32} />
          </div>
        ) : query.isError ? (
          <Link
            href="/api/login"
            data-umami-event="Landing - Go to planning"
            className={buttonVariants({
              size: "lg",
              variant: "outline",
              className: cn(
                "h-20 cursor-wait self-center border-4 text-xl transition-all duration-300 md:mt-0 md:p-7",
                "cursor-pointer hover:bg-white hover:shadow-[0_0_5px_rgb(200,200,255),0_0_10px_rgb(164,200,255)]",
              ),
            })}
          >
            Zaloguj się
          </Link>
        ) : (
          <Link
            href="/plans"
            data-umami-event="Landing - Go to planning"
            className={buttonVariants({
              size: "lg",
              variant: "outline",
              className: cn(
                "h-20 cursor-wait self-center border-4 text-xl transition-all duration-300 md:mt-0 md:p-7",
                "cursor-pointer hover:bg-white hover:shadow-[0_0_5px_rgb(200,200,255),0_0_10px_rgb(164,200,255)]",
              ),
            })}
          >
            Twoje plany
          </Link>
        )}
      </div>
    </Block>
  );
};

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <div className="flex justify-center">
        <div className="px-10">
          <AnimationLogo />
        </div>
      </div>
      <section className="flex justify-center">
        <JoinUsBlock />
      </section>
    </div>
  );
}
