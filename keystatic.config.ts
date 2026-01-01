// keystatic.config.ts
import { config, fields, collection } from "@keystatic/core";

export default config({
  storage: {
    kind: "github",
    repo: {
      owner: "jspinerola",
      name: "portfolio",
    },
  },
  collections: {
    projects: collection({
      label: "Projects",
      slugField: "title",
      path: "src/content/projects/*", // Matches your Astro 'base'
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),

        description: fields.text({
          label: "Description",
          multiline: true,
        }),

        // Astro schema: z.string() -> Keystatic: fields.date() (saves as YYYY-MM-DD string)
        startDate: fields.date({
          label: "Start Date",
          validation: { isRequired: true },
        }),

        endDate: fields.date({ label: "End Date" }),

        tags: fields.array(fields.text({ label: "Tag" }), {
          label: "Tags",
          itemLabel: (props) => props.value,
        }),

        // Complex object array mapping
        collaborators: fields.array(
          fields.object({
            name: fields.text({ label: "Name" }),
            github: fields.url({ label: "GitHub Profile" }),
            role: fields.text({ label: "Role" }),
          }),
          {
            label: "Collaborators",
            itemLabel: (props) => props.fields.name.value,
          }
        ),

        // IMAGES: Configured to work with Astro's src/assets optimization
        thumbnailImage: fields.image({
          label: "Thumbnail Image",
          // Where the actual file is saved on disk:
          directory: "src/assets/projects",
          // What gets written to the markdown frontmatter (relative path):
          publicPath: "../../assets/projects/",
        }),

        heroImage: fields.image({
          label: "Hero Image",
          directory: "src/assets/projects",
          publicPath: "../../assets/projects/",
        }),

        githubLink: fields.url({ label: "GitHub Repo" }),
        liveLink: fields.url({ label: "Live Link" }),

        accentColor: fields.text({ label: "Accent Color (Hex)" }),

        // This is the actual markdown body editor
        content: fields.markdoc({
          label: "Content",
          extension: "md", // Ensures it saves as .md, not .mdoc
        }),
      },
    }),
  },
});
