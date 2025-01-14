import React, { useState } from "react";
import styles from "../styles/Board.module.css";
import { Action, Card, Suit } from "@/types/types";
import CardImg from "./CardImg";
import { useGame } from "@/contexts/GameContext";
import { cardToSrc } from "@/utils/utils";

const Board = () => {
    const { pot, communityCards } = useGame();

    return (
        <div className={styles.container}>
            <div className={styles.pot}>{pot}</div>
            <div className={styles.communityCards}>
                {communityCards.map((card, i) => (
                    <CardImg key={i} image={cardToSrc(card)} />
                ))}
                {Array.from({ length: 5 - communityCards.length }, (_, i) => (
                    <CardImg key={i + communityCards.length} image={`cards/back.png`} size={90}/>
                ))}
            </div>
        </div>
    );
};

export default Board;