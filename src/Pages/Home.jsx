import React, {
  useState,
  useEffect,
  useCallback,
  memo,
} from "react";
import { Helmet } from "react-helmet-async";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

/* =========================
   Main Title
========================= */

const MainTitle = memo(() => (
  <div
    className="space-y-2"
    data-aos="fade-up"
    data-aos-delay="600"
  >
    <h1 className="font-bold tracking-tight text-4xl sm:text-5xl lg:text-5xl xl:text-6xl">

      {/* Line 1 */}
      <span className="relative block whitespace-nowrap">
        <span className="absolute -inset-2 bg-gradient-to-r from-pastel-primary to-pastel-tertiary blur-2xl opacity-10" />

        <span className="relative text-pastel-text">
          K. Thejaswi Nayak
        </span>
      </span>

      {/* Line 2 */}
      <span className="relative block whitespace-nowrap mt-3 text-2xl sm:text-2xl lg:text-2xl xl:text-3xl">
        <span className="absolute -inset-2 bg-gradient-to-r from-pastel-primary to-pastel-tertiary blur-2xl opacity-15" />

        <span className="relative bg-gradient-to-r from-pastel-primary to-pastel-tertiary bg-clip-text text-transparent">
          Information Science & Engineering Student
        </span>
      </span>

    </h1>
  </div>
));s


/* =========================
   CTA Button
========================= */

const CTAButton = memo(({ href, text, icon: Icon }) => (
  <a
    href={href}
    className="group relative block w-[140px]"
  >
    <div className="absolute -inset-0.5 bg-gradient-to-r from-pastel-primary to-pastel-tertiary rounded-xl opacity-40 blur-md group-hover:opacity-75 transition-all duration-700" />

    <div className="relative h-11 bg-white/60 backdrop-blur-xl rounded-lg border border-pastel-border leading-none overflow-hidden shadow-sm">

      {/* Hover Background */}
      <div className="absolute inset-0 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 bg-gradient-to-r from-pastel-primary/10 to-pastel-tertiary/10" />

      {/* Content */}
      <span className="absolute inset-0 flex items-center justify-center gap-2 text-sm group-hover:gap-3 transition-all duration-300">

        <span className="text-pastel-text font-bold z-10">
          {text}
        </span>

        <Icon
          className={`w-4 h-4 text-pastel-muted ${
            text === "Contact"
              ? "group-hover:translate-x-1"
              : "group-hover:rotate-45"
          } transform transition-all duration-300 z-10`}
        />

      </span>

    </div>
  </a>
));


/* =========================
   Social Links
========================= */

const SocialLink = memo(
  ({ icon: Icon, link, label }) => (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
    >
      <button
        type="button"
        className="group relative p-1.5"
        aria-label={label}
      >

        <div className="absolute inset-0 bg-gradient-to-r from-pastel-primary to-pastel-tertiary rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-300" />

        <div className="relative rounded-lg bg-white/40 backdrop-blur-xl p-2 flex items-center justify-center border border-pastel-border group-hover:border-pastel-primary/30 transition-all duration-300 shadow-sm">

          <Icon className="w-4 h-4 text-pastel-muted group-hover:text-pastel-text transition-colors" />

        </div>

      </button>
    </a>
  )
);


/* =========================
   Typing Effect
========================= */

const TYPING_SPEED = 85;
const ERASING_SPEED = 45;
const PAUSE_DURATION = 1800;

const WORDS = [
  "Software Engineer",
  "Full-Stack Developer",
  "AI & ML Engineer",
  "Backend Developer",
];

const SOCIAL_LINKS = [
  {
    icon: Github,
    link: "https://github.com/Thej02",
    label: "GitHub Profile",
  },
  {
    icon: Linkedin,
    link: "https://www.linkedin.com/in/thejaswi-nayak",
    label: "LinkedIn Profile",
  },
];


/* =========================
   Home
========================= */

const Home = () => {
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);


  /* =========================
     AOS
  ========================= */

  useEffect(() => {
    const initAOS = () => {
      AOS.init({
        once: true,
        offset: 10,
      });
    };

    initAOS();

    window.addEventListener("resize", initAOS);

    return () => {
      window.removeEventListener("resize", initAOS);
    };
  }, []);


  /* =========================
     Page Loaded
  ========================= */

  useEffect(() => {
    setIsLoaded(true);

    return () => {
      setIsLoaded(false);
    };
  }, []);


  /* =========================
     Typing Logic
  ========================= */

  const handleTyping = useCallback(() => {
    const currentWord = WORDS[wordIndex];

    if (isTyping) {

      if (charIndex < currentWord.length) {

        setText(
          currentWord.slice(
            0,
            charIndex + 1
          )
        );

        setCharIndex(
          (prev) => prev + 1
        );

      } else {

        setTimeout(() => {
          setIsTyping(false);
        }, PAUSE_DURATION);

      }

    } else {

      if (charIndex > 0) {

        setText(
          currentWord.slice(
            0,
            charIndex - 1
          )
        );

        setCharIndex(
          (prev) => prev - 1
        );

      } else {

        setWordIndex(
          (prev) =>
            (prev + 1) % WORDS.length
        );

        setIsTyping(true);

      }
    }
  }, [
    charIndex,
    isTyping,
    wordIndex,
  ]);


  useEffect(() => {
    const timeout = setTimeout(
      handleTyping,
      isTyping
        ? TYPING_SPEED
        : ERASING_SPEED
    );

    return () =>
      clearTimeout(timeout);
  }, [
    handleTyping,
    isTyping,
  ]);


  /* =========================
     JSX
  ========================= */

  return (
    <>
      <Helmet>

        <title>
          Thejaswi Nayak — Software Engineer
        </title>

        <meta
          name="description"
          content="Official portfolio of Thejaswi Nayak, an Information Science & Engineering student focused on software engineering, full-stack development, AI/ML, and backend systems."
        />

        <meta
          name="robots"
          content="index, follow"
        />

        <link
          rel="canonical"
          href="https://thejaswi-portfolio.vercel.app/"
        />

        <meta
          property="og:title"
          content="Thejaswi Nayak — Software Engineer"
        />

        <meta
          property="og:description"
          content="Portfolio of Thejaswi Nayak, Software Engineer, Full-Stack Developer and AI/ML enthusiast."
        />

        <meta
          property="og:url"
          content="https://thejaswi-portfolio.vercel.app/"
        />

        <meta
          property="og:type"
          content="website"
        />

        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Thejaswi Nayak",
              "jobTitle": "Software Engineer",
              "url": "https://thejaswi-portfolio.vercel.app/",
              "sameAs": [
                "https://github.com/Thej02",
                "https://www.linkedin.com/in/thejaswi-nayak"
              ]
            }
          `}
        </script>

      </Helmet>


      {/* =====================================================
          HOME
      ===================================================== */}

      <div
        className="
          min-h-screen
          bg-transparent
          overflow-hidden
          px-[5%]
          sm:px-[5%]
          lg:px-[10%]
        "
        id="Home"
      >

        <div
          className={`
            relative
            z-10
            transition-all
            duration-1000
            ${
              isLoaded
                ? "opacity-100"
                : "opacity-0"
            }
          `}
        >

          <div className="container mx-auto min-h-screen">

            <div
              className="
                flex
                flex-col
                lg:flex-row
                items-center
                justify-center
                h-screen
                md:justify-between
                gap-0
                sm:gap-12
                lg:gap-20
              "
            >

              {/* =================================================
                  LEFT COLUMN
              ================================================= */}

              <div
                className="
                  w-full
                  lg:w-1/2
                  space-y-6
                  sm:space-y-8
                  text-left
                  lg:text-left
                  order-1
                  lg:order-1
                  lg:mt-0
                "
                data-aos="fade-right"
                data-aos-delay="200"
              >

                <div className="space-y-4 sm:space-y-6">

                  {/* Main Title */}

                  <MainTitle />


                  {/* =================================================
                      TYPING EFFECT
                  ================================================= */}

                  <div
                    className="
                      min-h-[40px]
                      flex
                      items-center
                      mt-1
                    "
                    data-aos="fade-up"
                    data-aos-delay="800"
                  >

                    <span
                      className="
                        text-xl
                        md:text-2xl
                        font-medium
                        bg-gradient-to-r
                        from-[#7161EF]
                        via-[#8B78E6]
                        to-[#A855F7]
                        bg-clip-text
                        text-transparent
                        tracking-tight
                        transition-all
                        duration-300
                      "
                    >
                      {text}
                    </span>

                    <span
                      className="
                        w-[2px]
                        h-6
                        bg-[#7161EF]
                        ml-1.5
                        animate-blink
                        rounded-full
                      "
                    />

                  </div>


                  {/* Description */}

                  <p
                    className="
                      text-base
                      md:text-lg
                      text-pastel-muted
                      max-w-xl
                      leading-relaxed
                      font-light
                    "
                    data-aos="fade-up"
                    data-aos-delay="1000"
                  >
                    Building scalable products, intelligent systems,
                    and high-performance digital experiences.
                  </p>


                  {/* =================================================
                      ACTION ROW
                  ================================================= */}

                  <div
                    className="
                      flex
                      flex-wrap
                      items-center
                      gap-3
                    "
                    data-aos="fade-up"
                    data-aos-delay="1200"
                  >

                    {/* Projects */}

                    <CTAButton
                      href="#Portofolio"
                      text="Projects"
                      icon={ExternalLink}
                    />


                    {/* Contact */}

                    <CTAButton
                      href="#Contact"
                      text="Contact"
                      icon={Mail}
                    />


                    {/* GitHub + LinkedIn */}

                    <div
                      className="
                        flex
                        items-center
                        gap-1
                      "
                    >
                      {SOCIAL_LINKS.map(
                        (social, index) => (
                          <SocialLink
                            key={index}
                            {...social}
                          />
                        )
                      )}
                    </div>

                  </div>

                </div>

              </div>


              {/* =================================================
                  RIGHT COLUMN
              ================================================= */}

              <div
                className="
                  w-full
                  py-0
                  md:py-[10%]
                  sm:py-0
                  lg:w-1/2
                  h-[260px]
                  sm:h-[400px]
                  lg:h-[600px]
                  xl:h-[750px]
                  relative
                  flex
                  items-center
                  justify-center
                  order-2
                  lg:order-2
                  mt-5
                  sm:mt-0
                "
                onMouseEnter={() =>
                  setIsHovering(true)
                }
                onMouseLeave={() =>
                  setIsHovering(false)
                }
                data-aos="fade-left"
                data-aos-delay="600"
              >

                <div
                  className="
                    relative
                    w-full
                    opacity-90
                  "
                >

                  {/* Glow */}

                  <div
                    className={`
                      absolute
                      inset-0
                      bg-gradient-to-r
                      from-pastel-primary/20
                      to-pastel-tertiary/20
                      rounded-3xl
                      blur-3xl
                      transition-all
                      duration-700
                      ease-in-out
                      ${
                        isHovering
                          ? "opacity-50 scale-105"
                          : "opacity-20 scale-100"
                      }
                    `}
                  />

                  <div
                    className={`
                      relative
                      lg:left-12
                      z-10
                      w-full
                      opacity-90
                      transform
                      transition-transform
                      duration-500
                      ${
                        isHovering
                          ? "scale-105"
                          : "scale-100"
                      }
                    `}
                  >

                    <svg
                      viewBox="0 0 500 500"
                      className="
                        w-full
                        h-full
                        object-contain
                        select-none
                      "
                    >

                      <style
                        dangerouslySetInnerHTML={{
                          __html: `
                            @keyframes float-svg {
                              0%, 100% {
                                transform: translateY(0px);
                              }

                              50% {
                                transform: translateY(-12px);
                              }
                            }

                            @keyframes pulse-light {
                              0%, 100% {
                                opacity: 0.35;
                              }

                              50% {
                                opacity: 0.7;
                              }
                            }

                            .float-1 {
                              animation: float-svg 3.5s ease-in-out infinite;
                            }

                            .float-2 {
                              animation: float-svg 4.2s ease-in-out infinite 0.5s;
                            }

                            .float-3 {
                              animation: float-svg 3.8s ease-in-out infinite 1s;
                            }

                            .float-4 {
                              animation: float-svg 4.8s ease-in-out infinite 0.2s;
                            }

                            .pulse-svg {
                              animation: pulse-light 4s ease-in-out infinite;
                            }
                          `,
                        }}
                      />


                      <defs>

                        <linearGradient
                          id="screenGrad"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="100%"
                        >
                          <stop
                            offset="0%"
                            stopColor="#C9B6E4"
                            stopOpacity="0.25"
                          />

                          <stop
                            offset="100%"
                            stopColor="#B8E3D2"
                            stopOpacity="0.08"
                          />
                        </linearGradient>


                        <linearGradient
                          id="orbGrad"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="100%"
                        >
                          <stop
                            offset="0%"
                            stopColor="#C9B6E4"
                            stopOpacity="0.5"
                          />

                          <stop
                            offset="100%"
                            stopColor="#FAF7F5"
                            stopOpacity="0.15"
                          />
                        </linearGradient>

                      </defs>


                      {/* Floating glowing spots */}

                      <circle
                        cx="100"
                        cy="180"
                        r="45"
                        fill="url(#orbGrad)"
                        className="pulse-svg"
                      />

                      <circle
                        cx="400"
                        cy="300"
                        r="35"
                        fill="url(#orbGrad)"
                        className="pulse-svg"
                        style={{
                          animationDelay: "2s",
                        }}
                      />


                      {/* Monitor */}

                      <rect
                        x="110"
                        y="120"
                        width="280"
                        height="190"
                        rx="16"
                        fill="#FAF7F5"
                        stroke="#3A3A3A"
                        strokeWidth="4.5"
                      />


                      {/* Inner Screen */}

                      <rect
                        x="122"
                        y="132"
                        width="256"
                        height="166"
                        rx="8"
                        fill="url(#screenGrad)"
                        stroke="#3A3A3A"
                        strokeWidth="2"
                      />


                      {/* Stand */}

                      <path
                        d="M220 310 L280 310 L290 350 L210 350 Z"
                        fill="#EAE5DF"
                        stroke="#3A3A3A"
                        strokeWidth="4.5"
                        strokeLinejoin="round"
                      />


                      {/* Base */}

                      <rect
                        x="170"
                        y="350"
                        width="160"
                        height="15"
                        rx="6"
                        fill="#FAF7F5"
                        stroke="#3A3A3A"
                        strokeWidth="4.5"
                      />


                      {/* Code Lines */}

                      <g
                        strokeLinecap="round"
                        strokeWidth="4"
                      >

                        <line
                          x1="140"
                          y1="160"
                          x2="200"
                          y2="160"
                          stroke="#C9B6E4"
                        />

                        <line
                          x1="212"
                          y1="160"
                          x2="290"
                          y2="160"
                          stroke="#B8E3D2"
                        />

                        <line
                          x1="140"
                          y1="185"
                          x2="175"
                          y2="185"
                          stroke="#F5F0BB"
                        />

                        <line
                          x1="187"
                          y1="185"
                          x2="260"
                          y2="185"
                          stroke="#C9B6E4"
                        />

                        <line
                          x1="272"
                          y1="185"
                          x2="310"
                          y2="185"
                          stroke="#3A3A3A"
                        />

                        <line
                          x1="160"
                          y1="210"
                          x2="225"
                          y2="210"
                          stroke="#B8E3D2"
                        />

                        <line
                          x1="237"
                          y1="210"
                          x2="340"
                          y2="210"
                          stroke="#F5F0BB"
                        />

                        <line
                          x1="160"
                          y1="235"
                          x2="280"
                          y2="235"
                          stroke="#C9B6E4"
                        />

                        <line
                          x1="140"
                          y1="260"
                          x2="195"
                          y2="260"
                          stroke="#B8E3D2"
                        />

                      </g>


                      {/* </> Badge */}

                      <g
                        transform="translate(50, 90)"
                      >

                        <g className="float-1">

                          <rect
                            width="65"
                            height="36"
                            rx="10"
                            fill="#FAF7F5"
                            stroke="#3A3A3A"
                            strokeWidth="3"
                          />

                          <text
                            x="32.5"
                            y="24"
                            fontFamily="Courier, monospace"
                            fontSize="16"
                            fontWeight="bold"
                            fill="#C9B6E4"
                            textAnchor="middle"
                          >
                            &lt;/&gt;
                          </text>

                        </g>

                      </g>


                      {/* {} Badge */}

                      <g
                        transform="translate(370, 95)"
                      >

                        <g className="float-2">

                          <rect
                            width="55"
                            height="36"
                            rx="10"
                            fill="#FAF7F5"
                            stroke="#3A3A3A"
                            strokeWidth="3"
                          />

                          <text
                            x="27.5"
                            y="24"
                            fontFamily="Courier, monospace"
                            fontSize="18"
                            fontWeight="bold"
                            fill="#B8E3D2"
                            textAnchor="middle"
                          >
                            {"{}"}
                          </text>

                        </g>

                      </g>


                      {/* DB Badge */}

                      <g
                        transform="translate(30, 240)"
                      >

                        <g className="float-3">

                          <rect
                            width="70"
                            height="36"
                            rx="10"
                            fill="#FAF7F5"
                            stroke="#3A3A3A"
                            strokeWidth="3"
                          />

                          <text
                            x="35"
                            y="23"
                            fontFamily="Courier, monospace"
                            fontSize="13"
                            fontWeight="bold"
                            fill="#9F9F68"
                            textAnchor="middle"
                          >
                            SQL/DB
                          </text>

                        </g>

                      </g>


                      {/* REST Badge */}

                      <g
                        transform="translate(390, 220)"
                      >

                        <g className="float-4">

                          <rect
                            width="65"
                            height="36"
                            rx="10"
                            fill="#FAF7F5"
                            stroke="#3A3A3A"
                            strokeWidth="3"
                          />

                          <text
                            x="32.5"
                            y="23"
                            fontFamily="Courier, monospace"
                            fontSize="13"
                            fontWeight="bold"
                            fill="#C9B6E4"
                            textAnchor="middle"
                          >
                            REST
                          </text>

                        </g>

                      </g>

                    </svg>

                  </div>


                  {/* Background Glow */}

                  <div
                    className={`
                      absolute
                      inset-0
                      pointer-events-none
                      transition-all
                      duration-700
                      ${
                        isHovering
                          ? "opacity-50"
                          : "opacity-20"
                      }
                    `}
                  >

                    <div
                      className={`
                        absolute
                        top-1/2
                        left-1/2
                        -translate-x-1/2
                        -translate-y-1/2
                        w-[400px]
                        h-[400px]
                        bg-gradient-to-br
                        from-pastel-primary/15
                        to-pastel-tertiary/15
                        blur-3xl
                        animate-[pulse_6s_cubic-bezier(0.4,0,0.6,1)_infinite]
                        transition-all
                        duration-700
                        ${
                          isHovering
                            ? "scale-110"
                            : "scale-100"
                        }
                      `}
                    />

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </>
  );
};

export default memo(Home);