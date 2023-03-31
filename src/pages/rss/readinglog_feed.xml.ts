import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { getPermalink, getPostExcerpt, sortReadingLogs } from '@lib/postUtils';
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';

const parser = new MarkdownIt();

export async function get(context: any) {
    const readingLogs = await getCollection('readinglogs');
    const logs = sortReadingLogs(readingLogs);

    return rss({
        title: 'Keith Wagner',
        description: "I'm a software developer, gamer, geek, amateur hockey player, aspiring writer, and a whole lot more. I enjoy tech, baseball, hockey, sci-fi and plenty more.",
        site: context.site,
        items: logs.map((log) => ({
            title: log.data.title,
            pubDate: log.data.date,
            description: getPostExcerpt(log.body),
            link: `https://kpwags.com/reading-log/${log.data.id}`,
            content: sanitizeHtml(parser.render(log.body ?? '')),
        })),
    });
}
