import {
    Box,
    Flex,
    SimpleGrid,
    Text,
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
                        {(filteredAnime) && <Text mb={2}>{filteredAnime.length > 0 ? 'Resultados obtidos' : 'Nenhum resultado obtido'} para <Text display={'inline'} fontWeight={'black'}>{query}</Text></Text>}
                        {filteredAnime &&
                        <SimpleGrid columns={{ base: 1, sm: 2, md: 4, lg: 6 }} spacing={6}>
                            {filteredAnime && filteredAnime.map((anime, index) => (
                                <AnimeImage key={anime.id} item={anime}></AnimeImage>
                            ))}
                        </SimpleGrid>}
                    </Flex>}
            </UserLayout>
        </>
    )
}