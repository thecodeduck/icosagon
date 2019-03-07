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
		playerTable: [],
		playerHand: shuffle(DEALER_LIBRARY).slice(0, 4),
		playerTotal: 0,
		playerWins: 0,
	},
	round: 0,
	turn: 1,
};

function resetReducer(state, action) {
	if (action.type !== RESET_GAME) {
		return state;
	} else {
		return initialState;
	}
}

function playCardReducer(state, action) {
	if (action.type !== PLAY_CARD) {
		return state;
	} else {
		const table = state.player1.playerTable;
		const card = action.payload.playedCard;
		table.push(card);
		// if (result.reduce((a, b) => a + b) === 20) {
		// 	// TODO: WRITE WIN REDUCER
		// 	const newState = {
		// 		...state,
		// 		player1: {
		// 			playerWins: state.player1.playerWins + 1,
		// 		},
		// 	};
		// 	return newState;
		// } else {
		// 	const newState = {
		// 		...state,
		// 		player1: {
						// ...state.player1,
		//			playerTable: table,
		// 		},
		// 	};
		// 	return newState;
		// }
		const newState = {
			...state,
			player1: {
				...state.player1,
				playerTable: table,
			},
		};
		return newState;
	}
}

export default reduceReducers(
	resetReducer,
	playCardReducer,
	// codeGenReducer,
	// debugReducer,
	initialState
);
