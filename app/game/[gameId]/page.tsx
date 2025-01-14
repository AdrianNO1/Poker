"use client"
import React, { useState, useEffect } from "react";
import styles from "./page.module.css";
import Opponent from "../../components/Player";
import Board from "../../components/Board";
import You from "../../components/You";
import { useGame, GameProvider } from "@/contexts/GameContext";

export default function Home() {
	const [gameId, setGameId] = useState("");

	useEffect(() => {
		setGameId(window.location.pathname.split("/")[2]);
	}, []);

	return (
		<GameProvider gameId={gameId}>
			<GameContent />
		</GameProvider>
	);
}

function GameContent() {
	const { pot, players, turnPlayerId, communityCards, self } = useGame();
	return (
		<div>
			<div className={styles.opponentsContainer}>
				{players.map(player => (
					console.log(player.id, self.id, player, player.id !== self.id),
					player.id !== self.id ? <Opponent key={player.id} id={player.id} /> : null
				))}
				{players.length <= 1 ? <div className={styles.waiting}>Waiting for players...</div> : null}
			</div>
			<Board />
			<You />
		</div>
	);
}
