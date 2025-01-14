export interface Action {
    type: "fold" | "check" | "call" | "bet" | "raise" | "all-in";
    amount?: number;
}

export interface Player {
    id: string;
    name: string;
    money: number;
    amountInvestedThisRound: number;
    prevAction?: Action;
    isActive: boolean;
}

export type Suit = "hearts" | "diamonds" | "clubs" | "spades";

export interface Card {
    suit: Suit;
    value: number;
}

export interface Room {
    id: string;
    players: Player[];
    pot: number;
    turnPlayerId: string;
    communityCards: Card[];
    hasStarted: boolean;
}