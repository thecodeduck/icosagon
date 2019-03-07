/* eslint-env mocha */
import * as vet from 'vet';
import gameReducer from './gameReducer';

import isValidGamestate from '../models/isValidGamestate';

import { PLAY_CARD } from '../actions/userAction';

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
			let state = gameReducer();
			// state = gameReducer(state, {});
			assertIsValidGamestate(state);
		});

		it('can play a card', () => {
			let state = gameReducer();
			let action = {
				type: PLAY_CARD,
				payload: { playedCard: 1 },
			};
			state = gameReducer(state, action);

			assertIsValidGamestate(state);
		});
	}
);
