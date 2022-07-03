import React, { useState } from 'react';
import styles from '../styles/MovieRow.module.css'
import AnimeImage from './AnimeImage';
import CollectionDTO from '@/interfaces/CollectionDTO';
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { useRef } from 'react';

type MovieRowProps = {
  items: CollectionDTO
}
const MovieRow = (props: MovieRowProps) => {
  const [scrollX, setscrollX] = useState(0);
  const windowRow = useRef<HTMLDivElement>(document.createElement("div"));

  const handleLeftArrow = () => {
    let x = scrollX + Math.round(window.innerWidth / 2);
    if (x > 0) {
      x = 0;
    }
    setscrollX(x);
  }

  const handleRightArrow = () => {
    let x = scrollX - Math.round(window.innerWidth / 2);
    let listW = props.items.animes.length * 165;

    const computedWidth = windowRow.current.offsetWidth;
    
    if ((computedWidth - listW) > x) {
      x = (computedWidth - listW);
    }  
    setscrollX(x);
  }

  return (
    <div className={styles.movieRow}>
      <h5 style={{ marginBottom: 10 }}>{props.items.name}</h5>
      <div className={`${styles['movieRow--left']} ${scrollX == 0 ? styles.displayNone : ''}`} onClick={handleLeftArrow}>
        <FiChevronLeft />
      </div>
      <div className={styles['movieRow--right']} onClick={handleRightArrow}>
        <FiChevronRight />
      </div>

      <div className={styles['movieRow--listarea']} ref={windowRow}>
        <div className={styles['movieRow--list']} style={{
          marginLeft: scrollX,
          width: props.items.animes.length * 165
        }}>
          {props.items.animes.length > 0 && props.items.animes.map((item, key) => (
            <AnimeImage item={item} key={key} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MovieRow;