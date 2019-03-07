require('@babel/register')({
	presets: [
		'@babel/preset-env',
	],
	exclude: /node_modules/,

	// enabling the cache can cause intermittent failures
	cache: false,
});
