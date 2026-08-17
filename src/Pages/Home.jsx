import React, { useState, useEffect, useCallback, memo } from "react"
import { Helmet } from "react-helmet-async"
import { Github, Linkedin, Mail, ExternalLink, Instagram, Sparkles } from "lucide-react"
import AOS from 'aos'
import 'aos/dist/aos.css'

const StatusBadge = memo(() => (
  <div className="inline-block animate-float lg:mx-0" data-aos="zoom-in" data-aos-delay="400">
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-pastel-primary to-pastel-tertiary rounded-full blur opacity-30 group-hover:opacity-55 transition duration-1000"></div>
      <div className="relative px-3 sm:px-4 py-2 rounded-full bg-white/40 backdrop-blur-xl border border-pastel-border shadow-sm">
        <span className="bg-gradient-to-r from-pastel-primary to-pastel-tertiary text-transparent bg-clip-text sm:text-sm text-[0.7rem] font-bold flex items-center">
          <Sparkles className="sm:w-4 sm:h-4 w-3 h-3 mr-2 text-pastel-primary" />
          Ready to Innovate
        </span>
      </div>
    </div>
  </div>
));

const MainTitle = memo(() => (
  <div className="space-y-2" data-aos="fade-up" data-aos-delay="600">
    <h1 className="text-5xl sm:text-6xl md:text-6xl lg:text-6xl xl:text-7xl font-bold tracking-tight">
      <span className="relative inline-block">
        <span className="absolute -inset-2 bg-gradient-to-r from-pastel-primary to-pastel-tertiary blur-2xl opacity-10"></span>
        <span className="relative text-pastel-text">
          Backend
        </span>
      </span>
      <br />
      <span className="relative inline-block mt-2">
        <span className="absolute -inset-2 bg-gradient-to-r from-pastel-primary to-pastel-tertiary blur-2xl opacity-15"></span>
        <span className="relative bg-gradient-to-r from-pastel-primary to-pastel-tertiary bg-clip-text text-transparent">
          Developer
        </span>
      </span>
    </h1>
  </div>
));

const TechStack = memo(({ tech }) => (
  <div className="px-4 py-2 hidden sm:block rounded-full bg-white/50 backdrop-blur-sm border border-pastel-border text-sm text-pastel-text hover:bg-white/80 transition-colors shadow-sm">
    {tech}
  </div>
));

const CTAButton = memo(({ href, text, icon: Icon }) => (
  <a href={href}>
    <button className="group relative w-[160px]">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-pastel-primary to-pastel-tertiary rounded-xl opacity-40 blur-md group-hover:opacity-75 transition-all duration-700"></div>
      <div className="relative h-11 bg-white/60 backdrop-blur-xl rounded-lg border border-pastel-border leading-none overflow-hidden shadow-sm">
        <div className="absolute inset-0 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 bg-gradient-to-r from-pastel-primary/10 to-pastel-tertiary/10"></div>
        <span className="absolute inset-0 flex items-center justify-center gap-2 text-sm group-hover:gap-3 transition-all duration-300">
          <span className="text-pastel-text font-bold z-10">
            {text}
          </span>
          <Icon className={`w-4 h-4 text-pastel-muted ${text === 'Contact' ? 'group-hover:translate-x-1' : 'group-hover:rotate-45'} transform transition-all duration-300 z-10`} />
        </span>
      </div>
    </button>
  </a>
));

const SocialLink = memo(({ icon: Icon, link, label }) => (
  <a href={link} target="_blank" rel="noopener noreferrer" aria-label={label}>
    <button className="group relative p-3"
      aria-label={label}>
      <div className="absolute inset-0 bg-gradient-to-r from-pastel-primary to-pastel-tertiary rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
      <div className="relative rounded-xl bg-white/40 backdrop-blur-xl p-2 flex items-center justify-center border border-pastel-border group-hover:border-pastel-primary/30 transition-all duration-300 shadow-sm">
        <Icon className="w-5 h-5 text-pastel-muted group-hover:text-pastel-text transition-colors" />
      </div>
    </button>
  </a>
));

const TYPING_SPEED = 100;
const ERASING_SPEED = 50;
const PAUSE_DURATION = 2000;
const WORDS = ["Backend Developer", "Software Engineer", "Full Stack Developer"];
const TECH_STACK = ["Node.js", "Java", "Python", "SQL", "Express", "React"];
const SOCIAL_LINKS = [
  { icon: Github, link: "https://github.com/Thej02", label: "GitHub Profile" },
  { icon: Linkedin, link: "https://www.linkedin.com/in/thejaswi-nayak", label: "LinkedIn Profile" }
];

const Home = () => {
  const [text, setText] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const [wordIndex, setWordIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const initAOS = () => {
      AOS.init({
        once: true,
        offset: 10,
      });
    };

    initAOS();
    window.addEventListener('resize', initAOS);
    return () => window.removeEventListener('resize', initAOS);
  }, []);

  useEffect(() => {
    setIsLoaded(true);
    return () => setIsLoaded(false);
  }, []);

  const handleTyping = useCallback(() => {
    if (isTyping) {
      if (charIndex < WORDS[wordIndex].length) {
        setText(prev => prev + WORDS[wordIndex][charIndex]);
        setCharIndex(prev => prev + 1);
      } else {
        setTimeout(() => setIsTyping(false), PAUSE_DURATION);
      }
    } else {
      if (charIndex > 0) {
        setText(prev => prev.slice(0, -1));
        setCharIndex(prev => prev - 1);
      } else {
        setWordIndex(prev => (prev + 1) % WORDS.length);
        setIsTyping(true);
      }
    }
  }, [charIndex, isTyping, wordIndex]);

  useEffect(() => {
    const timeout = setTimeout(
      handleTyping,
      isTyping ? TYPING_SPEED : ERASING_SPEED
    );
    return () => clearTimeout(timeout);
  }, [handleTyping]);

  return (
    <>
      <Helmet>
        <title>Thejaswi Nayak — Backend Developer & Software Engineer</title>
        <meta name="description" content="Official portfolio of Thejaswi Nayak, a passionate Backend Developer and Software Engineer specializing in building scalable systems and backend architectures." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://thejaswinayak.vercel.app" />
        <meta property="og:title" content="Thejaswi Nayak — Backend Developer & Software Engineer" />
        <meta property="og:description" content="Official portfolio of Thejaswi Nayak, Backend Developer & Software Engineer." />
        <meta property="og:url" content="https://thejaswinayak.vercel.app" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Thejaswi Nayak",
            "jobTitle": "Backend Developer & Software Engineer",
            "url": "https://thejaswinayak.vercel.app",
            "sameAs": [
              "https://github.com/Thej02",
              "https://www.linkedin.com/in/thejaswi-nayak"
            ]
          }
        `}</script>
      </Helmet>

      <div className="min-h-screen bg-transparent overflow-hidden px-[5%] sm:px-[5%] lg:px-[10%]" id="Home">
        <div className={`relative z-10 transition-all duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
          <div className="container mx-auto min-h-screen">
            <div className="flex flex-col lg:flex-row items-center justify-center h-screen md:justify-between gap-0 sm:gap-12 lg:gap-20">
              {/* Left Column */}
              <div className="w-full lg:w-1/2 space-y-6 sm:space-y-8 text-left lg:text-left order-1 lg:order-1 lg:mt-0"
                data-aos="fade-right"
                data-aos-delay="200">
                <div className="space-y-4 sm:space-y-6">
                  <StatusBadge />
                  <MainTitle />

                  {/* Typing Effect */}
                  <div className="h-8 flex items-center" data-aos="fade-up" data-aos-delay="800">
                    <span className="text-xl md:text-2xl text-pastel-text font-light">
                      {text}
                    </span>
                    <span className="w-[3px] h-6 bg-pastel-primary ml-1 animate-blink"></span>
                  </div>

                  {/* Description */}
                  <p className="text-base md:text-lg text-pastel-muted max-w-xl leading-relaxed font-light"
                    data-aos="fade-up"
                    data-aos-delay="1000">
                    Building scalable backends, efficient database architectures, and high-performance digital solutions.
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-3 justify-start" data-aos="fade-up" data-aos-delay="1200">
                    {TECH_STACK.map((tech, index) => (
                      <TechStack key={index} tech={tech} />
                    ))}
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-row gap-3 w-full justify-start" data-aos="fade-up" data-aos-delay="1400">
                    <CTAButton href="#Portofolio" text="Projects" icon={ExternalLink} />
                    <CTAButton href="#Contact" text="Contact" icon={Mail} />
                  </div>

                  {/* Social Links */}
                  <div className="hidden sm:flex gap-4 justify-start" data-aos="fade-up" data-aos-delay="1600">
                    {SOCIAL_LINKS.map((social, index) => (
                      <SocialLink key={index} {...social} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - WebM Video */}
              <div className="w-full py-0 md:py-[10%] sm:py-0 lg:w-1/2 h-[260px] sm:h-[400px] lg:h-[600px] xl:h-[750px] relative flex items-center justify-center order-2 lg:order-2  mt-5 sm:mt-0"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                data-aos="fade-left"
                data-aos-delay="600">
                <div className="relative w-full opacity-90">
                  <div className={`absolute inset-0 bg-gradient-to-r from-pastel-primary/20 to-pastel-tertiary/20 rounded-3xl blur-3xl transition-all duration-700 ease-in-out ${
                    isHovering ? "opacity-50 scale-105" : "opacity-20 scale-100"
                  }`}>
                  </div>

                  <div className={`relative lg:left-12 z-10 w-full opacity-90 transform transition-transform duration-500 ${
                    isHovering ? "scale-105" : "scale-100"
                  }`}>
                    <img
                      src="/Animation1.gif"
                      alt="Developer Animation"
                      className={`w-full h-full object-contain transition-all duration-500 ${
                        isHovering 
                          ? "scale-[95%] sm:scale-[90%] md:scale-[90%] lg:scale-[90%] rotate-2" 
                          : "scale-[90%] sm:scale-[80%] md:scale-[80%] lg:scale-[80%]"
                      }`}
                    />
                  </div>

                  <div className={`absolute inset-0 pointer-events-none transition-all duration-700 ${
                    isHovering ? "opacity-50" : "opacity-20"
                  }`}>
                    <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-br from-pastel-primary/15 to-pastel-tertiary/15 blur-3xl animate-[pulse_6s_cubic-bezier(0.4,0,0.6,1)_infinite] transition-all duration-700 ${
                      isHovering ? "scale-110" : "scale-100"
                    }`}>
                    </div>
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