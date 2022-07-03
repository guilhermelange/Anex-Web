import { Container, Flex } from "@chakra-ui/react";
import { useEffect } from "react";
import Footer from "../Footer";
import { NavTop } from "../NavTop";

interface UserLayoutDTO {
    children: any
    queryString?: string | string[] | undefined
}

export default function UserLayout({ children, queryString }: UserLayoutDTO) {
    return (
        <Flex direction={'column'} justifyContent={'space-between'} flexGrow={1} height={'100%'}>
            <Container 
                    flexGrow={1} 
                    maxW={"container.xl"} 
                    height="100%" 
                    mb={24}>
                <NavTop inputSearch={queryString} />
                {children}
            </Container>
            <Footer></Footer>
        </Flex>
    )
}