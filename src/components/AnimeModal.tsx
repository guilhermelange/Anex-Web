import {
  Modal,
  Box,
  ButtonGroup,
  Flex,
  Heading,
  Icon,
  IconButton,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Stack,
  Text,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  VStack,
  Select,
  Button,
} from "@chakra-ui/react";
import 'react-alice-carousel/lib/alice-carousel.css';
import { FaPlay } from "react-icons/fa";
import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AnimeContext } from "@/context/AnimeContext";
import { BiLike, BiDislike } from 'react-icons/bi'
import { MdOutlineBookmarkAdd, MdOutlineBookmarkAdded } from 'react-icons/md'
import Link from "next/link";
import { useColorModeValue } from "@chakra-ui/react";
import LoadingScreen from "./Loading";

interface AnimeModalProps {
  animeId: string;
  isOpen: boolean,
  onClose: () => void
}

export default function AnimeModal({ animeId, isOpen, onClose }: AnimeModalProps) {
  const { loadAnime, handleEvaluation, handleSetFavorite, anime, loadingAnime } = useContext(AnimeContext);
  const [selectedSeason, setSelectedSeason] = useState(0);
  const MotionIconButton = motion(IconButton);
  let animeAtualSelecionado = '';
  const [like, setLike] = useState<boolean | null>(false);
  const [favoriteItem, setFavoriteItem] = useState(false);

  const primary = useColorModeValue("purple", "orange")
  const alpha300 = useColorModeValue("whiteAlpha.300", "blackAlpha.300")
  const alpha200 = useColorModeValue("blackAlpha.200", "whiteAlpha.200")

  useEffect(() => {
    if (animeId && !animeAtualSelecionado) {
      setLike(null);
      setFavoriteItem(false);
      animeAtualSelecionado = animeId;
      loadAnime(animeId);
    }
  }, [animeId])

  useEffect(() => {
    if (anime?.season) {
      const currentSeason = anime?.season.at(0)
      if (currentSeason)
        setSelectedSeason(currentSeason.number)
    }
    setLike(anime?.evaluation == undefined ? null : anime?.evaluation);
    setFavoriteItem(!!anime?.favorite);
  }, [anime])

  function handleClickEvaluation(evaluation: boolean) {
    setLike(!!evaluation);
    handleEvaluation(evaluation)
  }

  function handleClickFavorite() {
    setFavoriteItem(!favoriteItem);
    handleSetFavorite();
  }

  const compareNumbers = (a: any, b: any) => a.number - b.number;

  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior={'outside'} size={'4xl'}>
      <ModalOverlay
        bg={alpha300}
        backdropFilter='blur(6px)'
      />
      <ModalContent>
        {loadingAnime && <>
          <Flex h={400} bg={'whiteAlpha.200'} w={'full'} alignItems={'center'} borderTopRadius={4}>
            <LoadingScreen></LoadingScreen>
          </Flex>
        </>}
        {!loadingAnime && anime && anime?.id == animeId &&
          <Flex h={400} bg={'whiteAlpha.200'} w={'full'} alignItems={'center'}
            backgroundSize={'cover'}
            backgroundPosition={'center'}
            backgroundImage={`url(/assets/${anime?.cover_file})`}
            borderTopRadius={4}>
            <Flex borderTopRadius={4} alignItems={'center'} py={4} px={8} w={'full'} h={'full'} bg={'linear-gradient(90deg,#111 0,transparent)'}>
              <Stack
                width={'60%'}
                spacing={8}>
                <Heading color={'white'}>{anime?.name}</Heading>
                <Stack direction={["row"]} spacing={6}>
                  <Text color={"green.500"}>
                    {anime?.evaluation_media}% relevante
                  </Text>
                  <Text color={'white'}>{anime?.start_year}</Text>
                  <Text color={'white'}>{anime?.season_count} TEMP</Text>
                </Stack>
                <Text color={'white'} noOfLines={4} fontSize={"xs"} maxW={"100%"}>
                  {anime?.description}
                </Text>
                <Stack direction='row' spacing={6}>
                  <MotionIconButton whileHover={{ scale: 1.05 }} transition={{ duration: 0.05 }} size='lg' borderRadius={'full'} icon={<BiLike />} onClick={() => { handleClickEvaluation(true) }} color={'white'} colorScheme={like ? primary : 'gray'} />
                  <MotionIconButton whileHover={{ scale: 1.05 }} transition={{ duration: 0.05 }} size='lg' borderRadius={'full'} icon={<BiDislike />} onClick={() => { handleClickEvaluation(false) }} color={'white'} colorScheme={like || like == null ? 'gray' : primary} />
                  <Button size='lg' leftIcon={favoriteItem ? <MdOutlineBookmarkAdded /> : <MdOutlineBookmarkAdd />} color={'white'} colorScheme={favoriteItem ? primary : "gray"} variant='solid' onClick={() => { handleClickFavorite() }}>
                    {favoriteItem ? "Favoritado" : "Favoritar"}
                  </Button>
                </Stack>
              </Stack>
            </Flex>
          </Flex>}
        <ButtonGroup justifyContent={'flex-end'} paddingRight={'15%'}>
          <MotionIconButton animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 1 }} margin={'-30px'} icon={<Icon size={100} color={"white"} as={FaPlay}></Icon>} isRound width={59} height={59} aria-label='logo' ml={0.5} colorScheme={primary} />
        </ButtonGroup>
        <ModalCloseButton _focus={{ boxShadow: 'none' }} />
        <ModalBody>
          {loadingAnime && <LoadingScreen></LoadingScreen>}
          {!loadingAnime &&
            <Tabs mt={2} variant='soft-rounded' colorScheme={primary}>
              <TabList>
                <Tab>Episódios</Tab>
                <Tab>Playlist</Tab>
              </TabList>

              <TabPanels>
                <TabPanel px={0} py={8}>
                  <VStack alignItems={'flex-start'} gap='2'>
                    <Select w={'auto'} p={0} onChange={e => { setSelectedSeason(+e.target.value) }}>
                      {anime?.season_count && anime.season?.map((item, key) => (
                        <option key={key} value={item.number}>{item.name}</option>
                      ))}
                    </Select>
                    {anime?.season_count && anime.season?.find(item => item.number == selectedSeason)?.episode.sort(compareNumbers).map(item => (
                      <Box key={item.number} borderRadius={10} bg={alpha200} h={24} w={'full'} display='flex' alignItems={'center'} justifyContent='flex-start'
                        px={4}>
                        <Link href={`watch/${anime?.id}/${selectedSeason}/${item.number}`}>
                          <ButtonGroup justifyContent={'flex-end'} mr={4}>
                            <IconButton bg={alpha200} icon={<Icon size={100} color={"white"} as={FaPlay}></Icon>} isRound width={59} height={59} aria-label='logo' ml={0.5} />
                          </ButtonGroup>
                        </Link>
                        <VStack justifyContent={'flex-start'} alignItems='flex-start'>
                          <Heading size={'sm'}>{item.name}</Heading>
                          <Text fontSize={"xs"} noOfLines={4}>{item.description}</Text>
                        </VStack>
                      </Box>
                    ))}
                  </VStack>
                </TabPanel>
                <TabPanel>
                  {anime?.playlist_link && <div>
                    <iframe src={anime?.playlist_link} width="100%" height="500" frameBorder="0" style={{borderRadius: "14px"}} allowFullScreen allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
                  </div>}
                </TabPanel>
              </TabPanels>
            </Tabs>}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
