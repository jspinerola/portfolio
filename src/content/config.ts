import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const projects = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/content/projects",
  }),

  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    publishDate: z.coerce.date(),
    tags: z.enum(["tech", "life", "travel", "food"]).array().optional(),
    thumbnailImage: z.string().optional(),
    heroImage: z.string().optional(),
    githubLink: z.string().url().optional(),
    liveLink: z.string().url().optional(),
  }),
});

export const collections = { projects };
