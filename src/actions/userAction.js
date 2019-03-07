export const PLAY_CARD = 'user:playCard';
export const TAKE_HIT = 'user:takeHit';
export const RESET_GAME = 'user:resetGame';

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
export function resetGame() {
	return {
		type: RESET_GAME,
	};
}
