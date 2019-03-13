/* eslint-env mocha */
import * as vet from 'vet';
import gameReducer from './gameReducer';

import isValidGamestate from '../models/isValidGamestate';

import { PLAY_CARD, TAKE_HIT, STAND, RESET_GAME, NEW_ROUND } from '../actions/userAction';

const assert = vet.utils.assert;

const assertIsValidGamestate = assert(
	isValidGamestate,
	(val) => `bad game state ${JSON.stringify(val)}`
);


describe(
	'Game Reducer',
	() => {
		it('can import gameState', () => {});

		it('initial state is valid', () => {
			const state = gameReducer();
			// state = gameReducer(state, {});
			assertIsValidGamestate(state);
		});

		it('can play a card', () => {
			let state = gameReducer();
			const action = {
				type: PLAY_CARD,
				payload: { playedCard: 2 },
			};
			state = gameReducer(state, action);
			assertIsValidGamestate(state);
		});

		it('can take hit', () => {
			let state = gameReducer();
			const action = {
				type: TAKE_HIT,
			};
			state = gameReducer(state, action);
			assertIsValidGamestate(state);
		});

		it('can run two actions', () => {
			let state = gameReducer();
			const action1 = {
				type: TAKE_HIT,
			};
			state = gameReducer(state, action1);
			const action2 = {
				type: PLAY_CARD,
				payload: { playedCard: 2 },
			};
			state = gameReducer(state, action2);
			assertIsValidGamestate(state);
		});

		it('cannot play same card twice', () => {
			let state = gameReducer();
			const action1 = {
				type: PLAY_CARD,
				payload: { playedCard: 2 },
			};
			state = gameReducer(state, action1);
			console.log('action1', state.player1);
			const action2 = {
				type: PLAY_CARD,
				payload: { playedCard: 2 },
			};
			state = gameReducer(state, action2);
			console.log('action2', state.player1);
			assertIsValidGamestate(state);
		});

		it('can stand', () => {
			let state = gameReducer();
			const action = {
				type: STAND,
			};
			state = gameReducer(state, action);
			console.log(state.player1);
			assertIsValidGamestate(state);
		});

		it('can reset', () => {
			let state = gameReducer();
			const action = {
				type: TAKE_HIT,
			};
			const reset = {
				type: RESET_GAME,
			};
			state = gameReducer(state, action);
			console.log('dealerDeck: ', state.dealerDeck.slice(0, 4));
			console.log(state.player1);
			console.log('modal: ', state.modal);
			state = gameReducer(state, reset);
			console.log('dealerDeck: ', state.dealerDeck.slice(0, 4));
			console.log(state.player1);
			console.log('modal: ', state.modal);
			assertIsValidGamestate(state);
		});

		it('can start new round', () => {
			let state = gameReducer();
			const action1 = {
				type: TAKE_HIT,
			};
			const action2 = {
				type: PLAY_CARD,
				payload: { playedCard: 2 },
			};
			const newRound = {
				type: NEW_ROUND,
			};
			state = gameReducer(state, action1);
			state = gameReducer(state, action2);
			console.log('dealerDeck: ', state.dealerDeck.slice(0, 4));
			console.log(state.player1);
			console.log('modal: ', state.modal);
			state = gameReducer(state, newRound);
			console.log('dealerDeck: ', state.dealerDeck.slice(0, 4));
			console.log(state.player1);
			console.log('modal: ', state.modal);
			assertIsValidGamestate(state);
		});

		it('can trigger win with hit', () => {
			let state = gameReducer();
			state = {
				...state,
				dealerDeck: [ 1, 1 ],
				player1: {
					...state.player1,
					table: [ 19 ],
				},
			};
			const action = {
				type: TAKE_HIT,
			};
			const newRound = {
				type: NEW_ROUND,
			};
			state = gameReducer(state, action);
			console.log('dealerDeck: ', state.dealerDeck.slice(0, 4));
			console.log(state.player1);
			console.log('modal: ', state.modal);
			state = gameReducer(state, newRound);
			console.log('dealerDeck: ', state.dealerDeck.slice(0, 4));
			console.log(state.player1);
			console.log('modal: ', state.modal);
			assertIsValidGamestate(state);
		});

		it('can trigger bust with hit', () => {
			let state = gameReducer();
			state = {
				...state,
				dealerDeck: [ 1, 2 ],
				player1: {
					...state.player1,
					table: [ 19 ],
				},
			};
			const action = {
				type: TAKE_HIT,
			};
			const newRound = {
				type: NEW_ROUND,
			};
			state = gameReducer(state, action);
			console.log('dealerDeck: ', state.dealerDeck.slice(0, 4));
			console.log(state.player1);
			console.log('modal: ', state.modal);
			state = gameReducer(state, newRound);
			console.log('dealerDeck: ', state.dealerDeck.slice(0, 4));
			console.log(state.player1);
			console.log('modal: ', state.modal);
			assertIsValidGamestate(state);
		});

		it('can trigger win with playCard', () => {
			let state = gameReducer();
			state = {
				...state,
				player1: {
					...state.player1,
					hand: [ 1, 1, 1, 1 ],
					table: [ 19 ],
				},
			};
			const action = {
				type: PLAY_CARD,
				payload: { playedCard: 2 },
			};
			const newRound = {
				type: NEW_ROUND,
			};
			state = gameReducer(state, action);
			console.log(state.player1);
			console.log('modal: ', state.modal);
			state = gameReducer(state, newRound);
			console.log(state.player1);
			console.log('modal: ', state.modal);
			assertIsValidGamestate(state);
		});

		it('can trigger bust with playCard', () => {
			let state = gameReducer();
			state = {
				...state,
				player1: {
					...state.player1,
					hand: [ 2, 2, 2, 2 ],
					table: [ 19 ],
				},
			};
			const action = {
				type: PLAY_CARD,
				payload: { playedCard: 2 },
			};
			const newRound = {
				type: NEW_ROUND,
			};
			state = gameReducer(state, action);
			console.log(state.player1);
			console.log('modal: ', state.modal);
			state = gameReducer(state, newRound);
			console.log(state.player1);
			console.log('modal: ', state.modal);
			assertIsValidGamestate(state);
		});
	}
);
