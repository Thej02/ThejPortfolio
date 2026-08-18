import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const TypewriterEffect = ({ text }) => {
  const [displayText, setDisplayText] = useState('');
  
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= text.length) {
        setDisplayText(text.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 180);
    
    return () => clearInterval(timer);
  }, [text]);

  return (
    <span className="inline-block font-mono">
      {displayText}
      <span className="animate-blink ml-0.5">|</span>
    </span>
  );
};

const BackgroundEffect = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#E4E9FD] rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob" />
    <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#E3F6F5] rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000" />
    <div className="absolute top-[20%] right-[10%] w-[45%] h-[45%] bg-[#F5E6E8] rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000" />
  </div>
);

const CodeTerminal = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -15 },
    show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 120, damping: 12 } }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full max-w-lg mx-auto rounded-2xl bg-white/70 backdrop-blur-md border border-pastel-border shadow-lg overflow-hidden text-left"
    >
      {/* macOS Window Controls */}
      <div className="flex items-center gap-2 px-4 py-3.5 bg-white/40 border-b border-pastel-border/60">
        <div className="w-3.5 h-3.5 rounded-full bg-[#FF5F56] shadow-sm" />
        <div className="w-3.5 h-3.5 rounded-full bg-[#FFBD2E] shadow-sm" />
        <div className="w-3.5 h-3.5 rounded-full bg-[#27C93F] shadow-sm" />
        <span className="ml-3 text-xs font-bold text-pastel-muted font-mono tracking-wide">welcome.js</span>
      </div>

      {/* Syntax Highlighted Code */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="p-6 font-mono text-[0.8rem] sm:text-[0.95rem] space-y-2 text-[#3A3A3A] leading-relaxed select-none"
      >
        <motion.div variants={itemVariants}>
          <span className="text-[#a855f7] font-bold">const</span> <span className="text-[#6366f1] font-bold">developer</span> = &#123;
        </motion.div>
        
        <motion.div variants={itemVariants} className="pl-5">
          <span className="text-pastel-text">name</span>: <span className="text-[#10b981] font-medium">"Thejaswi Nayak"</span>,
        </motion.div>
        
        <motion.div variants={itemVariants} className="pl-5">
          <span className="text-pastel-text">role</span>: <span className="text-[#10b981] font-medium">"Backend Architect"</span>,
        </motion.div>
        
        <motion.div variants={itemVariants} className="pl-5">
          <span className="text-pastel-text">status</span>: <span className="text-[#f59e0b] font-medium">"ready_to_innovate"</span>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          &#125;;
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const WelcomeScreen = ({ onLoadingComplete }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });

    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => {
        onLoadingComplete?.();
      }, 800);
    }, 3200);
    
    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  const containerVariants = {
    exit: {
      opacity: 0,
      scale: 0.96,
      filter: "blur(12px)",
      transition: {
        duration: 0.6,
        ease: "easeInOut"
      }
    }
  };

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 bg-[#FAF7F5] z-50 flex items-center justify-center p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit="exit"
          variants={containerVariants}
        >
          <BackgroundEffect />
          
          <div className="relative w-full max-w-4xl mx-auto flex flex-col items-center justify-between min-h-[70vh] gap-8">
            {/* Header/Title block */}
            <div className="text-center space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-pastel-muted px-3 py-1 rounded-full bg-white/40 border border-pastel-border shadow-sm">
                System Initializing
              </span>
            </div>

            {/* Terminal Mock */}
            <div className="w-full flex-grow flex items-center justify-center">
              <CodeTerminal />
            </div>

            {/* Link & Domain typewriter */}
            <div className="text-center">
              <a
                href="https://thejaswi-portfolio.vercel.app/"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full relative group hover:scale-105 transition-all duration-300 bg-white/50 border border-pastel-border shadow-sm hover:bg-white/80"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-pastel-primary/10 to-pastel-tertiary/10 rounded-full blur-md group-hover:blur-lg transition-all duration-300 opacity-60" />
                <div className="relative flex items-center gap-2 text-[0.95rem] font-bold text-pastel-text">
                  <Globe className="w-4 h-4 text-pastel-primary group-hover:rotate-12 transition-transform duration-300" />
                  <span className="bg-gradient-to-r from-pastel-primary to-pastel-tertiary bg-clip-text text-transparent">
                    <TypewriterEffect text="thejaswi-portfolio.vercel.app/" />
                  </span>
                </div>
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeScreen;