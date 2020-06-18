export const getTransformationMatrix = (fromPoints = [], toPoints = []) => {
	const fp = [
		{ x: fromPoints[0].x, y: fromPoints[0].y },
		{ x: fromPoints[0].x, y: fromPoints[1].y },
		{ x: fromPoints[2].x, y: fromPoints[0].y },
		{ x: fromPoints[2].x, y: fromPoints[1].y },
	];
	const tp = [ ...toPoints ];
	// eslint-disable-next-line
    const E = $M([
		[ fp[0].x, fp[0].y, 1, 0, 0, 0, -fp[0].x * tp[0].x, -fp[0].y * tp[0].x ],
		[ 0, 0, 0, fp[0].x, fp[0].y, 1, -fp[0].x * tp[0].y, -fp[0].y * tp[0].y ],
		[ fp[1].x, fp[1].y, 1, 0, 0, 0, -fp[1].x * tp[1].x, -fp[1].y * tp[1].x ],
		[ 0, 0, 0, fp[1].x, fp[1].y, 1, -fp[1].x * tp[1].y, -fp[1].y * tp[1].y ],
		[ fp[2].x, fp[2].y, 1, 0, 0, 0, -fp[2].x * tp[2].x, -fp[2].y * tp[2].x ],
		[ 0, 0, 0, fp[2].x, fp[2].y, 1, -fp[2].x * tp[2].y, -fp[2].y * tp[2].y ],
		[ fp[3].x, fp[3].y, 1, 0, 0, 0, -fp[3].x * tp[3].x, -fp[3].y * tp[3].x ],
		[ 0, 0, 0, fp[3].x, fp[3].y, 1, -fp[3].x * tp[3].y, -fp[3].y * tp[3].y ],

	]);

	// eslint-disable-next-line
    const vect = $V([tp[0].x, tp[0].y, tp[1].x, tp[1].y, tp[2].x, tp[2].y, tp[3].x, tp[3].y]);

	const r = E.inverse().x(vect);

	// eslint-disable-next-line
    const resM = $M([
		[ r.e(1), r.e(2), 0, r.e(3) ],
		[ r.e(4), r.e(5), 0, r.e(6) ],
		[ 0, 0, 1, 0 ],
		[ r.e(7), r.e(8), 0, 1 ],
	]);
	const SIZE = 4;
	const res = [];
	for (let i = 1; i <= SIZE; i++) {
		for (let j = 1; j <= SIZE; j++) {
			res.push(resM.e(j, i)
				.toFixed(8)
				.replace(/[0]+$/, '')
				.replace(/\.$/, ''));
		}
	}
	return res;
};