import React from "react";
import ProjectCard from "./ProjectCard.jsx";
import type { CollectionEntry } from "astro:content";

interface ProjectsProps {
  projects: CollectionEntry<"projects">[];
}

function Projects({ projects }: ProjectsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project, index) => (
        <ProjectCard
          // key={index}
          projectTitle={project.data.title}
          projectDescription={project.data.description}
          heroImage={project.data.heroImage}
          link={project.data.liveLink || project.data.githubLink}
          accentColor={project.data.accentColor}
        />
      ))}
    </div>
  );
}

export default Projects;
