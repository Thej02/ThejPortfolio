import React, { useEffect, useState, useCallback } from "react";

import { supabase } from "../supabase"; 

import CardProject from "../components/CardProject";
import AOS from "aos";
import "aos/dist/aos.css";


const ToggleButton = ({ onClick, isShowingMore }) => (
  <button
    onClick={onClick}
    className="
      px-3 py-1.5
      text-pastel-text 
      hover:text-indigo-600 
      text-sm 
      font-bold 
      transition-all 
      duration-300 
      ease-in-out
      flex 
      items-center 
      gap-2
      bg-white/40 
      hover:bg-white/80
      rounded-md
      border 
      border-pastel-border
      hover:border-pastel-primary/30
      backdrop-blur-sm
      group
      relative
      overflow-hidden
      shadow-sm
    "
  >
    <span className="relative z-10 flex items-center gap-2">
      {isShowingMore ? "See Less" : "See More"}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`
          transition-transform 
          duration-300 
          ${isShowingMore ? "group-hover:-translate-y-0.5" : "group-hover:translate-y-0.5"}
        `}
      >
        <polyline points={isShowingMore ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}></polyline>
      </svg>
    </span>
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-pastel-primary/50 transition-all duration-300 group-hover:w-full"></span>
  </button>
);


function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: { xs: 1, sm: 3 } }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

// keyboardRows definition for mechanical keyboard tech stack layout
const keyboardRows = [
  [
    { key: "ESC", label: "ESC", type: "system", span: 1 },
    { key: "Java", label: "Java", type: "tech", category: "Programming Languages", description: "Class-based, object-oriented language optimized for enterprise-grade backend services." },
    { key: "JS", label: "JavaScript", type: "tech", category: "Languages & Scripting", description: "Dynamic scripting engine utilized for full-stack logic, asynchronous runtime services, and styling." },
    { key: "C", label: "C Language", type: "tech", category: "System Programming", description: "Low-level structures and compilation foundations for system coding and optimized algorithm blocks." },
    { key: "SQL", label: "SQL", type: "tech", category: "Databases & Queries", description: "Relational database querying and management standards across MySQL, PostgreSQL, and SQLite." },
    { key: "Python", label: "Python", type: "tech", category: "Scripting & AI Integration", description: "High-level programming platform optimized for scripts, machine learning prompts, and quick web hooks." },
    { key: "Git", label: "Git", type: "tech", category: "Tools & Collaboration", description: "Distributed codebase management and change auditing tool built for collaborative software engineering." },
    { key: "Linux", label: "Linux", type: "tech", category: "Infrastructure", description: "Unix-based operating system shell administration, scripting utilities, and cloud container hosting." },
    { key: "AWS", label: "AWS", type: "tech", category: "Cloud & Infrastructure", description: "Amazon Web Services environment hosting server instances, storage containers, and virtual compute nodes." },
    { key: "S3", label: "AWS S3", type: "tech", category: "Cloud Storage", description: "Simple Storage Service containers configured for secure storage of document vaults, logs, and database seeds." },
    { key: "EC2", label: "AWS EC2", type: "tech", category: "Cloud Compute", description: "Elastic Compute Cloud system virtualizing secure OS instances to deploy live production APIs." },
    { key: "DEL", label: "Del", type: "system", span: 1 }
  ],
  [
    { key: "TAB", label: "Tab", type: "system", span: 1.5 },
    { key: "React", label: "React.js", type: "tech", category: "Frontend Frameworks", description: "Virtual DOM UI engine for rendering dynamic views and handling frontend states." },
    { key: "HTML", label: "HTML5", type: "tech", category: "Languages & Web", description: "Structural markup specifications formatting standard semantic DOM hierarchies." },
    { key: "CSS", label: "CSS3", type: "tech", category: "Languages & Web", description: "Styling standards, flexible page layouts, grids, media queries, and transition keys." },
    { key: "Node", label: "Node.js", type: "tech", category: "Backend Runtimes", description: "Asynchronous JavaScript event loops serving concurrent connections on server-side nodes." },
    { key: "Express", label: "Express", type: "tech", category: "Backend Runtimes", description: "Minimalist server routing engine running endpoints, middleware, and backend API routes." },
    { key: "Mongo", label: "MongoDB", type: "tech", category: "Databases & Queries", description: "Flexible schema storage hosting JSON documents in NoSQL setups." },
    { key: "MySQL", label: "MySQL", type: "tech", category: "Databases & Queries", description: "Relational database server orchestrating tables, indices, foreign relations, and atomic commits." },
    { key: "REST", label: "REST APIs", type: "tech", category: "Architecture Standards", description: "HTTP RESTful conventions designing secure endpoints and communication protocols." },
    { key: "Postman", label: "Postman", type: "tech", category: "Tools & Collaboration", description: "Testing desktop framework simulating endpoints, verifying JSON responses, and building APIs." },
    { key: "BACK", label: "Backspace", type: "system", span: 1.5 }
  ],
  [
    { key: "CAPS", label: "Caps Lock", type: "system", span: 1.75 },
    { key: "DSA", label: "DSA", type: "tech", category: "Computer Science", description: "Data Structures and Algorithms parsing computational paths and sorting data efficiently." },
    { key: "OOPs", label: "OOPs", type: "tech", category: "Computer Science", description: "Object-Oriented Programming paradigms: Inheritance, Encapsulation, Polymorphism, and Abstraction." },
    { key: "DBMS", label: "DBMS", type: "tech", category: "Computer Science", description: "Database management system algorithms, transactions, index caching, and logging schemas." },
    { key: "OS", label: "OS", type: "tech", category: "Computer Science", description: "Operating system principles tracking process schedules, threads, page tables, and file maps." },
    { key: "Networks", label: "Computer Networks", type: "tech", category: "Computer Science", description: "Networking configurations detailing sockets, TCP/UDP sockets, DNS, and IP stacks." },
    { key: "Bash", label: "Bash/Shell", type: "tech", category: "Infrastructure", description: "Shell scripting engines executing task lines and system automation." },
    { key: "ENTER", label: "Enter", type: "system", span: 2.25 }
  ]
];


const fallbackProjects = [
  {
    id: 1,
    Title: "ThejGPT : Conversational AI Platform",
    Description: "Built a production-style conversational AI platform featuring persistent chat sessions, modular REST APIs, secure backend architecture, and LLM-powered responses using the Gemini API.",
    Img: "/ThejGPT.jpg",
    Link: "https://github.com/Thej02/ThejGPT",
    Github: "https://github.com/Thej02/ThejGPT",
    TechStack: ["React", "Node.js", "MongoDB", "Express", "Gemini API"],
    Features: ["Persistent Chat Sessions", "Modular REST APIs", "Secure Backend Architecture", "Gemini LLM Responses"]
  },
  {
    id: 2,
    Title: "LunaFlow : Period & Wellness Companion",
    Description: "A secure full-stack menstrual wellness platform with intelligent period prediction, symptom tracking, mood journaling, personalized wellness insights, and interactive health analytics.",
    Img: "/LunaFlow.jpg",
    Link: "https://github.com/Thej02/LunaFlow",
    Github: "https://github.com/Thej02/LunaFlow",
    TechStack: ["React", "TypeScript", "Node.js", "MongoDB", "JWT", "Framer Motion"],
    Features: ["Intelligent Cycle Prediction", "Symptom Tracking & Mood Journaling", "Personalized Wellness Insights", "Interactive Analytics"]
  },
  {
    id: 3,
    Title: "SympCheck",
    Description: "Developed a secure, AI-powered healthcare triage application offering symptom analysis, SOS assistance, and location-based emergency support. Integrated Gemini API and Firebase for fast, multilingual responses.",
    Img: "/SympCheck.jpg",
    Link: "https://github.com/Thej02/SympCheck",
    Github: "https://github.com/Thej02/SympCheck",
    TechStack: ["Python", "Flask", "Azure", "React Native", "Gemini API"],
    Features: ["AI Triage Diagnostics", "Multilingual Support", "SOS Assistance", "Location-based Emergency Services"]
  },
  {
    id: 4,
    Title: "VoxAI",
    Description: "Built a voice-first multilingual e-commerce platform enabling shopping through natural voice interactions. Integrated Gemini API, Firebase, and Razorpay for an intelligent user experience.",
    Img: "/VoxAI.png",
    Link: "https://github.com/Thej02/VoxAI-VoiceMart",
    Github: "https://github.com/Thej02/VoxAI-VoiceMart",
    TechStack: ["JavaScript", "Firebase", "Gemini", "Razorpay"],
    Features: ["Voice Shopping Assistance", "Multilingual Voice Control", "Secure Razorpay Gateways", "Realtime Inventory Sync"]
  },
  {
    id: 5,
    Title: "Canara InfoBot",
    Description: "Developed a 24×7 AI-powered campus assistant to answer academic, admission, placement, and campus-related queries. Built with Gemini API and a responsive interface for real-time assistance across devices.",
    Img: "/CanaraInfoBot.png",
    Link: "https://github.com/Thej02/CanaraInfoMate-Bot",
    Github: "https://github.com/Thej02/CanaraInfoMate-Bot",
    TechStack: ["Gemini API", "HTML", "CSS", "JavaScript"],
    Features: ["24/7 Academic Assistance", "Responsive Mobile-First UI", "Campus Placement Q&A", "Realtime Admissions Guidance"]
  }
];

export default function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [activeKey, setActiveKey] = useState(null);
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllCertificates, setShowAllCertificates] = useState(false);
  const isMobile = window.innerWidth < 768;
  const initialItems = isMobile ? 4 : 6;

  useEffect(() => {
    AOS.init({
      once: false,
    });
  }, []);


  const fetchData = useCallback(async () => {
    try {
      // Mengambil data dari Supabase secara paralel
      const [projectsResponse, certificatesResponse] = await Promise.all([
        supabase.from("projects").select("*").order('id', { ascending: false }),
        supabase.from("certificates").select("*").order('id', { ascending: false }), 
      ]);

      // Error handling untuk setiap request
      if (projectsResponse.error) throw projectsResponse.error;
      if (certificatesResponse.error) throw certificatesResponse.error;

      // Supabase mengembalikan data dalam properti 'data'
      const projectData = projectsResponse.data || [];
      const certificateData = certificatesResponse.data || [];

      if (projectData.length === 0) {
        setProjects(fallbackProjects);
        localStorage.setItem("projects", JSON.stringify(fallbackProjects));
      } else {
        setProjects(projectData);
        localStorage.setItem("projects", JSON.stringify(projectData));
      }
      
      setCertificates(certificateData);
      localStorage.setItem("certificates", JSON.stringify(certificateData));
      
      // Dispatch custom event to notify other components (like About)
      window.dispatchEvent(new Event("portfolioDataUpdated"));
    } catch (error) {
      console.error("Error fetching data from Supabase:", error.message);
      // Serve fallbacks on error (e.g. database offline or unconfigured)
      setProjects(fallbackProjects);
      localStorage.setItem("projects", JSON.stringify(fallbackProjects));
      
      const mockCertificates = [];
      setCertificates(mockCertificates);
      localStorage.setItem("certificates", JSON.stringify(mockCertificates));
    }
  }, []);



  useEffect(() => {
    // Coba ambil dari localStorage dulu untuk laod lebih cepat
    const cachedProjects = localStorage.getItem('projects');
    const cachedCertificates = localStorage.getItem('certificates');

    if (cachedProjects && cachedCertificates) {
        setProjects(JSON.parse(cachedProjects));
        setCertificates(JSON.parse(cachedCertificates));
    }
    
    fetchData(); // Tetap panggil fetchData untuk sinkronisasi data terbaru
  }, [fetchData]);

  const toggleShowMore = useCallback((type) => {
    if (type === 'projects') {
      setShowAllProjects(prev => !prev);
    }
  }, []);

  const displayedProjects = showAllProjects ? projects : projects.slice(0, initialItems);

  return (
    <div className="w-full bg-transparent overflow-hidden">
      
      {/* Section 1: Tech Stack (Skills) */}
      <div className="md:px-[10%] px-[5%] pb-16 pt-16 sm:mt-0 mt-[3rem]" id="Skills">
        <div className="text-center pb-10" data-aos="fade-up" data-aos-duration="1000">
          <h2 className="inline-block text-3xl md:text-5xl font-bold text-center mx-auto text-pastel-text">
            Skills & Expertise
          </h2>
          <p className="text-pastel-muted max-w-2xl mx-auto text-sm md:text-base mt-2">
            Explore the core technologies, frameworks, databases, and architectural concepts I use to engineer backend microservices and full-stack software.
          </p>
        </div>

        <div className="container mx-auto pb-10 text-[#3A3A3A] px-2 sm:px-4 flex flex-col items-center">
          {/* Keyboard Instructions */}
          <p className="text-center text-pastel-muted text-xs md:text-sm mb-6 max-w-lg">
            ⌨️ Interactive Mechanical Keyboard: Hover over or tap any artisan keycap below to inspect my tech stack details and software tools!
          </p>

          {/* Keyboard Outer Shell Case */}
          <div 
            className="w-full max-w-[1000px] bg-[#FAF7F5] border-4 border-[#3A3A3A] rounded-[30px] p-6 shadow-[0_12px_24px_-5px_rgba(0,0,0,0.15)] overflow-x-auto scrollbar-thin select-none"
            data-aos="zoom-in"
            data-aos-duration="1000"
          >
            <div className="min-w-[850px] space-y-3.5">
              {keyboardRows.map((row, rowIndex) => (
                <div key={rowIndex} className="flex gap-2">
                  {row.map((k, keyIndex) => {
                    const isTech = k.type === "tech";
                    
                    // Layout key spans
                    let flexGrow = 1;
                    let minWidth = "60px";
                    if (k.span) {
                      flexGrow = k.span;
                      minWidth = `${k.span * 60}px`;
                    }

                    // Theme keycap colors
                    let keyBg = "bg-white";
                    if (k.key === "ESC") {
                      keyBg = "bg-[#B8E3D2] border-[#2E6B57]";
                    } else if (k.key === "ENTER") {
                      keyBg = "bg-[#C9B6E4] border-[#7F6B9E]";
                    } else if (!isTech) {
                      keyBg = "bg-[#EAE5DF] border-[#C3B8AC] text-slate-500";
                    } else {
                      keyBg = "bg-white hover:bg-gradient-to-r hover:from-pastel-primary/10 hover:to-pastel-tertiary/10";
                    }

                    return (
                      <div
                        key={keyIndex}
                        style={{ flexGrow, minWidth }}
                        className={`h-[56px] relative rounded-xl border-2 border-[#3A3A3A] font-bold text-sm transition-all duration-100 flex flex-col items-center justify-center cursor-pointer shadow-[0_4px_0_#3A3A3A] hover:shadow-[0_1px_0_#3A3A3A] hover:translate-y-[3px] active:scale-98 ${keyBg}`}
                        onMouseEnter={() => isTech && setActiveKey(k)}
                      >
                        {/* Keycap legend */}
                        <span className="text-[12px] md:text-[13px] tracking-wide text-pastel-text">
                          {k.key}
                        </span>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Keyboard Inspector Panel Card */}
          <div 
            className="w-full max-w-[1000px] mt-8 p-6 bg-pastel-card border border-pastel-border/60 rounded-2xl min-h-[140px] transition-all duration-300 shadow-sm relative overflow-hidden flex flex-col justify-center"
            data-aos="fade-up"
            data-aos-duration="800"
          >
            {/* Decorative LED Indicator dots */}
            <div className="absolute top-4 right-6 flex gap-2">
              <span className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${activeKey ? "bg-emerald-400 shadow-[0_0_8px_#34d399]" : "bg-slate-300"}`}></span>
              <span className="w-2.5 h-2.5 rounded-full bg-slate-300"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-slate-300"></span>
            </div>

            {activeKey ? (
              <div className="space-y-3 animate-fadeIn">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2.5">
                  <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider bg-pastel-primary/10 border border-pastel-primary/15 text-indigo-700 w-fit">
                    {activeKey.category}
                  </span>
                  <h4 className="text-xl font-bold text-pastel-text">
                    {activeKey.label}
                  </h4>
                </div>
                <p className="text-sm text-pastel-muted leading-relaxed">
                  {activeKey.description}
                </p>
              </div>
            ) : (
              <div className="text-center text-pastel-muted py-6 flex flex-col items-center gap-2">
                <span className="text-2xl animate-bounce">⌨️</span>
                <p className="text-sm font-medium">
                  Hover over any keycap on the mechanical keyboard to inspect my tech stack details!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Decorative Divider */}
      <div className="w-full flex justify-center py-6">
        <div className="w-[80%] h-[1px] bg-gradient-to-r from-transparent via-pastel-border to-transparent" />
      </div>

      {/* Section 2: Projects */}
      <div className="md:px-[10%] px-[5%] w-full pb-16 pt-16" id="Portofolio">
        <div className="text-center pb-10" data-aos="fade-up" data-aos-duration="1000">
          <h2 className="inline-block text-3xl md:text-5xl font-bold text-center mx-auto text-pastel-text">
            Featured Projects
          </h2>
          <p className="text-pastel-muted max-w-2xl mx-auto text-sm md:text-base mt-2">
            A curated showcase of applications and software highlights that I have designed, engineered, and deployed.
          </p>
        </div>

        <div className="container mx-auto flex justify-center items-center overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
            {displayedProjects.map((project, index) => (
              <div
                key={project.id || index}
                data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
              >
                <CardProject
                  Img={project.Img}
                  Title={project.Title}
                  Description={project.Description}
                  Link={project.Link}
                  id={project.id}
                  TechStack={project.TechStack}
                />
              </div>
            ))}
          </div>
        </div>

        {projects.length > initialItems && (
          <div className="mt-8 w-full flex justify-center">
            <ToggleButton
              onClick={() => toggleShowMore('projects')}
              isShowingMore={showAllProjects}
            />
          </div>
        )}
      </div>

    </div>
  );
}