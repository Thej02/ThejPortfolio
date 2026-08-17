import React, { useEffect, useState, useCallback } from "react";

import { supabase } from "../supabase"; 

import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CardProject from "../components/CardProject";
import TechStackIcon from "../components/TechStackIcon";
import AOS from "aos";
import "aos/dist/aos.css";
import { Code, Award, Boxes, Server, Layout, Terminal } from "lucide-react";


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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const toggleShowMore = useCallback((type) => {
    if (type === 'projects') {
      setShowAllProjects(prev => !prev);
    } else {
      setShowAllCertificates(prev => !prev);
    }
  }, []);

  const displayedProjects = showAllProjects ? projects : projects.slice(0, initialItems);
  const displayedCertificates = showAllCertificates ? certificates : certificates.slice(0, initialItems);

  // Sisa dari komponen (return statement) tidak ada perubahan
  return (
    <div className="md:px-[10%] px-[5%] w-full sm:mt-0 mt-[3rem] bg-transparent overflow-hidden" id="Portofolio">
      {/* Header section - unchanged */}
      <div className="text-center pb-10" data-aos="fade-up" data-aos-duration="1000">
        <h2 className="inline-block text-3xl md:text-5xl font-bold text-center mx-auto text-pastel-text">
          Portfolio Showcase
        </h2>
        <p className="text-pastel-muted max-w-2xl mx-auto text-sm md:text-base mt-2">
          Explore my journey through projects and technical expertise. 
          Each section represents a milestone in my continuous learning path.
        </p>
      </div>

      <Box sx={{ width: "100%" }}>
        {/* AppBar and Tabs section - unchanged */}
        <AppBar
          position="static"
          elevation={0}
          sx={{
            bgcolor: "transparent",
            border: "1px solid rgba(58, 58, 58, 0.15)",
            borderRadius: "20px",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "linear-gradient(180deg, rgba(201, 182, 228, 0.05) 0%, rgba(184, 227, 214, 0.05) 100%)",
              backdropFilter: "blur(10px)",
              zIndex: 0,
            },
          }}
          className="md:px-4"
        >
          {/* Tabs remain unchanged */}
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            variant="fullWidth"
            sx={{
              minHeight: "70px",
              "& .MuiTab-root": {
                fontSize: { xs: "0.9rem", md: "1rem" },
                fontWeight: "600",
                color: "#3A3A3A",
                textTransform: "none",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                padding: "20px 0",
                zIndex: 1,
                margin: "8px",
                borderRadius: "12px",
                "&:hover": {
                  color: "#3A3A3A",
                  backgroundColor: "rgba(201, 182, 228, 0.15)",
                  transform: "translateY(-2px)",
                  "& .lucide": {
                    transform: "scale(1.1) rotate(5deg)",
                  },
                },
                "&.Mui-selected": {
                  color: "#3A3A3A",
                  background: "linear-gradient(135deg, rgba(201, 182, 228, 0.25), rgba(184, 227, 214, 0.25))",
                  boxShadow: "0 4px 15px -3px rgba(201, 182, 228, 0.2)",
                  "& .lucide": {
                    color: "#C9B6E4",
                  },
                },
              },
              "& .MuiTabs-indicator": {
                height: 0,
              },
              "& .MuiTabs-flexContainer": {
                gap: "8px",
              },
            }}
          >
            <Tab
              icon={<Code className="mb-2 w-5 h-5 transition-all duration-300" />}
              label="Projects"
              {...a11yProps(0)}
            />
            <Tab
              icon={<Boxes className="mb-2 w-5 h-5 transition-all duration-300" />}
              label="Tech Stack"
              {...a11yProps(1)}
            />
          </Tabs>
        </AppBar>

        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={setValue}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-5">
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
              <div className="mt-6 w-full flex justify-start">
                <ToggleButton
                  onClick={() => toggleShowMore('projects')}
                  isShowingMore={showAllProjects}
                />
              </div>
            )}
          </TabPanel>

          <TabPanel value={value} index={1} dir={theme.direction}>
            <div className="container mx-auto pb-[5%] text-[#3A3A3A] px-2 sm:px-4">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {techCategories.map((category, catIndex) => {
                  const CategoryIcon = category.iconComponent;
                  return (
                    <div
                      key={catIndex}
                      data-aos="fade-up"
                      data-aos-duration="1000"
                      data-aos-delay={catIndex * 150}
                      className="bg-pastel-card border border-pastel-border/60 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-between"
                    >
                      <div>
                        {/* Category Header */}
                        <div className="flex items-center gap-3.5 mb-4">
                          <div className="p-3 rounded-2xl bg-pastel-primary/10 border border-pastel-primary/15 text-pastel-primary">
                            <CategoryIcon className="w-6 h-6" />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-pastel-text">{category.title}</h3>
                            <p className="text-[0.7rem] uppercase tracking-wider text-pastel-primary font-bold">Category</p>
                          </div>
                        </div>
                        <p className="text-xs text-pastel-muted mb-6 leading-relaxed">
                          {category.description}
                        </p>
 
                        {/* Skills List */}
                        <div className="space-y-5">
                          {category.skills.map((skill, skillIndex) => (
                            <div key={skillIndex} className="group space-y-2">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2.5">
                                  <img
                                    src={skill.icon}
                                    alt={`${skill.name} icon`}
                                    className="w-5 h-5 object-contain transform group-hover:scale-110 transition-transform duration-300"
                                  />
                                  <span className="text-sm font-bold text-pastel-text">{skill.name}</span>
                                </div>
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-pastel-secondary/15 text-indigo-700 border border-pastel-secondary/20">
                                  {skill.level}
                                </span>
                              </div>
                              {/* Custom Interactive Progress Bar */}
                              <div className="h-2 w-full bg-white/60 border border-pastel-border rounded-full overflow-hidden shadow-inner">
                                <div
                                  className="h-full rounded-full bg-gradient-to-r from-pastel-primary to-pastel-tertiary transition-all duration-1000 ease-out origin-left"
                                  style={{ width: `${skill.progress}%` }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </TabPanel>
        </SwipeableViews>
      </Box>
    </div>
  );
}