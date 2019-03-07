import * as vet from 'vet';

const matches = vet.objects.matches;
const optional = vet.optional;
const isAtMostLength = (len) => (val) => vet.arrays.isArray(val) && val.length <= len;


export default matches(
	{
		wins: vet.numbers.isNumber,
		losses: vet.numbers.isNumber,
		history: vet.arrays.isArray,
		playerDeck: {
			active: optional(isAtMostLength(10)),
			available: optional(vet.arrays.isArray),
		},
		extras: {
			// extraProperty: vet.booleans.isBoolean,
		},
	}
);
