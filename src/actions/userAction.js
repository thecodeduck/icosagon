export const PLAY_CARD = 'user:playCard';
export const TAKE_HIT = 'user:takeHit';
export const RESET_GAME = 'user:resetGame';
export const STAND = 'user:stand';
export const NEW_ROUND = 'user:newRound';

export function playCard(playedCard) {
	return {
		type: PLAY_CARD,
		payload: {
			playedCard,
		},
	};
}
export function takeHit() {
	return {
		type: TAKE_HIT,
	};
}
export function stand() {
	return {
		type: STAND,
	};
}
export function resetGame() {
	return {
		type: RESET_GAME,
	};
}
export function newRound() {
	return {
		type: NEW_ROUND,
	};
}
