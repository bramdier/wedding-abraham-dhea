import React from "react";
import { FaQuoteRight } from "react-icons/fa";
import { RevealWrapper } from "next-reveal";
import Lightbox from "./Lightbox";

const items = [
  { id: "preview-big", src: "/images/gallery/bigGrid.jpg", alt: "big-grid" },
  { id: "preview-grid-1", src: "/images/gallery/grid-1.jpg", alt: "grid-1" },
  { id: "preview-grid-2", src: "/images/gallery/grid-2.jpg", alt: "grid-2" },
  { id: "preview-grid-3", src: "/images/gallery/grid-3.jpg", alt: "grid-3" },
  { id: "preview-grid-4", src: "/images/gallery/grid-4.jpg", alt: "grid-4" },
  { id: "preview-grid-5", src: "/images/gallery/grid-5.jpg", alt: "grid-5" },
  { id: "preview-grid-6", src: "/images/gallery/grid-6.jpg", alt: "grid-6" },
];

// Helper to find prev/next (circular)
function getNeighbors(idx: number, total: number) {
  const prev = (idx - 1 + total) % total;
  const next = (idx + 1) % total;
  return { prev, next };
}

function Gallery() {
  return (
    <section id="gallery">
      <div className="bg-[url('/images/gallery/bg.jpg')] bg-cover bg-center relative px-8 py-16">
        <div className="bg-transparent bg-[linear-gradient(360deg,#EAEAEA_53%,#424242_100%)] opacity-90 absolute inset-0" />
        <div className="relative z-10">
          <h1 className="text-xl italic font-light text-center text-white">Our Gallery</h1>

          <div className="flex flex-col items-center text-center gap-4 my-10">
            <img
              src="/images/gallery/quote.jpg"
              alt="quote"
              className="w-[170px] h-[220px] object-cover"
              loading="lazy"
            />
            <RevealWrapper origin="top" duration={1500}>
              <span>
                <FaQuoteRight color="#4242427A" fontSize="1.75rem" />
              </span>
            </RevealWrapper>
            <RevealWrapper origin="top" duration={1500}>
              <p className="text-[0.8rem] font-light leading-loose px-8">
                From when I first saw you, I felt that I was finally home, all I want is
                to make your dreams come true and share our dreams together.
              </p>
            </RevealWrapper>
          </div>

          {/* Big banner (click to preview) */}
          <RevealWrapper origin="right" duration={1500}>
            <a href="#preview-big" className="block focus:outline-none">
              <img
                src="/images/gallery/bigGrid.jpg"
                alt="big-grid"
                className="w-full h-96 object-cover object-bottom rounded-xl"
                loading="lazy"
              />
            </a>
          </RevealWrapper>

          {/* Grid rows (click to preview) */}
          <RevealWrapper origin="top" duration={1500}>
            <div className="grid grid-cols-3 gap-1 mt-1">
              <a href="#preview-grid-1" className="block focus:outline-none">
                <img
                  src="/images/gallery/grid-1.jpg"
                  alt="grid-1"
                  className="h-32 object-cover w-full rounded-lg"
                  loading="lazy"
                />
              </a>
              <a href="#preview-grid-2" className="block focus:outline-none">
                <img
                  src="/images/gallery/grid-2.jpg"
                  alt="grid-2"
                  className="h-32 object-cover w-full rounded-lg"
                  loading="lazy"
                />
              </a>
              <a href="#preview-grid-3" className="block focus:outline-none">
                <img
                  src="/images/gallery/grid-3.jpg"
                  alt="grid-3"
                  className="h-32 object-cover w-full rounded-lg"
                  loading="lazy"
                />
              </a>
            </div>
          </RevealWrapper>

          <RevealWrapper origin="top" duration={1500}>
            <div className="grid grid-cols-3 gap-1 mt-1">
              <a href="#preview-grid-4" className="block focus:outline-none">
                <img
                  src="/images/gallery/grid-4.jpg"
                  alt="grid-4"
                  className="h-32 object-cover w-full rounded-lg"
                  loading="lazy"
                />
              </a>
              <a href="#preview-grid-5" className="block focus:outline-none">
                <img
                  src="/images/gallery/grid-5.jpg"
                  alt="grid-5"
                  className="h-32 object-cover w-full rounded-lg"
                  loading="lazy"
                />
              </a>
              <a href="#preview-grid-6" className="block focus:outline-none">
                <img
                  src="/images/gallery/grid-6.jpg"
                  alt="grid-6"
                  className="h-32 object-cover w-full rounded-lg"
                  loading="lazy"
                />
              </a>
            </div>
          </RevealWrapper>
        </div>
      </div>

      {/* Lightboxes generated from items with circular prev/next */}
      {items.map((item, idx) => {
        const { prev, next } = getNeighbors(idx, items.length);
        return (
          <Lightbox
            key={item.id}
            id={item.id}
            src={item.src}
            alt={item.alt}
            prevId={items[prev].id}
            nextId={items[next].id}
          />
        );
      })}

      {/* Global lightbox styles */}
      <style jsx global>{`
        .lb {
          opacity: 0;
          pointer-events: none;
          transition: opacity 160ms ease;
        }
        .lb:target {
          opacity: 1;
          pointer-events: auto;
        }
        @media (prefers-reduced-motion: reduce) {
          .lb {
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}

export default Gallery;
