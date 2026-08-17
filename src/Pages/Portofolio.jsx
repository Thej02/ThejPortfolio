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

// techCategories definition
const techCategories = [
  {
    title: "Backend & Cloud",
    iconComponent: Server,
    description: "Architecting high-performance server logic, building secure APIs, and managing cloud storage systems.",
    skills: [
      { name: "Node JS", icon: "nodejs.svg", level: "Expert", progress: 90 },
      { name: "Firebase", icon: "firebase.svg", level: "Intermediate", progress: 75 },
    ]
  },
  {
    title: "Frontend & Layout",
    iconComponent: Layout,
    description: "Designing responsive layouts, crafting premium interactive animations, and structural elements.",
    skills: [
      { name: "JavaScript", icon: "javascript.svg", level: "Expert", progress: 92 },
      { name: "ReactJS", icon: "reactjs.svg", level: "Advanced", progress: 85 },
      { name: "Tailwind CSS", icon: "tailwind.svg", level: "Advanced", progress: 85 },
      { name: "Material UI", icon: "MUI.svg", level: "Advanced", progress: 80 },
      { name: "Bootstrap", icon: "bootstrap.svg", level: "Intermediate", progress: 70 },
      { name: "HTML", icon: "html.svg", level: "Expert", progress: 95 },
      { name: "CSS", icon: "css.svg", level: "Advanced", progress: 85 },
    ]
  },
  {
    title: "Tools & Utilities",
    iconComponent: Terminal,
    description: "Leveraging static bundlers, content delivery hosting platforms, and customizable alert dialogs.",
    skills: [
      { name: "Vite", icon: "vite.svg", level: "Advanced", progress: 85 },
      { name: "Vercel", icon: "vercel.svg", level: "Advanced", progress: 80 },
      { name: "SweetAlert2", icon: "SweetAlert.svg", level: "Advanced", progress: 80 },
    ]
  }
];

export default function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = useState(0);
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

      setProjects(projectData);
      setCertificates(certificateData);

      // Store in localStorage (fungsionalitas ini tetap dipertahankan)
      localStorage.setItem("projects", JSON.stringify(projectData));
      localStorage.setItem("certificates", JSON.stringify(certificateData));
      
      // Dispatch custom event to notify other components (like About)
      window.dispatchEvent(new Event("portfolioDataUpdated"));
    } catch (error) {
      console.error("Error fetching data from Supabase:", error.message);
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
          Explore my journey through projects, certifications, and technical expertise. 
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
              icon={<Award className="mb-2 w-5 h-5 transition-all duration-300" />}
              label="Certificates"
              {...a11yProps(1)}
            />
            <Tab
              icon={<Boxes className="mb-2 w-5 h-5 transition-all duration-300" />}
              label="Tech Stack"
              {...a11yProps(2)}
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
            <div className="container mx-auto flex justify-center items-center overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3 md:gap-5 gap-4">
                {displayedCertificates.map((certificate, index) => (
                  <div
                    key={certificate.id || index}
                    data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                    data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                  >
                    <Certificate ImgSertif={certificate.Img} />
                  </div>
                ))}
              </div>
            </div>
            {certificates.length > initialItems && (
              <div className="mt-6 w-full flex justify-start">
                <ToggleButton
                  onClick={() => toggleShowMore('certificates')}
                  isShowingMore={showAllCertificates}
                />
              </div>
            )}
          </TabPanel>

          <TabPanel value={value} index={2} dir={theme.direction}>
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