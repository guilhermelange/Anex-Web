/* eslint-disable @next/next/link-passhref */
import { Collapse, Icon, IconButton, Stack, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { MdList, MdVideoLibrary, MdMusicNote } from "react-icons/md"
import { FaBookmark } from "react-icons/fa"
import { Tooltip } from '@chakra-ui/react'
import { useState } from "react";
import Link from "next/link";
import FilterOptions from '@/enum/FilterOptions'

export function Categories() {
    const [isOpen, setOpen] = useState(true);
    const stackColor = useColorModeValue("blackAlpha.50", "whiteAlpha.50")

    return (
        <Stack
            borderRadius='full'
            spacing='2'
            padding={0}
            py={2}
            backgroundColor={stackColor}
            alignItems={'center'}
        >
            <IconButton
                p={4}
                onClick={() => setOpen(!isOpen)}
                colorScheme={'gray'}
                bg={'transparent'}
                width={0}
                size='md'
                isRound
                aria-label="menu"
                icon={<Icon w={6} h={7} as={MdList}></Icon>}
                _focus={{}} />

            <Collapse in={isOpen} animateOpacity>
                <Stack
                    borderRadius='full'
                    spacing='4'
                    padding={1}
                >

                    <Tooltip label='Favoritos' hasArrow placement='right'>
                        <div>
                            <Link href={`/favorites`}>
                                <IconButton width={0} size='md' colorScheme={'gray'} isRound aria-label="favorite" icon={<Icon w={4} h={4} as={FaBookmark}></Icon>} />
                            </Link>
                        </div>
                    </Tooltip>
                    <Tooltip label='Top Animes' hasArrow placement='right'>
                        <div>
                            <Link href={`top/${FilterOptions.animes}`}>
                                <IconButton width={0} size='md' colorScheme={'gray'} isRound aria-label="topfilm" icon={<Icon w={5} h={5} as={MdVideoLibrary}></Icon>} />
                            </Link>
                        </div>
                    </Tooltip>
                    <Tooltip label='Top PlayLists' hasArrow placement='right'>
                        <div>
                            <Link href={`top/${FilterOptions.playlists}`}>
                                <IconButton width={0} size='md' colorScheme={'gray'} isRound aria-label="topfilm" icon={<Icon w={5} h={5} as={MdMusicNote}></Icon>} />
                            </Link>
                        </div>
                    </Tooltip>
                </Stack>
            </Collapse>
        </Stack>
    )
}