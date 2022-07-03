import styles from '../styles/AnimeImage.module.css'
import { AnimeCollectionDTO } from '../interfaces/AnimeDTO';
import AnimeModal from './AnimeModal';
import { useDisclosure } from '@chakra-ui/react';

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
            <div className={styles['movieRow--item']} onClick={handleClick}>
                <img src={`/assets/${item.image_file}`} alt={item.name} />
            </div>
            
            {isOpen && <AnimeModal animeId={item.id} isOpen={isOpen} onClose={onClose} />}
        </>

    )
}