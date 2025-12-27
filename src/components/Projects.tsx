import React, { useEffect, useMemo, useState } from "react";
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
      const tags = new URLSearchParams(window.location.search).getAll("tags");
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

  return (
    <>
      <div className="search-header flex flex-col md:flex-row gap-4 md:gap-12 mb-8">
        <div className="flex-1 flex flex-col gap-2">
          <Label className="font-heading">Search Projects</Label>
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter projects..."
          />
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <Label className="font-heading">Filter by Tags</Label>
          <MultiSelect values={selectedTags} onValuesChange={setSelectedTags}>
            <MultiSelectTrigger className="w-full">
              <MultiSelectValue
                placeholder="Select frameworks..."
                clickToRemove={true}
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project, index) => (
          <ProjectCard
            // key={index}
            projectTitle={project.data.title}
            projectDescription={project.data.description}
            heroImage={project.data.heroImage}
            link={"/projects/" + project.id}
            accentColor={project.data.accentColor}
          />
        ))}
      </div>
    </>
  );
}

export default Projects;
