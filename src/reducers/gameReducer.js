import _ from 'lodash';
import reduceReducers from 'reduce-reducers';

// import isValidGamestate from '../models/isValidGamestate';
import { DEALER_LIBRARY, PLAYER_LIBRARY, shuffle } from '../models/shuffle';
import { PLAY_CARD, TAKE_HIT, RESET_GAME, STAND, NEW_ROUND } from '../actions/userAction';

// function codeGenReducer(state, action) {
// 	// console.lozg('codeGenReducer', state, action);
// 	if (state.code) {
// 		return state;
// 	} else {
// 		const code = codeGen(state.wins);
// 		const newState = { ...state, code };
// 		return newState;
// 	}
// }

export const EVAL_WIN = {
	type: 'game:evalWin',
	// payload: {
	// 	playedCard,
	// },
};

// function debugReducer(state, action) {
// 	console.log('debugReducer', state, action);
// 	if (!isValidGamestate(state)) {
// 		throw new Error('Gamestate is not valid');
// 	}
// 	return state;
// }

const initialState = {
	dealerDeck: shuffle(DEALER_LIBRARY),
	player1: {
		table: [],
		hand: shuffle(PLAYER_LIBRARY).slice(0, 4),
		total: 0,
		stand: false,
		wins: 0,
	},
	firstTurn: 'player1',
};

function evalWinReducer(state) {
	if (!state.player1.stand) {
		return state;
	} else if (state.player1.total === 20) {
		// console.log('evalWin runs');
		const wins = state.player1.wins + 1;
		const newState = {
			...state,
			player1: {
				...state.player1,
				wins,
			},
		};
		return newState;
	} else if (state.player1.total > 20) {
		// TODO: WRITE BUST HANDLER
		throw new Error('bust');
	} else {
		return state;
	}
}

function resetGameReducer(state, action) {
	if (action.type !== RESET_GAME) {
		return state;
	} else {
		const resetState = {
			...initialState,
			dealerDeck: shuffle(DEALER_LIBRARY),
			player1: {
				...initialState.player1,
				hand: shuffle(PLAYER_LIBRARY).slice(0, 4),
			},
		};
		return resetState;
	}
}

function newRoundReducer(state, action) {
	if (action.type !== NEW_ROUND) {
		return state;
	} else {
		const resetState = {
			...state,
			dealerDeck: shuffle(DEALER_LIBRARY),
			player1: {
				...state.player1,
				table: [],
				total: 0,
				stand: false,
			},
		};
		return resetState;
	}
}

function playerStand(state, action) {
	if (action.type !== STAND) {
		return state;
	} else {
		const newState = {
			...state,
			player1: {
				...state.player1,
				stand: true,
			},
		};
		return newState;
	}
}

function playCardReducer(state, action) {
	console.log('playCard runs');
	if (action.type !== PLAY_CARD) {
		return state;
	} else {
		console.log('playCard init state', state.player1);
		const table = state.player1.table.slice();
		const hand = state.player1.hand.slice();
		const i = action.payload.playedCard;
		const card = hand[i];
		if (!_.isFinite(card)) {
			throw new Error('Illegal move');
		}
		table.push(card);
		hand[i] = '';
		// keeping _.sum(table) instead of state.table in case of flip cards
		if (_.sum(table) >= 20) {
			let newState = {
				...state,
				player1: {
					...state.player1,
					table,
					hand,
					total: _.sum(table),
					stand: true,
				},
			};
			console.log('playCard End State', newState.player1);
			newState = evalWinReducer(newState);
			return newState;
		} else {
			const newState = {
				...state,
				player1: {
					...state.player1,
					table,
					hand,
					total: _.sum(table),
				},
			};
			console.log('playCard End State', newState.player1);
			return newState;
		}
	}
}

function takeHitReducer(state, action) {
	console.log('takeHit runs');
	if (action.type !== TAKE_HIT) {
		return state;
	} else {
		console.log('takeHit Init State', 'Dealer topcard:', state.dealerDeck[state.dealerDeck.length - 1], state.player1);
		const table = state.player1.table.slice();
		const deckCopy = state.dealerDeck.slice();
		const card = deckCopy.pop();
		table.push(card);
		// keeping _.sum(table) instead of state.table in case of flip cards
		if (_.sum(table) >= 20) {
			let newState = {
				...state,
				dealerDeck: deckCopy,
				player1: {
					...state.player1,
					table,
					total: _.sum(table),
					stand: true,
				},
			};
			console.log('takeHit End State', 'Dealer topcard:', newState.dealerDeck[newState.dealerDeck.length - 1], newState.player1);
			newState = evalWinReducer(newState);
			return newState;
		} else {
			const newState = {
				...state,
				dealerDeck: deckCopy,
				player1: {
					...state.player1,
					table,
					total: _.sum(table),
				},
			};
			console.log('takeHit End State', 'Dealer topcard:', newState.dealerDeck[newState.dealerDeck.length - 1], newState.player1);
			return newState;
		}
	}
}


export default reduceReducers(
	resetGameReducer,
	newRoundReducer,
	playCardReducer,
	takeHitReducer,
	playerStand,
	// debugReducer,
	initialState
);
