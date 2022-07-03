import { ChevronDownIcon } from "@chakra-ui/icons";
import { Flex, IconButton, Input, Stack, Spacer, Avatar, Text, Icon, InputGroup, InputRightElement, Menu, MenuButton, MenuList, MenuItem, useColorModeValue, color } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FiSearch } from "react-icons/fi";
import { FiLogOut } from 'react-icons/fi'
import { useEffect, useState } from "react";
import Router from "next/router";
import { Logo } from "./icons/Logo";
import { parseCookies } from "nookies";

interface NavTopRequestDTO {
    inputSearch?: string | string[] | undefined;
}

export function NavTop({ inputSearch }: NavTopRequestDTO) {
    const MotionStack = motion(Stack);
    const MotionIconButton = motion(IconButton);
    const [query, setQuery] = useState('' as string | string[] | undefined);
    const stackColor = useColorModeValue("blackAlpha.100", "whiteAlpha.100")
    const textPlaceholder = useColorModeValue("blackAlpha.400", "whiteAlpha.400")
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const { 'nextauth.name': cookieName } = parseCookies(undefined);
        setUserName(cookieName);
    }, [])

    useEffect(() => {
        setQuery(inputSearch)
    }, [inputSearch])

    function handleSearch() {
        if (query) {
            Router.push(`/search?q=${query}`)
        }
    }

    return (
        <Flex
            width='full'
            height='20'
            align='center'
        >
            <Stack
                ml={'3px'}
                spacing='5'
                direction='row'
                align='center'
            >
                <Link href={'/home'}>
                    <MotionIconButton bg={stackColor} isRound variant='ghost' size='lg' colorScheme='whiteAlpha' aria-label='logo' icon={<Logo w='30' />} whileHover={{ rotate: 45 }} />
                </Link>
                <InputGroup>
                    <Input value={query} placeholder='O que você quer ver hoje?' size='md' width='96' onChange={(e) => (setQuery(e.target.value))}
                        _placeholder={{ color: textPlaceholder }}>
                    </Input>
                    <InputRightElement cursor={'pointer'} onClick={handleSearch}>
                        <FiSearch></FiSearch>
                    </InputRightElement>
                </InputGroup>
            </Stack>
            <Spacer />
            <Stack
                spacing='6'
                direction='row'
                align='center'

            >
                {/* <IconButton _focus={{}} variant='unstyled' aria-label='logo' size='lg' icon={<Bell color='var(--chakra-colors-whiteAlpha-900)' />} /> */}
                {/* <IconButton _focus={{}} variant='unstyled' aria-label='logo' size='lg' icon={<Config color='var(--chakra-colors-whiteAlpha-900)' />} /> */}

                <Menu>
                    <MenuButton>
                        <MotionStack
                            mr={0}
                            whileHover={{ scale: 1.05 }}
                            cursor='pointer'
                            align='center'
                            direction='row'
                            borderRadius='full'
                            pt='2'
                            pb='2'
                            parring

                        >
                            <Avatar name={userName} size='sm' />
                            <Text>{userName}</Text>
                            <ChevronDownIcon />
                        </MotionStack>
                    </MenuButton>
                    <MenuList p='4'>
                        <Link href={'/signin'}>
                            <MenuItem
                                alignItems='center'
                                borderRadius='full'
                            >
                                <Icon mr='4' as={FiLogOut} />
                                Logout
                            </MenuItem>
                        </Link>
                    </MenuList>
                </Menu>
            </Stack>
        </Flex>
    )
}