import {
    Box,
    Button,
    ButtonGroup,
    Flex,
    Grid,
    GridItem,
    Heading,
    Icon,
    Stack,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import 'react-alice-carousel/lib/alice-carousel.css';
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaPlay } from "react-icons/fa";
import AnimeModal from "./AnimeModal";
import { AnimeCollectionDTO } from "@/interfaces/AnimeDTO";
import { useColorModeValue } from "@chakra-ui/react";

interface TrendingProps {
    trendings: AnimeCollectionDTO[];
}

export default function Trending({ trendings }: TrendingProps) {
    const [trending, setTrending] = useState(trendings as AnimeCollectionDTO[]);
    const [principal, setPrincipal] = useState(trendings[0] as AnimeCollectionDTO);
    const [animeModal, setAnimeModal] = useState(principal.id);
    const MotionStack = motion(Stack);
    const MotionBox = motion(Box);

    const primary = useColorModeValue("purple", "orange")
    const alpha = useColorModeValue("blackAlpha.50", "whiteAlpha.50")
    const animePrincipalColor = useColorModeValue("blackAlpha.200", "whiteAlpha.200")

    async function handleOpenModal() {
        setAnimeModal(principal.id);
        onOpen();
    }

    useEffect(() => {
        window.localStorage.setItem("process", "true");
        document.addEventListener("animationend", (data) => {
            const process = window.localStorage.getItem("process");

            if (process) {
                let currentIndex = -1;
                for (let index = 0; index < trending.length; index++) {
                    const element = trending[index];
                    if (element.progress > 0) {
                        currentIndex = index;
                        break;
                    }
                }

                if (currentIndex + 1 == trending.length) {
                    currentIndex = -1;
                }

                const newMap = trending.map((item, idx) => {
                    if (idx == currentIndex + 1) {
                        item.progress = 1;
                    } else {
                        item.progress = 0;
                    }
                    return item;
                });

                setTrending(newMap);
            }

            window.localStorage.setItem("process", process ? "" : "true");
        });
    }, []);

    useEffect(() => {
        if (trending) {
            const newPrincipal = trending.find((item) => item.progress > 0);
            if (newPrincipal) {
                setPrincipal(newPrincipal);
            }
        }
    }, [trending]);

    function handleClickPrincipal(event: any, indexClick: number) {
        const newMap = trending.map((item, idx) => {
            if (idx == indexClick) {
                item.progress = 1;
            } else {
                item.progress = 0;
            }
            return item;
        });
        setTrending(newMap);
    }

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Flex direction="row" height={'330px'} gap={4}>
                <Box
                    borderRadius="xl"
                    width="100%"
                    height="full"
                    bg={alpha}
                >
                    <Grid templateColumns="2fr 3fr" gap={0} h={"100%"}>
                        <GridItem
                            w="100%"
                            h={"100%"}
                            p={4}
                            display={"flex"}
                            alignItems={"center"}
                            justifyContent={"center"}
                        >
                            <MotionStack spacing={6}
                                animate={{ opacity: [0, 1] }}
                                transition={{ delay: 0.1, duration: 1 }}>
                                <Heading>{principal.name}</Heading>
                                <Stack direction={["row"]} spacing={6}>
                                    <Text color={"green"}>
                                        {principal.evaluation_media}% relevante
                                    </Text>
                                    <Text>{principal.start_year}</Text>
                                    <Text>{principal.season_count} TEMP</Text>
                                </Stack>
                                <Text noOfLines={4} fontSize={"xs"} maxW={"100%"}>
                                    {principal.description}
                                </Text>
                                <ButtonGroup>
                                    <Button
                                        leftIcon={
                                            <Icon as={FaPlay}></Icon>
                                        }
                                        colorScheme={primary}
                                        color={'whiteAlpha.800'}
                                        onClick={handleOpenModal}
                                    >
                                        Acessar agora
                                    </Button>
                                </ButtonGroup>
                            </MotionStack>
                        </GridItem>
                        <GridItem
                            w="100%"
                            h={"100%"}
                            background={"gray.700"}
                            borderRightRadius="xl"
                        >
                            <MotionBox
                                animate={{ opacity: [0, 1] }}
                                transition={{ delay: 0.1, duration: 0.5 }}
                                backgroundSize={'cover'}
                                backgroundPosition={'center'}
                                backgroundImage={`url(/assets/${principal.cover_file})`}
                                w={'full'}
                                h={'full'}
                                borderRightRadius="xl">
                            </MotionBox>
                        </GridItem>
                    </Grid>
                </Box>
                <Box
                    borderRadius="xl"
                    width="35%"
                    height="full"
                    bg={alpha}
                >
                    <Grid h={"full"}>
                        <GridItem h={"100%"} px={5} pt={2.5}>
                            <Heading fontSize={24}>Tendências</Heading>
                        </GridItem>
                        {trending &&
                            trending.map((item, currIndex) => (
                                <>
                                    <GridItem
                                        _last={{ borderBottomRadius: "xl" }}
                                        py={2}
                                        px={5}
                                        key={item.id}
                                        h={"100%"}
                                        position={"relative"}
                                        display={"flex"}
                                        alignItems={"center"}
                                        justifyContent={"space-between"}
                                        cursor={"pointer"}
                                        onClick={(event) =>
                                            handleClickPrincipal(event, currIndex)
                                        }
                                    >
                                        <Flex gap={3} alignItems={"center"}>
                                            {/* <IconButton
                                                isRound
                                                variant="unstyled"
                                                aria-label="logo"
                                                backgroundSize={'cover'}
                                                backgroundPosition={'center'}
                                                backgroundImage={`url(/assets/${item.image_file})`}
                                            /> */}
                                            <Flex direction={"column"}>
                                                <Text>{item.name}</Text>
                                                <Text
                                                    fontSize={12}
                                                >{`${item.evaluation_media}% relevante`}</Text>
                                            </Flex>
                                        </Flex>
                                        <Icon
                                            w={6}
                                            h={6}
                                            as={MdOutlineKeyboardArrowRight}
                                        ></Icon>
                                        {item?.progress > 0 && (
                                            <>
                                                <Flex
                                                    id="loadingbar"
                                                    zIndex={"-1"}
                                                    position={"absolute"}
                                                    bg={animePrincipalColor}
                                                    top={"0px"}
                                                    left={"0px"}
                                                    w={`0%`}
                                                    h={"100%"}
                                                    overflow={"hidden"}
                                                    borderBottomRadius={(currIndex == trending.length - 1) ? 'md' : '0'}
                                                ></Flex>
                                            </>
                                        )}
                                    </GridItem>
                                </>
                            ))}
                    </Grid>
                </Box>
            </Flex>
            {isOpen && <AnimeModal animeId={animeModal} isOpen={isOpen} onClose={onClose} />}
        </>
    )
}