import type { Media } from "./Media";

export interface VideoGame extends Media {
    finished: 'yes' | 'no' | 'n/a';
}

export interface VideoGames {
    lastUpdate: string;
    current: Media[];
    played: Media[];
}
