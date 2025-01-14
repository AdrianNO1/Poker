import React, { useState } from "react";
import styles from "../styles/Player.module.css";
import { Action } from "@/types/types";
import CardImg from "./CardImg";
import { useGame } from "@/contexts/GameContext";
import { actionToText } from "@/utils/utils";

interface PlayerProps {
    id: string;
}

const Player = ({ id }: PlayerProps) => {
    const { getPlayer, self } = useGame();
    const player = getPlayer(id);
    if (!player) return null;

    const { name, money, prevAction } = player;

    const cardsHidden = true
    const cardSize = 70; // max width

    return (
        <div className={styles.player}>
            <div className={styles.name}>{name}</div>
            <div className={styles.money}>${money}</div>
            <div className={styles.cardsContainer}>
                {cardsHidden ? (
                    <div className={styles.card}>
                        <CardImg image="cards/back.png" alt="card" size={cardSize}/>
                        <CardImg image="cards/back.png" alt="card" size={cardSize}/>
                    </div>
                ) : (
                    <>
                        <CardImg image="cards/2_of_clubs.png" alt="card" size={cardSize}/>
                        <CardImg image="cards/2_of_clubs.png" alt="card" size={cardSize}/>
                    </>
                )}
            </div>
            {id != self.id && <div className={styles.action}>
                {actionToText(prevAction)}
            </div>}
        </div>
    );
};

export default Player;