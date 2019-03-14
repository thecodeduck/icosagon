import _ from 'lodash';
import reduceReducers from 'reduce-reducers';

// import isValidGamestate from '../models/isValidGamestate';
import { DEALER_LIBRARY, PLAYER_LIBRARY, shuffle } from '../models/shuffle';
import { PLAY_CARD, TAKE_HIT, RESET_GAME, STAND, NEW_ROUND, CLOSE_MODAL } from '../actions/userAction';

const PLAYED_CARD = undefined;

// function debugReducer(state, action) {
// 	console.log('debugReducer', state, action);
// 	if (!isValidGamestate(state)) {
// 		throw new Error('Gamestate is not valid');
// 	}
// 	return state;
// }

// const USER_REDUCER_MAP = {
// 	'user:playCard': (state, action) => { ... },
// 	'user:hit': (state, action) => { ... },
// 	[NEW_ROUND]: newRoundReducer,
// };

// const multiplexReducers = (reducerMap) =>
// 	(state, action) =>
// 	(reducerMap[action.type] || reducerMap.default || (s => s))(state, action);

// // closure is a function with a partially bound namespace
// // currying
// (a) => (b) => a + b;

// function (a) {
// 	return function (b) {
// 		return a + b;
// 	};
// };

const initialState = {
	dealerDeck: shuffle(DEALER_LIBRARY),
	player1: {
		table: [],
		hand: shuffle(PLAYER_LIBRARY).slice(0, 4),
		total: 0,
		stand: false,
		wins: 0,
		losses: 0,
	},
	modal: {
		shown: false,
		text: 'Something went wrong',
		action: 'closeModal',
	},
};

function evalWinReducer(state) {
	const total = state.player1.total;
	const wins = state.player1.wins + 1;
	const losses = state.player1.losses + 1;
	if (!state.player1.stand || total < 20) {
		return state;
	} else if (total > 20) {
		const newState = {
			...state,
			player1: {
				...state.player1,
				losses,
			},
			modal: {
				shown: true,
				text: 'Bust',
				action: 'newRound',
			},
		};
		return newState;
	} else if (total === 20) {
		const newState = {
			...state,
			player1: {
				...state.player1,
				wins,
			},
			modal: {
				shown: true,
				text: 'You Win!',
				action: 'newRound',
			},
		};
		return newState;
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
			modal: {
				...initialState.modal,
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
	// console.log('playCard runs');
	if (action.type !== PLAY_CARD) {
		return state;
	} else {
		// console.log('playCard init state', state.player1);
		const table = state.player1.table.slice();
		const hand = state.player1.hand.slice();
		const i = action.payload.playedCard;
		const card = hand[i];
		if (!_.isFinite(card)) {
			return state;
		}
		table.push(card);
		hand[i] = PLAYED_CARD;
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
			// console.log('playCard End State', newState.player1);
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
			// console.log('playCard End State', newState.player1);
			return newState;
		}
	}
}

function takeHitReducer(state, action) {
	// console.log('takeHit runs');
	if (action.type !== TAKE_HIT) {
		return state;
	} else {
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
			return newState;
		}
	}
}

function closeModalReducer(state, action) {
	if (action.type !== CLOSE_MODAL) {
		return state;
	} else {
		let newState;
		const statement = state.modal.action;
		switch (statement) {
			case 'closeModal': {
				newState = {
					...state,
					modal: {
						shown: false,
						text: 'Something went wrong',
						action: 'closeModal',
					},
				};
				break; }
			case 'newRound': {
				newState = newRoundReducer(state, { type: NEW_ROUND });
				break; }
			default:
				newState = {
					...state,
					modal: {
						shown: false,
						text: 'Something went wrong',
						action: 'closeModal',
					},
				};
		}
		return newState;
	}
}


export default reduceReducers(
	resetGameReducer,
	newRoundReducer,
	playCardReducer,
	takeHitReducer,
	playerStand,
	closeModalReducer,
	// debugReducer,
	initialState
);
