import {AnimeCollectionDTO} from "./AnimeDTO";

export default interface CollectionDTO {
    id: string;
    name: string;
    animes:  AnimeCollectionDTO[]
}