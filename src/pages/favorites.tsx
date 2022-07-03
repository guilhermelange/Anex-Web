import AnimeImage from "@/components/AnimeImage";
import UserLayout from "@/components/layouts/UserLayout";
import SEO from "@/components/SEO";
import { AnimeContext } from "@/context/AnimeContext";
import { AnimeCollectionDTO } from "@/interfaces/AnimeDTO";
import { Box, Flex, Heading } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";

export default function Favorites() {
    const { collections, trendings, loadAll } = useContext(AnimeContext);
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
                    <Flex display={'block'} gap={2} h={'full'}>
                        {filteredAnime && filteredAnime.map((anime, index) => (
                            <Box key={index} display={'inline-block'} px={1} py={4}>
                                <AnimeImage key={anime.id} item={anime}></AnimeImage>
                            </Box>
                        ))}
                    </Flex>
                </Flex>
            </UserLayout>
        </>
    )
}