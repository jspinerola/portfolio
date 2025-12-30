import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const projects = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/content/projects",
  }),

  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().optional(),
      startDate: z.date(),
      endDate: z.date().optional(),
      tags: z.string().array().optional(),
      collaborators: z
        .array(
          z.object({
            name: z.string(),
            github: z.string().url().optional(),
            role: z.string().optional(),
          })
        )
        .optional(),
      thumbnailImage: image().optional(),
      heroImage: image().optional(),
      githubLink: z.string().url().optional(),
      liveLink: z.string().url().optional(),
      accentColor: z.string().optional(),
    }),
});

export const collections = { projects };
