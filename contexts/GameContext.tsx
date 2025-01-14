"use client"
import React, { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import { Action, Player, Card, Room } from '../types/types';
import { test, createRoom, joinRoom, leaveRoom } from '@/server/game';

interface GameContextState {
	pot: number;
	players: Player[];
	turnPlayerId: string;
	communityCards: Card[];
	self: Player;
	setPot: (pot: number) => void;
	setPlayers: (players: Player[]) => void;
	setTurnPlayerId: (id: string) => void;
	setCommunityCards: (cards: Card[]) => void;
	getPlayer: (id: string) => Player;
	joinGame: (id: string) => void;
}

const GameContext = createContext<GameContextState | undefined>(undefined);

interface GameProviderProps {
	children: ReactNode;
	gameId: string;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children, gameId }) => {
	const [pot, setPot] = useState(0);
	const [players, setPlayers] = useState<Player[]>([]);
	const [self, setSelf] = useState<Player>({
		id: '',
		name: '',
		money: 0,
		amountInvestedThisRound: 0,
		isActive: false
	});
	const [turnPlayerId, setTurnPlayerId] = useState('');
	const [communityCards, setCommunityCards] = useState<Card[]>([]);
	const [hasStarted, setHasStarted] = useState(false);
	const [roomId, setRoomId] = useState('');

	useEffect(() => {
		const storedId = localStorage.getItem("playerId") ?? "";
		const storedName = localStorage.getItem("playerName") ?? "";
		setSelf(prev => ({
			...prev,
			id: storedId,
			name: storedName
		}));
	}, []);

	async function joinGame(gameId: string) {
		if (!self.id) return;
		const room = await joinRoom(gameId, self);
		if (room) {
			console.log("ROOM", room);
			setPot(room.pot)
			setTurnPlayerId(room.turnPlayerId);
			setPlayers(room.players);
			setCommunityCards(room.communityCards);
			setHasStarted(room.hasStarted);
			setRoomId(room.id);
		} else {
			console.log("room does not exist");
		}
	}

	function triggerUpdateTest() {
		
	}

	useEffect(() => {
		if (gameId && self.id) {
			joinGame(gameId);
		}
	}, [gameId, self.id]); // Add self.id as dependency

	const getPlayer = (id: string): Player => {
		return players.find(player => player.id === id) as Player;
	};

	return (
		<GameContext.Provider 
			value={{
				pot,
				players,
				turnPlayerId,
				communityCards,
				self,
				setPot,
				setPlayers,
				setTurnPlayerId,
				setCommunityCards,
				getPlayer,
				joinGame
			}}
		>
			{children}
		</GameContext.Provider>
	);
};

export const useGame = (): GameContextState => {
	const context = useContext(GameContext);
	if (!context) {
		throw new Error('useGame must be used within a GameProvider');
	}
	return context;
};