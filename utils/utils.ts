import { Card, Action } from "../types/types";

export function cardToSrc(card: Card): string {
    return `cards/back.png`;
}

export function actionToText(action: Action | undefined): string {
    if (!action) return "";
    switch (action.type) {
        case "fold":
            return "Fold";
        case "check":
            return "Check";
        case "call":
            return `Call $${action.amount}`
        case "bet":
            return `Bet $${action.amount}`;
        case "raise":
            return `Raise $${action.amount}`;
        case "all-in":
            return `All in $${action.amount}`;
    }
}