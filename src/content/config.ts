import { z, defineCollection } from 'astro:content';

const BlogPostCollection = defineCollection({
    schema: z.object({
        title: z.string(),
        date: z.string().transform(str => new Date(str)),
        tags: z.array(z.string()),
        commentIssueNumber: z.number().optional(),
        urlSlug: z.string().optional(),
        isRssOnly: z.boolean().optional().default(false),
        excerpt: z.string().optional(),
    }),
});


const ReadingLogCollection = defineCollection({
    schema: z.object({
        title: z.string(),
        date: z.string().transform(str => new Date(str)),
        tags: z.array(z.string()),
        commentIssueNumber: z.number().optional(),
        id: z.number(),
    }),
});

export const collections = {
    'blog': BlogPostCollection,
    'readinglogs': ReadingLogCollection,
  };