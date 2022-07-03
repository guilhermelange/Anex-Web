import EpisodeDTO from "./EpisodeDTO";

export default interface SeasonDTO {
    number: number;
    name: string;
    description: string; 
    episode: EpisodeDTO[]
}