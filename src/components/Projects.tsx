import React, { useEffect, useMemo, useRef, useState } from "react";
import ProjectCard from "./ProjectCard.jsx";
import type { CollectionEntry } from "astro:content";
import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectGroup,
  MultiSelectItem,
  MultiSelectTrigger,
  MultiSelectValue,
} from "@/components/ui/multi-select";
import { Label } from "./ui/label.js";
import { Input } from "./ui/input.js";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface ProjectsProps {
  projects: CollectionEntry<"projects">[];
  allTags: string[];
}

function Projects({ projects, allTags }: ProjectsProps) {
  const [search, setSearch] = useState(() => {
    if (typeof window !== "undefined") {
      // gets params if it's there
      return new URLSearchParams(window.location.search).get("q") || "";
    }
    // otherwise, just set to empty initially
    return "";
  });

  const [selectedTags, setSelectedTags] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tagsParam = params.get("tags");
      if (tagsParam) {
        return tagsParam
          .split(",")
          .map((tag) => decodeURIComponent(tag.trim()));
      }
      // Fallback to getAll for legacy support
      const tags = params.getAll("tags");
      return tags;
    }
    return [];
  });

  const filteredProjects = useMemo(() => {
    // 1. searching logic
    return projects.filter((project) => {
      const matchesSearch = project.data.title
        .toLowerCase()
        .includes(search.toLowerCase());

      // 2. filtering logic
      if (selectedTags.length === 0) {
        return matchesSearch;
      }

      const matchesTags = selectedTags.some((tag) =>
        project.data.tags?.includes(tag)
      );

      // if both search and tags match, return true
      return matchesSearch && matchesTags;
    });
  }, [projects, search, selectedTags]);

  // sync url params
  useEffect(() => {
    // debounced for 300ms
    const timer = setTimeout(() => {
      const params = new URLSearchParams();

      if (search) {
        params.set("q", search);
      }

      if (selectedTags.length > 0) {
        params.set("tags", selectedTags.join(","));
      }

      const newUrl = `${window.location.pathname}?${params.toString()}`;
      window.history.replaceState({}, "", newUrl);
    }, 300);

    return () => clearTimeout(timer);
  }, [search, selectedTags]);

  // animation for project cards
  gsap.registerPlugin(useGSAP);

  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useGSAP(
    () => {
      if (projects.length === 0) return;

      const cards = gsap.utils.toArray(".project-card");
      console.log("Animating project cards:", cards);
      if (hasAnimated.current) {
        gsap.set(cards, { autoAlpha: 1, y: 0 });
        return;
      }

      gsap.to(cards, {
        opacity: 1,
        y: 0,
        startAt: { opacity: 0, y: 20 },
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out",
      });

      hasAnimated.current = true;
    },
    {
      scope: containerRef,
      dependencies: [filteredProjects],
    }
  );

  return (
    <>
      <div className="search-header mb-4">
        <div className="flex flex-col md:flex-row gap-4 md:gap-12 mb-4  h-full">
          <div className="flex-1 flex flex-col gap-2">
            <Label className="font-heading">Search Projects</Label>
            <Input
              className="h-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter projects..."
            />
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <Label className="font-heading">Filter by Tags</Label>
            <MultiSelect values={selectedTags} onValuesChange={setSelectedTags}>
              <MultiSelectTrigger
                className="w-full h-10"
                aria-label="Select Tags"
              >
                <MultiSelectValue
                  placeholder="Select Tags..."
                  clickToRemove={true}
                  overflowBehavior={"wrap"}
                />
              </MultiSelectTrigger>
              <MultiSelectContent>
                <MultiSelectGroup>
                  {allTags.map((tag) => (
                    <MultiSelectItem key={tag} value={tag}>
                      {tag}
                    </MultiSelectItem>
                  ))}
                </MultiSelectGroup>
              </MultiSelectContent>
            </MultiSelect>
          </div>
        </div>
        <span className="text-sm text-secondary-foreground font-heading">
          {filteredProjects.length} projects found{" "}
          {selectedTags.length > 0 || search ? `with ` : ""}
          {search && (
            <>
              keywords matching <strong>"{search}"</strong>
            </>
          )}
          {search && selectedTags.length > 0 && " and "}
          {selectedTags.length > 0 && (
            <>
              tags{" "}
              <strong>
                {selectedTags.map((tag, i) => (
                  <React.Fragment key={tag}>
                    "{tag}"{i < selectedTags.length - 1 ? ", " : ""}
                  </React.Fragment>
                ))}
              </strong>
            </>
          )}
        </span>
      </div>
      <div
        ref={containerRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredProjects.map((project, index) => (
          <ProjectCard
            projectTitle={project.data.title}
            projectDescription={project.data.description}
            heroImage={project.data.heroImage?.src}
            link={"/projects/" + project.id}
            accentColor={project.data.accentColor}
            tags={project.data.tags}
          />
        ))}
      </div>
    </>
  );
}

export default Projects;
