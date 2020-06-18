export const getExtractionArea = (p, lastPoints) => {
	// /*
	if (!lastPoints) {
		return [ 0, 0, p.width, p.height ];
	}
	const OFFSET = 50; // px
	const coords = [ ...lastPoints ];
	const { width, height } = p;
	let min = { x: width, y: height };
	let max = { x: 0, y: 0 };
	coords.forEach(({ x, y }) => {
		if (x < min.x) {
			min.x = x;
		}
		if (y < min.y) {
			min.y = y;
		}
		if (x > max.x) {
			max.x = x;
		}
		if (y > max.y) {
			max.y = y;
		}
	});
	const sx = Math.max(0, min.x - OFFSET);
	const sy = Math.max(0, min.y - OFFSET);
	const tx = Math.min(width, max.x + OFFSET);
	const ty = Math.min(height, max.y + OFFSET);
	const w = tx - sx;
	const h = ty - sy;
	return [ sx, sy, w, h ];
	/**/
};