import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";
import { api } from '@/services/api'
import CollectionDTO from "@/interfaces/CollectionDTO";
import AnimeDTO, { AnimeCollectionDTO } from "@/interfaces/AnimeDTO";
import { apiResources } from "@/services/api.contants";

interface AnimeProviderProps {
    children: ReactNode;
}

interface AnimeContextType {
    loadAll: () => Promise<void>;
    loadAnime: (animeId: string) => Promise<void>;
    handleSetFavorite: () => Promise<void>;
    handleEvaluation: (value: boolean) => Promise<void>;
    anime: AnimeDTO | null;
    collections: CollectionDTO[];
    trendings: AnimeCollectionDTO[];
    loadingAnime: boolean;
}

export const AnimeContext = createContext({} as AnimeContextType)

export function AnimeProvider({ children }: AnimeProviderProps) {
    const [collections, setCollections] = useState([]);
    const [trendings, setTrendings] = useState([]);
    const [anime, setAnime] = useState({} as AnimeDTO);
    const [loadingAnime, setLoadingAnime] = useState(false);
    const [currentAnime, setCurrentAnime] = useState('');

    async function loadAll() {
        const responsedata = await api.get(apiResources.COLLECTION);
        const collections = responsedata.data;
        const trendingCollection = collections.shift()
        const trendings = trendingCollection.animes

        trendings[0].progress = 1
        setCollections(collections);
        setTrendings(trendings);
    }

    async function loadAnime(animeId: string) {
        setLoadingAnime(true);
        const responsedata = await api.get(`${apiResources.ANIMES}/${animeId}`);
        const Anime: AnimeDTO = responsedata.data;
        setAnime(Anime);
        setLoadingAnime(false);
    }

    async function handleSetFavorite() {
        const favoriteBoolean = !anime.favorite
        const body = { favorite: favoriteBoolean }
        const responsedata = await api.put(`${apiResources.ANIMES}/${anime?.id}`, body);
        if (responsedata.status === 200) {
            const newAnime = { ...anime }
            newAnime.favorite = favoriteBoolean
            setAnime(newAnime)
        }
    }

    async function handleEvaluation(value: boolean) {
        const body = { evaluation: value }
        const responsedata = await api.put(`${apiResources.ANIMES}/${anime?.id}`, body);
        if (responsedata.status === 200) {
            const newAnime = { ...anime }
            newAnime.evaluation = value
            setAnime(newAnime)
        }
    }

    return (
        <AnimeContext.Provider value={{ loadingAnime, loadAll, collections, trendings, loadAnime, anime, handleSetFavorite, handleEvaluation}}>
            {children}
        </AnimeContext.Provider>
    )
}