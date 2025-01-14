import React, { useState } from 'react';
import styles from '../styles/CardImg.module.css';

interface CardProps {
    image: string;
    isFlipped?: boolean;
    alt?: string;
    size?: number;
}

const CardImg = ({ image, alt='card', size=100, isFlipped=false }: CardProps) => {
    const backSrc = '/cards/back.png';

    return (
        <div 
            className={`${styles.cardContainer} ${isFlipped ? styles.flipped : ''}`}
        >
            <div className={styles.cardInner}>
                <div className={styles.cardFront}>
                    <img src={`/${image}`} alt={alt} style={{ maxWidth: `${size}px` }} />
                </div>
                <div className={styles.cardBack}>
                    <img src={backSrc} alt="card back" style={{ maxWidth: `${size}px` }} />
                </div>
            </div>
        </div>
    );
};

export default CardImg;
