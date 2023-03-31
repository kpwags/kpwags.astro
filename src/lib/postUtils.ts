import type { CollectionEntry } from "astro:content";
// @ts-expect-error
import markdown from '@lib/drawdown';
import type { CombinedPost } from "src/models/CombinedPost";

export const calculateReadingTime = (content: string): number => {
    const wordCount = content.split(' ').length - 1;
    let readingTime = Math.round(wordCount / 200);

    if (readingTime === 0) {
        readingTime = 1;
    }

    return readingTime;
}

const generateSlug = (tag: string): string => tag
    .toLowerCase()
    .replace(/\s/g, '-')
    .replaceAll('.', '')
    .replaceAll("'", '')
    .replaceAll('?', '');

export const generateTagUrl = (tag: string): string => {
    switch (tag.toUpperCase()) {
        case '.NET':
            return 'dotnet';
        case 'C#':
            return 'csharp';
        case 'F#':
            return 'fsharp';
        default:
            return generateSlug(tag);
    }
};

export const sortPosts = (posts: CollectionEntry<"blog">[]): CollectionEntry<"blog">[] => posts.sort((a: CollectionEntry<"blog">, b: CollectionEntry<"blog">) => {
    if (a.data.date < b.data.date) {
        return 1;
    }
    return -1;
});

export const sortReadingLogs = (posts: CollectionEntry<"readinglogs">[]): CollectionEntry<"readinglogs">[] => posts.sort((a: CollectionEntry<"readinglogs">, b: CollectionEntry<"readinglogs">) => {
    if (a.data.date < b.data.date) {
        return 1;
    }
    return -1;
});

export const sortAllPosts = (posts: CombinedPost[]): CombinedPost[] => posts.sort((a: CombinedPost, b: CombinedPost) => {
    if (a.date < b.date) {
        return 1;
    }
    return -1;
});

export const getPostExcerpt = (entry: string): string => {
    const paragraphs = entry.split('\n');

    let excerpt = paragraphs.filter((p) => p.trim().length > 0 && !p.trim().startsWith('import'))[0];

    excerpt = markdown(excerpt);

    return excerpt.replace('<p>', '').replace('</p>', '');
};

export const getPermalink = (post: CollectionEntry<"blog">, includeRootUrl = false): string => {
    const rootUrl = includeRootUrl ? 'https://kpwags.com' : '';
    const year = post.data.date.getFullYear();
    const month = String(post.data.date.getMonth() + 1).padStart(2, '0');
    const day = String(post.data.date.getDate() + 1).padStart(2, '0');

    return `${rootUrl}/posts/${year}/${month}/${day}/${post.data.urlSlug || post.slug}`
};

export const combineBlogAndReadingLog = (blogEntries: CollectionEntry<"blog">[], readingLogs: CollectionEntry<"readinglogs">[]): CombinedPost[] => {
    return sortAllPosts([
        ...blogEntries.map((post) => ({
            title: post.data.title,
            link: getPermalink(post),
            date: post.data.date,
            tags: post.data.tags,
            excerpt: getPostExcerpt(post.body),
            content: post.body,
        })),
        ...readingLogs.map((log) => ({
            title: log.data.title,
            link: `/reading-log/${log.data.id}`,
            date: log.data.date,
            tags: log.data.tags,
            excerpt: getPostExcerpt(log.body),
            content: log.body,
        })),
    ]);
};

export const getUniqueTags = (blogEntries: CollectionEntry<"blog">[], readingLogs: CollectionEntry<"readinglogs">[]): { name: string; url: string }[] => {
    let tagArray: { name: string; url: string }[] = [];

    blogEntries.forEach((blog) => {
        blog.data.tags.forEach((tag) => {
            tagArray.push({ name: tag, url: generateTagUrl(tag) });
        });
    });

    readingLogs.forEach((log) => {
        log.data.tags.forEach((tag) => {
            tagArray.push({ name: tag, url: generateTagUrl(tag) });
        });
    });

    const uniqueTagUrls = [...new Set(tagArray.map((t) => t.url))];

    const uniqueTags = uniqueTagUrls.map((url) => ({
        name: tagArray.find((tag) => tag.url === url)?.name ?? '',
        url,
    }));

    return uniqueTags;
}

export const getPageCount = (posts: any[], perPage: number): number => Math.ceil(posts.length / perPage);
