"use server"
import { Room, Player } from "@/types/types";

const rooms: Room[] = [];

export async function createRoom(id: string | null): Promise<Room> {
	const room: Room = {
		id: id ?? Math.random().toString(36).substring(7),
		players: [],
		pot: 0,
		turnPlayerId: "",
		communityCards: [],
		hasStarted: false
	};
	rooms.push(room);
	console.log("created room", room);
	return room;
}

export async function test(): Promise<void> {
	console.log("test");
}

export async function getRoom(id: string): Promise<Room | undefined> {
	console.log("get room", id);
	return rooms.find(room => room.id === id);
}

export async function joinRoom(roomId: string, player: Player): Promise<Room | undefined> {
	console.log("join room", roomId, player);
	let room = await getRoom(roomId);
	if (!room) {
		room = await createRoom(roomId);
	}
	
	if (room.players.find(p => p.id === player.id)) {
		console.log("player already in room");
	} else {
		room.players.push(player);
	}

	return room;
}

export async function leaveRoom(roomId: string, playerId: string): Promise<void> {
	console.log("leave room", roomId, playerId);
	const room = await getRoom(roomId);
	if (room) {
		const player = room.players.find(player => player.id === playerId);
		if (player) {
			player.isActive = false;
		}
	}
}
