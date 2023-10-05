import {
  Container,
  Flex,
  Stack,
} from "@chakra-ui/react";
import 'react-alice-carousel/lib/alice-carousel.css';
import { NavTop } from "@/components/NavTop";
import { NavLeft } from "@/components/NavLeft";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { api } from "@/services/api";
import CollectionDTO from "@/interfaces/CollectionDTO";
import { parseCookies } from "nookies";
import { AnimeCollectionDTO } from "@/interfaces/AnimeDTO";
import Trending from "@/components/Trending";
import MovieRow from "@/components/MovieRow";
import { apiResources } from "@/services/api.contants";

interface HomeProps {
  collections: CollectionDTO[];
  trendings: AnimeCollectionDTO[];
}

export default function Homepage({ collections, trendings }: HomeProps) {  
  
  return (
    <>
      <SEO title="Início" />
      <Container
        maxW={"container.xl"}
        mb={24}>
        <NavTop />
        <Flex direction="column" height="full">
          <Stack direction="row" mt={5} gap={2}>
            <NavLeft />
            <Flex direction="column" maxW={'calc(100% - 68px)'} w={'full'}>
              <Trending trendings={trendings} />
              <Stack mt={10} rowGap={8}>
                {collections.map((item) => {
                  return <MovieRow key={item.id} items={item}></MovieRow>
                })}
              </Stack>
            </Flex>
          </Stack>
        </Flex>
      </Container>
      <Footer></Footer>
    </>
  );
}

export async function getServerSideProps<HomeProps>(context: any) {
  const { 'nextauth.token': token } = parseCookies(context);
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  const responsedata = await api.get(apiResources.COLLECTION);
  const collections = responsedata.data;
  const trendingCollection = collections.shift()
  const trendings = trendingCollection.animes
  trendings[0].progress = 1

  return {
    props: { collections, trendings },
  }
}