import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { getPermalink, sortPosts, getPostExcerpt } from '@lib/postUtils';
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';

const parser = new MarkdownIt();

export async function get(context: any) {
    const blogEntries = await getCollection('blog');
    const posts = sortPosts(blogEntries);

    return rss({
        title: 'Keith Wagner',
        description: "I'm a software developer, gamer, geek, amateur hockey player, aspiring writer, and a whole lot more. I enjoy tech, baseball, hockey, sci-fi and plenty more.",
        site: context.site,
        items: posts.map((post) => ({
            title: post.data.title,
            pubDate: post.data.date,
            description: getPostExcerpt(post.body),
            link: getPermalink(post, true),
            content: sanitizeHtml(parser.render(post.body ?? '')),
        })),
    });
}
