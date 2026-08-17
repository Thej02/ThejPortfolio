import React from "react";
import { Link } from "react-router-dom";
import { ExternalLink, ArrowRight } from "lucide-react";
import { toSlug } from "../utils/slug";

const CardProject = ({ Img, Title, Description, Link: ProjectLink, id, TechStack = [] }) => {
  const handleLiveDemo = (e) => {
    if (!ProjectLink) {
      console.log("ProjectLink kosong");
      e.preventDefault();
      alert("Live demo link is not available");
    }
  };

  const handleDetails = (e) => {
    if (!id) {
      console.log("ID kosong");
      e.preventDefault();
      alert("Project details are not available");
    }
  };

  return (
    <div className="group relative w-full">
      <div className="relative overflow-hidden rounded-xl bg-pastel-card backdrop-blur-lg border border-pastel-border shadow-md transition-all duration-300 hover:shadow-lg hover:shadow-pastel-primary/30">
        <div className="absolute inset-0 bg-gradient-to-br from-pastel-secondary/15 via-pastel-primary/10 to-pastel-tertiary/15 opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>

        <div className="relative p-5 z-10">
          <div className="relative overflow-hidden rounded-lg shadow-sm border border-pastel-border">
            <img
              src={Img}
              alt={Title}
              className="w-full h-full object-cover aspect-[16/8] transform group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Tech Stack under the project picture */}
          {TechStack && TechStack.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {TechStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 text-[11px] font-semibold bg-pastel-secondary/15 text-slate-700 border border-pastel-secondary/20 rounded-md"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          <div className="mt-4 space-y-3">
            <h3 className="text-xl font-bold text-pastel-text group-hover:text-purple-600 transition-colors duration-300">
              {Title}
            </h3>

            <p className="text-pastel-muted text-sm leading-relaxed line-clamp-2">
              {Description}
            </p>

            <div className="pt-4 flex items-center justify-between">
              {ProjectLink ? (
                <a
                  href={ProjectLink || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleLiveDemo}
                  className="inline-flex items-center space-x-2 text-indigo-600 hover:text-indigo-500 font-medium transition-colors duration-200"
                >
                  <span className="text-sm">Live Demo</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              ) : (
                <span className="text-pastel-muted/50 text-sm">
                  Demo Not Available
                </span>
              )}

              {id ? (
                <Link
                  to={`/project/${toSlug(Title)}`}
                  onClick={handleDetails}
                  className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/60 hover:bg-white text-pastel-text font-medium border border-pastel-border transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm focus:outline-none focus:ring-2 focus:ring-pastel-primary/50"
                >
                  <span className="text-sm">Details</span>
                  <ArrowRight className="w-4 h-4 text-pastel-muted" />
                </Link>
              ) : (
                <span className="text-pastel-muted/50 text-sm">
                  Details Not Available
                </span>
              )}
            </div>
          </div>

          <div className="absolute inset-0 border border-transparent group-hover:border-pastel-primary/30 rounded-xl transition-colors duration-300 -z-50"></div>
        </div>
      </div>
    </div>
  );
};

export default CardProject;
