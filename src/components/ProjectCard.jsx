import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import LinkButton from "./LinkButton";
import Tag from "./Tag";

function ProjectCard({
  projectTitle,
  projectDescription,
  heroImage,
  link,
  accentColor,
  tags,
}) {
  return (
    <div className="project-card opacity-0">
      <Card
        className={`
      group relative overflow-hidden rounded-xl h-full pt-0 justify-between
      transition-all duration-300 ease-out hover:scale-[1.02]
    `}
      >
        <div
          className="z-0 absolute inset-x-0 bottom-0 h-1/2 pointer-events-none opacity-0 group-hover:opacity-20 transition-opacity duration-300"
          style={{
            background: `linear-gradient(to top, ${accentColor}, transparent)`,
          }}
        ></div>
        <div className="relative z-10">
          {heroImage && (
            <img
              src={heroImage}
              alt={`${projectTitle} Hero Image`}
              className="w-full h-48 object-cover rounded-md "
              style={{ borderColor: accentColor }}
            />
          )}
          <div
            className="text-center pt-4 border-t-2"
            style={{ borderColor: accentColor }}
          >
            <CardContent>
              <CardTitle className="text-2xl font-extrabold font-heading">
                {projectTitle}
              </CardTitle>
              <ul className="flex my-2 space-x-2 flex-wrap w-full justify-center">
                {tags?.slice(0, 4).map((tech, index) => (
                  <a
                    key={tech}
                    title={`View All ${tech} projects`}
                    href={`/projects?tags=${encodeURIComponent(tech)}`}
                  >
                    <Tag title={tech} />
                  </a>
                ))}
                {tags && tags.length > 4 && (
                  <Tag title={`+${tags.length - 4} more`} />
                )}
              </ul>
              <CardDescription>{projectDescription}</CardDescription>
            </CardContent>
          </div>
        </div>
        <CardFooter className="z-10">
          <LinkButton className="btn w-full" href={link}>
            View Project
          </LinkButton>
        </CardFooter>
      </Card>
    </div>
  );
}

export default ProjectCard;
