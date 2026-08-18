import React from "react";
import { ArrowUp } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="w-full mt-16">

      {/* Divider */}
      <div className="mx-[5%] lg:mx-[10%]">
        <div className="h-px bg-gradient-to-r from-transparent via-[#DCD6F7] to-transparent" />
      </div>

      {/* Centered Footer */}
      <div className="py-8 flex flex-col items-center justify-center gap-4">

        {/* Copyright */}
        <p className="text-xs sm:text-sm text-[#8F8A9F] text-center">
          © {currentYear} Thejaswi Nayak. All rights reserved.
        </p>

        {/* Back to Top */}
        <button
          onClick={scrollToTop}
          className="
            group
            flex
            items-center
            gap-2
            px-4
            py-2
            rounded-xl
            bg-[#F4F1FF]
            border
            border-[#E4DFFF]
            text-[#7161EF]
            text-xs
            font-medium
            transition-all
            duration-300
            hover:bg-[#ECE7FF]
            hover:border-[#D4CCF5]
            hover:-translate-y-0.5
            hover:shadow-sm
          "
        >
          Back to top

          <ArrowUp
            className="
              w-3.5
              h-3.5
              transition-transform
              duration-300
              group-hover:-translate-y-0.5
            "
          />
        </button>

      </div>

    </footer>
  );
};

export default Footer;