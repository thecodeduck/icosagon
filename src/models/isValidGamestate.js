import * as vet from 'vet';

const matches = vet.objects.matches;
const optional = vet.optional;
const isAtMostLength = (len) => (val) => vet.arrays.isArray(val) && val.length <= len;
const isAtMost = (a) => (val) => vet.numbers.isNumber(val) && val <= a;


export default matches(
	{
		dealerDeck: vet.arrays.isLength(40),
		player1: {
			playerTable: vet.arrays.isArray,
			playerHand: optional(isAtMostLength(4)),
			playerTotal: vet.number.isNumber,
			playerWins: vet.number.isNumber,
		},
		round: isAtMost(3),
		turn: vet.number.isNumber,
	}
);

// code: optional(
// 	vet.matchesAllOf(vet.arrays.isArray, vet.arrays.isLength(4))
// ),
