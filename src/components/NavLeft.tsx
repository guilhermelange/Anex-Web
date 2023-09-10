import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useColorModeValue } from "@chakra-ui/react";
import { IconButton, Stack, useColorMode } from "@chakra-ui/react";
import { Categories } from "./Categories";

export function NavLeft() {
    const { colorMode, toggleColorMode } = useColorMode()

    const primary = useColorModeValue("purple", "orange")
    const text = useColorModeValue("black", "white")
    const stackColor = useColorModeValue("blackAlpha.50", "whiteAlpha.50")

    return (
        <Stack
            spacing='12'
            align='center'
        >
            <Categories />
            <Stack
                borderRadius='full'
                p='2'
                spacing='3'
                backgroundColor={stackColor}
            >
                <IconButton
                    onClick={toggleColorMode}
                    size='md'
                    isRound
                    colorScheme={colorMode == 'dark' ? 'gray' : primary}
                    color={text}
                    aria-label="adventure"
                    icon={<SunIcon />} />
                <IconButton
                    onClick={toggleColorMode}
                    size='md'
                    isRound
                    colorScheme={colorMode == 'light' ? 'gray' : primary}
                    color={text}
                    aria-label="adventure"
                    icon={<MoonIcon />} />
            </Stack>
        </Stack>
    )
}