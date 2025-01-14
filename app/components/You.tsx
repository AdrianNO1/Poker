import React, { useEffect, useState } from "react";
import styles from "../styles/You.module.css";
import { Action, Card, Suit } from "@/types/types";
import Player from "./Player";
import { useGame } from "@/contexts/GameContext";

const You = () => {
	const { players, self } = useGame();
	const [toBet, setToBet] = useState(0);
	const [inputBetValue, setInputBetValue] = useState("");
	
	useEffect(() => {
		setInputBetValue(toBet.toString());
	}, [toBet]);

	const player = self
	if (!player) return null;

	const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setToBet(parseInt(Math.max(0, Math.min(player.money, parseInt(event.target.value))).toString()));
	}

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.value === "") {
			setInputBetValue("");
			return;
		}
		const value = parseInt(event.target.value);
		setToBet(Math.max(0, Math.min(player.money, value)));
	}

	const handleBet = () => {
		console.log("betting", toBet);
	}

	const handleCheck = () => {
		console.log("checking");
	}

	const handleCall = () => {
		console.log("calling", toBet);
	}

	const handleFold = () => {
		console.log("folding");
	}

	const handleRaise = () => {
		console.log("raising", toBet);
	}

	const canRaise = true
	const canCheck = false

	return (
		<div className={styles.container}>
			<Player id={self.id} />
			
			<input 
				type="range" 
				min="0" 
				max={player.money} 
				step={10} 
				value={toBet} 
				className={styles.slider} 
				onChange={handleSliderChange} 
			/>
			
			<input 
				type="number" 
				value={inputBetValue} 
				className={styles.input} 
				onChange={handleInputChange}
				onBlur={() => setInputBetValue(toBet.toString())} 
			/>
			
			<div className={styles.buttonGroup}>
				<input 
					type="button" 
					value="Fold" 
					className={`${styles.button} ${styles.foldButton}`} 
					onClick={handleFold} 
				/>
				
				{canCheck ? (
					<input 
						type="button" 
						value="Check" 
						className={`${styles.button} ${styles.checkButton}`} 
						onClick={handleCheck} 
					/>
				) : (
					<input 
						type="button" 
						value={`Call $${toBet}`}
						className={`${styles.button} ${styles.callButton}`} 
						onClick={handleCall} 
					/>
				)}
				
				{canRaise ? (
					<input 
						type="button" 
						value="Raise" 
						className={`${styles.button} ${styles.raiseButton}`} 
						onClick={handleRaise} 
					/>
				) : (
					<input 
						type="button" 
						value="Bet"
						className={`${styles.button} ${styles.betButton}`} 
						onClick={handleBet} 
					/>
				)}
			</div>
		</div>
	);
};

export default You;