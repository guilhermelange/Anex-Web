import { Center } from "@chakra-ui/react";

export default function Footer() {
    return (
        <Center h={'140px'} minH={'140px'}  w={'full'} bg={"whiteAlpha.50"} top={'100vh'}
        position={'sticky'}>
            © {(new Date()).getUTCFullYear()} - AnimeExperience
        </Center>
    )
}