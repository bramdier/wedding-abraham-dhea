"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

import ArRum from "./components/ArRum";
import Hero from "./components/Hero";
import Profile from "./components/Profile";
import WeddingEvents from "./components/WeddingEvents";
import Reservation from "./components/Reservation";
import Bank from "./components/Bank";
import Footer from "./components/Footer";
import { RevealWrapper } from "next-reveal";

const Countdown = dynamic(() => import("./components/Countdown"), {
  ssr: false,
  loading: () => null,
});

const GalleryLazy = dynamic(() => import("./components/Gallery"), {
  ssr: false,
  loading: () => null,
});

export default function Home() {
  // Kembali ke perilaku awal: scroll terkunci sampai "Buka Undangan" diklik
  const [currentOverflow, setCurrentOverflow] = useState<string>("hidden");
  const [showGallery, setShowGallery] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.body.style.overflowY = currentOverflow;
  }, [currentOverflow]);

  // Lazy-mount Gallery saat pengguna mendekat ke posisinya
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || showGallery) return;

    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShowGallery(true);
          obs.disconnect();
        }
      },
      { root: null, rootMargin: "300px", threshold: 0.01 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [showGallery]);

  return (
    <main className="max-w-[28.125rem] mx-auto">
      <RevealWrapper duration={1500}>
        <Hero setCurrentOverflow={setCurrentOverflow} />
      </RevealWrapper>

      
      <Countdown />

      <ArRum />
      <Profile />
      <WeddingEvents />
      <Reservation />
      <Bank />

      
      <div ref={sentinelRef} />
      {showGallery && <GalleryLazy />}

      <Footer />
    </main>
  );
}
