import React from 'react';
import AnimeImage from './AnimeImage';
import CollectionDTO from '@/interfaces/CollectionDTO';
import { Box, SimpleGrid, Text } from '@chakra-ui/react';

type CardRowProps = {
  items: CollectionDTO
}
const CardRow = (props: CardRowProps
) => {
  return (
    <>
      <Box>
        <Text mb={2}>{props.items.name}</Text>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4, lg: 6 }} spacing={6}>
          {props.items.animes.length > 0 && props.items.animes.map((item, key) => (
            <AnimeImage item={item} key={key} />
          ))}
        </SimpleGrid>
      </Box>
    </>
  );
}

export default CardRow;