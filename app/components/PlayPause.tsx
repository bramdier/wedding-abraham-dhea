"use client";

import { useEffect, useState, useCallback } from "react";
import { RxPlay, RxPause } from "react-icons/rx";

const AUDIO_ID = "global-bgm";

export default function PlayPause() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [ready, setReady] = useState(false);

    // sinkron status saat audio main/pause dari event browser
    useEffect(() => {
        const el = document.getElementById(AUDIO_ID) as HTMLAudioElement | null;
        if (!el) return;

        const onPlay = () => setIsPlaying(true);
        const onPause = () => setIsPlaying(false);
        const onCanPlay = () => setReady(true);

        el.addEventListener("play", onPlay);
        el.addEventListener("pause", onPause);
        el.addEventListener("canplay", onCanPlay);

        // set state awal
        setIsPlaying(!el.paused);
        setReady(!el.paused || el.readyState >= 2);

        return () => {
            el.removeEventListener("play", onPlay);
            el.removeEventListener("pause", onPause);
            el.removeEventListener("canplay", onCanPlay);
        };
    }, []);

    const toggle = useCallback(async () => {
        const el = document.getElementById(AUDIO_ID) as HTMLAudioElement | null;
        if (!el) return;

        try {
            if (el.paused) {
                // jika autoplay sempat diblok, klik user ini akan mengizinkan play
                await el.play();
            } else {
                el.pause();
            }
        } catch (e) {
            // swallow error autoplay (mis. kebijakan browser)
            console.warn("Audio toggle failed:", e);
        }
    }, []);

    return (
        <button
            onClick={toggle}
            aria-label={isPlaying ? "Pause background music" : "Play background music"}
            title={isPlaying ? "Pause" : "Play"}
            className="fixed bottom-6 right-6 z-50 rounded-full w-12 h-12 flex items-center justify-center shadow-lg
                 bg-white/90 text-gray-900 backdrop-blur border border-white/60 hover:scale-95 transition
                 dark:bg-black/60 dark:text-white dark:border-white/20"
            disabled={!ready}
        >
            {isPlaying ? (
                <RxPause className="text-xl" />
            ) : (
                <RxPlay className="text-xl translate-x-[1px]" />
            )}
        </button>
    );
}
