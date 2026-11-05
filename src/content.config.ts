import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// One folder per project: src/content/projects/<project-name>/index.md plus its pictures.
// Image paths in the frontmatter are relative to that folder (e.g. ./cover.jpg); the build
// checks they exist and produces resized, compressed web versions automatically.
const courseSchema = z.object({code: z.string().optional(), name: z.string(), institution: z.enum(['dtu', 'tudelft', 'siemensfonden'])});

const projects = defineCollection({
  loader: glob({ pattern: '**/index.md', base: './src/content/projects' }),
  schema: ({ image }) => z.object({
    projectId: z.string(),
    title: z.string(),
    shortTitle: z.string(),
    description: z.string(),
    period: z.string().optional(),
    type: z.string(),
    team: z.boolean().default(false),
    // Label on the project cards; defaults to Group when team is true, otherwise Individual.
    collaboration: z.enum(['individual', 'group', 'team']).optional(),
    tags: z.array(z.string()),
    technologies: z.array(z.string()),
    featureOrder: z.number().optional(),
    order: z.number(),
    stage: z.enum(['case-study', 'overview']).default('overview'),
    visual: z.enum(['airfoil', 'engine', 'motor', 'aeroelastic', 'battery', 'mirror', 'audio', 'turbine', 'numerical', 'experiment', 'plasma', 'network', 'studio']),
    // fit: 'cover' crops a photo to fill the header; 'contain' shows a whole figure or diagram on a white panel.
    cover: z.object({src: image(), alt: z.string(), caption: z.string().optional(), fit: z.enum(['cover', 'contain']).default('cover')}).optional(),
    // stack: true puts an image in the same grid cell as the image before it (two wide, low images).
    // A gallery item is an image (src) or a video: one path under public/ (e.g. /videos/clip.mp4),
    // or several formats of the same clip, of which the browser plays the first it supports.
    gallery: z.array(z.object({src: image().optional(), video: z.union([z.string(), z.array(z.string())]).optional(), alt: z.string(), caption: z.string(), stack: z.boolean().optional()}).refine(g => g.src || g.video, 'A gallery item needs src or video')).default([]),
    // Optional gallery heading; defaults to "The work in pictures / Design. Build. Measure."
    // Course the project belonged to; shows the university logo with the course code and name.
    // A list of courses shows one badge per course.
    course: z.union([courseSchema, z.array(courseSchema)]).optional(),
    galleryLabel: z.string().optional(),
    galleryTitle: z.string().optional(),
    // Adds the gallery to the 'In this project' menu, named after galleryTitle.
    galleryInNav: z.boolean().optional(),
    // An interactive tool shown in the page text, where the markdown has <div data-tool-slot></div>.
    tool: z.enum(['piv-calculator']).optional(),
    documents: z.array(z.object({title: z.string(), href: z.string()})).default([]),
    results: z.array(z.object({label: z.string(), value: z.string(), context: z.string()})).default([]),
  }),
});

export const collections = { projects };
