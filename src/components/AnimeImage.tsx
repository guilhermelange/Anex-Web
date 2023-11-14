import styles from '../styles/AnimeImage.module.css'
import { AnimeCollectionDTO } from '../interfaces/AnimeDTO';
import AnimeModal from './AnimeModal';
import { Box, Flex, Text, useDisclosure } from '@chakra-ui/react';
import Image from 'next/image';

interface AnimeImageRequest {
    item: AnimeCollectionDTO
}

export default function AnimeImage({ item }: AnimeImageRequest) {
    const { isOpen, onClose, onOpen } = useDisclosure();

    async function handleClick() {
        onOpen()
    }

    return (
        <>
            <Box display={'inline'} onClick={handleClick} cursor={'pointer'} textAlign={'center'} transition="transform 0.2s ease-in-out"
                _hover={{ transform: 'scale(1.04)' }}
                >
                <Image className={styles['imageborder']} src={`/assets/${item.image_file}`} alt={item.name} height={'300px'} width={'200px'}></Image>
                <Text>{item.name}</Text>
            </Box>
            {isOpen && <AnimeModal animeId={item.id} isOpen={isOpen} onClose={onClose} />}
        </>

    )
}