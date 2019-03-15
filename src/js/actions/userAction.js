export const PLAY_CARD = 'user:playCard';
export const TAKE_HIT = 'user:takeHit';
export const END_TURN = 'user:endTurn';
export const RESET_GAME = 'user:resetGame';
export const STAND = 'user:stand';
export const NEW_ROUND = 'user:newRound';
export const CLOSE_MODAL = 'user:closeModal';

export function playCard(player, playedCard) {
	return {
		type: PLAY_CARD,
		payload: {
			player,
			playedCard,
		},
	};
}
export function takeHit(player) {
	return {
		type: TAKE_HIT,
		payload: {
			player,
		},
	};
}
export function stand(player) {
	return {
		type: STAND,
		payload: {
			player,
		},
	};
}
export function endTurn(player) {
	return {
		type: END_TURN,
		payload: {
			player,
		},
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

export function closeModal() {
	return {
		type: CLOSE_MODAL,
	};
}
