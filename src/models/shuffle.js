export const DEALER_LIBRARY = [
	1, 1, 1, 1,
	2, 2, 2, 2,
	3, 3, 3, 3,
	4, 4, 4, 4,
	5, 5, 5, 5,
	6, 6, 6, 6,
	7, 7, 7, 7,
	8, 8, 8, 8,
	9, 9, 9, 9,
	10, 10, 10, 10,
];
export const PLAYER_LIBRARY = [
	1, -1,
	2, -2,
	3, -3,
	4, -4,
	5, -5,
	6, -6,
];

// Fisher-Yates shuffle
export function shuffle(arr) {
	const a = arr.slice(); // creating a copy of the original array
	let i = a.length;
	while (i > 0) {
		const index = Math.floor(Math.random() * i);
		--i;
		const temp = a[i];
		a[i] = a[index];
		a[index] = temp;
	}
	return a;
}
