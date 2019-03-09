import _ from 'lodash';
import reduceReducers from 'reduce-reducers';

import isValidGamestate from '../models/isValidGamestate';
import { DEALER_LIBRARY, PLAYER_LIBRARY, shuffle } from '../models/shuffle';
import { PLAY_CARD, TAKE_HIT, RESET_GAME } from '../actions/userAction';

// function codeGenReducer(state, action) {
// 	// console.log('codeGenReducer', state, action);
// 	if (state.code) {
// 		return state;
// 	} else {
// 		const code = codeGen(state.wins);
// 		const newState = { ...state, code };
// 		return newState;
// 	}
// }

function debugReducer(state, action) {
	console.log('debugReducer', state, action);
	if (!isValidGamestate(state)) {
		throw new Error('Gamestate is not valid');
	}

	return state;
}

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

function resetReducer(state, action) {
	if (action.type !== RESET_GAME) {
		return state;
	} else {
		return initialState;
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
		if (_.sum(table) === 20) {
			const newState = {
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
		if (_.sum(table) === 20) {
			const newState = {
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
	resetReducer,
	playCardReducer,
	takeHitReducer,
	// codeGenReducer,
	// debugReducer,
	initialState
);
