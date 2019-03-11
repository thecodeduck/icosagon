import * as vet from 'vet';

const matches = vet.objects.matches;
const optional = vet.optional;
const isAtMostLength = (len) => (val) => vet.arrays.isArray(val) && val.length <= len;
const isAtMost = (a) => (val) => vet.numbers.isNumber(val) && val <= a;


export default matches(
	{
		dealerDeck: isAtMostLength(40),
		player1: {
			table: (isAtMostLength(4)),
			hand: optional(isAtMostLength(4)),
			total: vet.number.isNumber,
			stand: vet.booleans.isBoolean,
			// wins: isAtMost(3),
			wins: vet.number.isNumber,
			losses: vet.number.isNumber,
		},
		modal: {
			shown: vet.booleans.isBoolean,
			text: vet.strings.isString,
			button: vet.functions.isFunction,
		},
	}
);

// code: optional(
// 	vet.matchesAllOf(vet.arrays.isArray, vet.arrays.isLength(4))
// ),
