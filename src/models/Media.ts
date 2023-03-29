export interface Media {
    title: string;
    author?: string;
    cover: string;
    link?: string;
    system?: 'PC' | 'PS5' | 'PS4' | 'Xbox' | 'Nintendo Switch'
    dateWatched?: string;
    rating: number | null;
    thoughts: string | null;
    imageFolder: 'movies' | 'games' | 'books' | 'tv';
    finished?: 'yes' | 'no' | 'n/a';
}
