import UserLayout from "@/components/layouts/UserLayout";
import SEO from "@/components/SEO";
import { Box, Flex, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import FilterOptions from "@/enum/FilterOptions";
import { api } from "@/services/api";
import { AnimeCollectionDTO } from "@/interfaces/AnimeDTO";
import CollectionDTO from "@/interfaces/CollectionDTO";
import AnimeImage from "@/components/AnimeImage";

export default function Favorites() {
    const router = useRouter();
    const [description, setDescription] = useState('');
    const [filteredAnimes, setFilteredAnimes] = useState([] as AnimeCollectionDTO[])
    let loadedData = false;

    useEffect(() => {
        const { filter } = router.query
        const filterString = String(filter);
        if (filterString) {
            switch (filterString) {
                case FilterOptions.animes:
                    setDescription('Top Animes')
                    break;

                case FilterOptions.playlists:
                    setDescription('Top Playlists')
                    break;
            }
        }

        
        if (filterString) {
            if (!loadedData) {
                loadedData = true;
                sendRequestTop(filterString);
            }
            

        }
    }, [router.query.filter])

    async function sendRequestTop(filter: string) {
        let newFiltered : AnimeCollectionDTO[] = [];
        const response = await api.get(`collection/${filter}`)
        const collections: CollectionDTO[] = response.data;
        if (collections) {
            for (const collection of collections) {
                newFiltered = newFiltered.concat(collection.animes)
            }
        }
        setFilteredAnimes(newFiltered);
    }

    return (
        <>
            <SEO title="Favoritos" />
            <UserLayout>
                <Flex direction="column" w={'full'} mt={5}>
                    <Heading mb={3} size={'md'}>{description}</Heading>
                    <Flex display={'block'} gap={2} h={'full'}>
                        {filteredAnimes && filteredAnimes.map((anime, index) => (
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