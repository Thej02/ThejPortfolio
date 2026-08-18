import React, { useEffect, useRef } from "react";

const AnimatedBackground = () => {
  const blobRefs = useRef([]);

  const initialPositions = [
    { x: -4, y: 0 },
    { x: -4, y: 0 },
    { x: 20, y: -8 },
    { x: 20, y: -8 },
  ];

  useEffect(() => {
    let currentScroll = window.pageYOffset || 0;
    let animationFrameId = null;
    let targetScroll = currentScroll;

    const updateBlobs = () => {
      const scrollDelta = targetScroll - currentScroll;

      if (Math.abs(scrollDelta) > 0.1) {
        currentScroll += scrollDelta * 0.08;

        blobRefs.current.forEach((blob, index) => {
          if (!blob) return;

          const initialPos = initialPositions[index];

          const xOffset =
            Math.sin(currentScroll / 100 + index * 0.5) * 340;

          const yOffset =
            Math.cos(currentScroll / 100 + index * 0.5) * 40;

          const x = initialPos.x + xOffset;
          const y = initialPos.y + yOffset;

          blob.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        });
      }

      animationFrameId = requestAnimationFrame(updateBlobs);
    };

    const handleScroll = () => {
      targetScroll = window.pageYOffset || 0;
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    animationFrameId = requestAnimationFrame(updateBlobs);

    return () => {
      window.removeEventListener("scroll", handleScroll);

      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <div
      className="
        fixed
        inset-0
        -z-10
        bg-pastel-bg
        pointer-events-none
        overflow-hidden
      "
    >
      <div className="absolute inset-0">

        {/* Top Left */}
        <div
          ref={(ref) => {
            blobRefs.current[0] = ref;
          }}
          className="
            absolute
            top-0
            -left-4
            md:w-96
            md:h-96
            w-72
            h-72
            bg-pastel-primary
            rounded-full
            mix-blend-multiply
            filter
            blur-[128px]
            opacity-40
            md:opacity-20
            will-change-transform
          "
        />

        {/* Top Right */}
        <div
          ref={(ref) => {
            blobRefs.current[1] = ref;
          }}
          className="
            absolute
            top-0
            -right-4
            w-96
            h-96
            bg-pastel-secondary
            rounded-full
            mix-blend-multiply
            filter
            blur-[128px]
            opacity-40
            md:opacity-20
            hidden
            sm:block
            will-change-transform
          "
        />

        {/* Bottom Left */}
        <div
          ref={(ref) => {
            blobRefs.current[2] = ref;
          }}
          className="
            absolute
            -bottom-8
            left-[-40%]
            md:left-20
            w-96
            h-96
            bg-pastel-tertiary
            rounded-full
            mix-blend-multiply
            filter
            blur-[128px]
            opacity-40
            md:opacity-20
            will-change-transform
          "
        />

        {/* Bottom Right */}
        <div
          ref={(ref) => {
            blobRefs.current[3] = ref;
          }}
          className="
            absolute
            -bottom-10
            right-20
            w-96
            h-96
            bg-pastel-primary
            rounded-full
            mix-blend-multiply
            filter
            blur-[128px]
            opacity-20
            md:opacity-10
            hidden
            sm:block
            will-change-transform
          "
        />
      </div>

      {/* Grid Overlay */}
      <div
        className="
          absolute
          inset-0
          bg-[linear-gradient(to_right,#4f4f4f10_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f10_1px,transparent_1px)]
          bg-[size:24px_24px]
        "
      />
    </div>
  );
};

export default AnimatedBackground;