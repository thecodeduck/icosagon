/* eslint-env mocha */
import * as vet from 'vet';
import gameReducer from './gameReducer';

import isValidGamestate from '../models/isValidGamestate';

import { PLAY_CARD, TAKE_HIT } from '../actions/userAction';

const assert = vet.utils.assert;

const assertIsValidGamestate = assert(
	isValidGamestate,
	(val) => 'bad game state ' + JSON.stringify(val)
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
	}
);
