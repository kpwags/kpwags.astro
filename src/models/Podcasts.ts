export interface Podcast {
    name: string,
    link: string,
    artwork?: string|null,
}

export interface PodcastCategory {
    name: string,
    podcasts: Podcast[],
}
