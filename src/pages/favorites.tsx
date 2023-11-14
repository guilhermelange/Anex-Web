import AnimeImage from "@/components/AnimeImage";
import UserLayout from "@/components/layouts/UserLayout";
import LoadingScreen from "@/components/Loading";
import SEO from "@/components/SEO";
import { AnimeContext } from "@/context/AnimeContext";
import { AnimeCollectionDTO } from "@/interfaces/AnimeDTO";
import { Flex, Heading, SimpleGrid } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";

export default function Favorites() {
    const { collections, trendings, loadAll, loadingAll } = useContext(AnimeContext);
    const [filteredAnime, setFilteredAnime] = useState([] as AnimeCollectionDTO[]);
    let loadedData = false;

    useEffect(() => {
        if (!loadedData) {
            loadedData = true;
            loadAll();
        }
    }, [])

    useEffect(() => {
        let newFiltered: AnimeCollectionDTO[] = [];

        if (collections) {
            for (const collection of collections) {
                newFiltered = newFiltered.concat(collection.animes.filter(anime => anime.favorite))
            }
        }

        if (trendings) {
            newFiltered = newFiltered.concat(trendings.filter(trending => trending.favorite))
        }
        setFilteredAnime(newFiltered)
    }, [collections])

    return (
        <>
            <SEO title="Favoritos" />
            <UserLayout>
                <Flex direction="column" w={'full'} mt={5}>
                    <Heading mb={3} size={'md'}>Favoritos</Heading>
                    {loadingAll && <LoadingScreen></LoadingScreen>}
                    {!loadingAll &&
                        <SimpleGrid columns={{ base: 1, sm: 2, md: 4, lg: 6 }} spacing={6}>
                            {filteredAnime && filteredAnime.map((anime, index) => (
                                <AnimeImage key={anime.id} item={anime}></AnimeImage>
                            ))}
                        </SimpleGrid>}
                </Flex>
            </UserLayout>
        </>
    )
}