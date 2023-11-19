import { AnimeContext } from "@/context/AnimeContext";
import { Box, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import SeasonDTO from "@/interfaces/SeasonDTO";
import EpisodeDTO from "@/interfaces/EpisodeDTO";
import { MdArrowBack } from "react-icons/md";

export default function Watch() {
    const { loadAnime, anime } = useContext(AnimeContext);
    const { query: { anime: animeId,  season: seasonNumber, episode: episodeNumber } } = useRouter();
    // const [ season, setSeason ] = useState({} as SeasonDTO);
    const [ episode, setEpisode ] = useState({} as EpisodeDTO);

    useEffect(() => {
        if (animeId) {
            loadAnime(String(animeId));
        }
    }, [animeId])

    useEffect(() => {
        if (anime?.id) {
            const intSeason = +String(seasonNumber);
            const intEpisode = +String(episodeNumber);
            const filteredSeason = anime?.season?.find(item => (item.number == intSeason)) || {} as SeasonDTO;
            const filteredEpisode = filteredSeason?.episode?.find(item => (+item.number == intEpisode)) || {} as EpisodeDTO;
            // setSeason(filteredSeason);
            setEpisode(filteredEpisode);
        }
    }, [anime])


    function historyBack() {
        // setCookie(undefined, 'modal.anime', String(animeId), {
        //     maxAge: 60 * 60 * 1, // 1 hour
        // })
        history.back();
    }

    return (
        <>
            <Box position={'fixed'} top={'1rem'} left={'1rem'} cursor={'pointer'} zIndex={900} onClick={historyBack}>
                <MdArrowBack fontSize='large' />
            </Box>
            <Flex  alignItems={'center'} justifyContent={'center'}>
                {episode.link && <video style={{width: '100%', maxHeight: '100vh', height: '100vh'}} controls={true} autoPlay={true}>
                    <source src={episode.link} type="video/mp4"/>
                </video>}
            </Flex>
        </>
    )
}