import React from "react";

type Props = {
  id: string;
  src: string;
  alt: string;
  /** Optional circular navigation */
  prevId?: string;
  nextId?: string;
};

function Lightbox({ id, src, alt, prevId, nextId }: Props) {
  return (
    <div
      id={id}
      className="lb fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby={`${id}-label`}
    >
      {/* Backdrop (close: clear hash) */}
      <a
        href="#"
        className="absolute inset-0 bg-slate-800/80"
        aria-label="Close preview"
      />

      <div className="relative z-10 max-w-5xl w-full px-4">
        {/* Accessible label for SR users */}
        <span id={`${id}-label`} className="sr-only">
          Image preview: {alt}
        </span>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className="rounded-2xl shadow-lg max-h-[80vh] mx-auto"
          loading="eager"
        />

        {/* Close */}
        <a
          href="#gallery"
          className="absolute -top-3 right-2 md:-top-4 md:right-0 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-slate-700 text-xl font-bold shadow-md ring-1 ring-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-300"
          aria-label="Close"
          title="Close"
        >
          ×
        </a>

        {/* Prev / Next (only render if provided) */}
        {prevId && (
          <a
            href={`#${prevId}`}
            className="absolute left-2 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-slate-700 text-xl font-bold shadow ring-1 ring-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-300"
            aria-label="Previous image"
            title="Previous"
          >
            ‹
          </a>
        )}
        {nextId && (
          <a
            href={`#${nextId}`}
            className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-slate-700 text-xl font-bold shadow ring-1 ring-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-300"
            aria-label="Next image"
            title="Next"
          >
            ›
          </a>
        )}
      </div>
    </div>
  );
}

export default Lightbox;
