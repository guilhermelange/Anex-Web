import GenreDTO from "./GenreDTO";
import AuthorDTO from "./AuthorDTO";
import SeasonDTO from "./SeasonDTO";

export default interface AnimeDTO {
    id: string;
    name: string;
    description: string;
    cover_file: string;
    image_file: string;
    start_year: number;
    favorite: boolean; 
    playlist_link: string | null;
    evaluation: boolean | null;
    genres?: GenreDTO[] | null;
    authors?: AuthorDTO[] | null;
    season: SeasonDTO[] | null;
    season_count: number;
    evaluation_media: number;
    open?: boolean;
}


export interface AnimeCollectionDTO {
    id: string;
    name: string;
    description: string;
    image_file: string;
    cover_file: string;
    start_year: number;
    season_count: number;
    evaluation_media: number;
    evaluation: boolean | null;
    favorite: boolean;
    progress: number;
}