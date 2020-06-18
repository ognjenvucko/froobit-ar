export const chance = (p = 0.5) => {
	return Math.random() < p;
};