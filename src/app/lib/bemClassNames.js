const ensurePrefix = (modifier) => {
	if (/^--/.test(modifier)) {
		return modifier;
	}
	return `--${modifier}`;
};

export const bemClassNames = (baseClass = '', options = '') => {
	return Object.keys(options).reduce((acc, curr) => {
		if (!options[curr]) {
			return acc;
		}
		return `${acc} ${baseClass}${ensurePrefix(curr)}`;
	}, baseClass);
};