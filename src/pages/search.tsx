import {
    Box,
    Flex,
} from "@chakra-ui/react";
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from "react";
import SEO from "@/components/SEO";
import { AnimeCollectionDTO } from "@/interfaces/AnimeDTO";
import UserLayout from "@/components/layouts/UserLayout";
import AnimeImage from "@/components/AnimeImage";
import { AnimeContext } from "@/context/AnimeContext";
import LoadingScreen from "@/components/Loading";

export default function Search() {
    const { collections, trendings, loadAll, loadingAll } = useContext(AnimeContext);
    const [filteredAnime, setFilteredAnime] = useState([] as AnimeCollectionDTO[]);
    const router = useRouter();
    const [query, setQuery] = useState('' as string);
    let loadedData = false;

    useEffect(() => {
        if (!loadedData) {
            loadedData = true;
            loadAll();
        }
    }, [])

    useEffect(() => {
        setQuery(String(router.query.q));
    }, [router.query.q])

    useEffect(() => {
        const stringToSearch = String(query).toLowerCase();
        let newFiltered: AnimeCollectionDTO[] = [];

        if (collections) {
            for (const collection of collections) {
                newFiltered = newFiltered.concat(collection.animes.filter(anime => anime.name.toLowerCase().includes(stringToSearch)))
            }
        }

        if (trendings) {
            newFiltered = newFiltered.concat(trendings.filter(trending => trending.name.toLowerCase().includes(stringToSearch)))
        }
        setFilteredAnime(newFiltered)
    }, [query])


    return (
        <>
            <SEO title="Pesquisa" />
            <UserLayout queryString={query}>
                {loadingAll && <LoadingScreen></LoadingScreen>}
                {!loadingAll &&
                    <Flex direction="column" w={'full'} mt={5}>
                        {(filteredAnime) && <h6>{
                            filteredAnime.length > 0 ? 'Resultados obtidos' : 'Nenhum resultado obtido'
                        } para "<strong>{query}"</strong> </h6>}
                        <Flex display={'block'} gap={2} h={'full'}>
                            {filteredAnime && filteredAnime.map((anime, index) => (
                                <Box key={index} display={'inline-block'} px={1} py={4}>
                                    <AnimeImage key={anime.id} item={anime}></AnimeImage>
                                </Box>
                            ))}
                        </Flex>
                    </Flex>}
            </UserLayout>
        </>
    )
}