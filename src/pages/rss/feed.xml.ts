import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { combineBlogAndReadingLog } from '@lib/postUtils';
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';

const parser = new MarkdownIt();

export async function get(context: any) {
    const blogEntries = await getCollection('blog');
    const readingLogs = await getCollection('readinglogs');

    const combinedPosts = combineBlogAndReadingLog(
        blogEntries,
        readingLogs
    );

    return rss({
        title: 'Keith Wagner',
        description: "I'm a software developer, gamer, geek, amateur hockey player, aspiring writer, and a whole lot more. I enjoy tech, baseball, hockey, sci-fi and plenty more.",
        site: context.site,
        items: combinedPosts.map((post) => ({
            title: post.title,
            pubDate: post.date,
            description: post.excerpt,
            link: post.link,
            content: sanitizeHtml(parser.render(post.content ?? '')),
        })),
    });
}