import React, { useEffect } from "react";

function ImageHero({ src, alt }) {
  const [showingLightbox, setShowingLightbox] = React.useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && showingLightbox) {
        setShowingLightbox(false);
      }
    };

    if (showingLightbox) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [showingLightbox]);

  return (
    <>
      <button
        className="hero w-full h-[45vh] bg-accent border-b cursor-pointer z-40"
        title="View Image"
        onClick={() => setShowingLightbox(true)}
      >
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      </button>
      <div
        className={`lightbox fixed top-0 left-0 w-full h-full bg-black/75 flex items-center justify-center z-50 transition-all duration-300 px-8 ${
          showingLightbox
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setShowingLightbox(false)}
      >
        <button
          aria-label="Close Image"
          type="button"
          className="absolute top-4 right-4 text-white cursor-pointer text-6xl"
          onClick={(e) => {
            e.stopPropagation();
            setShowingLightbox(false);
          }}
        >
          &times;
        </button>
        <img
          src={src}
          alt={alt}
          className="max-w-full max-h-[80vh] object-contain"
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    </>
  );
}

export default ImageHero;
