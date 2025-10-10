"use client";

import React, { useEffect, useRef } from "react";
import Head from "next/head";
import { RxEnvelopeOpen } from "react-icons/rx";
import { RevealWrapper } from "next-reveal";

function Hero({
  setCurrentOverflow,
}: {
  setCurrentOverflow: React.Dispatch<React.SetStateAction<string>>;
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  
  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;

    const preferMp3 = !!el.canPlayType && !!el.canPlayType("audio/mpeg");
    const preferOgg = !!el.canPlayType && !!el.canPlayType('audio/ogg; codecs="vorbis"');

    
    const src = preferMp3 ? "/audio/backsound.mp3" : (preferOgg ? "/audio/backsound.ogg" : "/audio/backsound.mp3");

    
    if (el.src !== window.location.origin + src && el.src !== src) {
      el.src = src;
    }

    
    el.preload = "auto";
    el.loop = true;
    
    const onCanPlay = () => { try { el.volume = 0.25; } catch { } };
    el.addEventListener("canplay", onCanPlay);

    
    try { el.load(); } catch { }

    return () => el.removeEventListener("canplay", onCanPlay);
  }, []);

  const handleOpen = async () => {
    setCurrentOverflow("auto");
    const el = audioRef.current;
    if (!el) return;
    try {
      await el.play();
    } catch (e) {
      console.warn("play failed:", e);
    }
  };

  return (
    <section id="hero">
      
      <Head>
        <link
          rel="preload"
          href="/audio/backsound.mp3"
          as="audio"
          type="audio/mpeg"
        
        />
      </Head>

      <div className="min-h-screen bg-[url('/images/hero/bg.jpg')] bg-cover bg-center text-white relative">
        
        <audio
          id="global-bgm"
          ref={audioRef}
          playsInline
          className="hidden"
        />

        <div className="absolute inset-0 bg-black/70 z-10" />

        <div className="flex flex-col justify-between py-28 px-12 text-center z-20 relative h-screen">
          <div>
            <p className="font-extralight text-[0.75rem]">The Wedding of</p>
            <h1 className="text-4xl font-light mt-2">Abraham & Dhea</h1>
            <p className="font-extralight text-[0.8rem] mt-4">
              Thursday, 27 November 2025
            </p>
          </div>

          <div className="flex flex-col items-center gap-2">
            <p className="text-[0.8rem]">Leviticus 11</p>
            <p className="text-[0.8rem]">
              Jl. Penyesuaian Tomang II No.1 Blok 11, Meruya Utara, Kec.Kembangan, Kota Jakarta Barat, DKI Jakarta
            </p>

            <RevealWrapper duration={4000} origin="bottom">
              <a
                href="#countdown"
                onClick={handleOpen}
                className="font-bold text-sm bg-[#ffffff36] border border-[#bdb08f8c] rounded-lg flex items-center gap-2 px-6 py-3 mt-6 hover:scale-90 ease-linear duration-[0.2s]"
              >
                <RxEnvelopeOpen />
                <span>Buka Undangan</span>
              </a>
            </RevealWrapper>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
