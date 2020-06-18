import jsfeat from 'jsfeat';

/* eslint
    no-bitwise:0,
    new-cap: 0
*/
export const OpticalFlowEngine = (width, height) => {
	let currImgPyr = new jsfeat.pyramid_t(9);
	let prevImgPyr = new jsfeat.pyramid_t(9);

	currImgPyr.allocate(width, height, jsfeat.U8_t | jsfeat.C1_t);
	prevImgPyr.allocate(width, height, jsfeat.U8_t | jsfeat.C1_t);

	let pointCount = 0;
	let pointStatus = new Uint8Array(60);
	let prevXY = new Float32Array(60 * 2);
	let currXY = new Float32Array(60 * 2);

	const options = {
		winSize: 25,
		maxIterations: 30,
		epsilon: 0.008,
		minEigen: 0.008,
	};

	const pruneOflowPoints = () => {
		const n = pointCount;
		let i = 0;
		let j = 0;

		const points = [];
		for (; i < n; ++i) {
			// eslint-disable-next-line
			if (pointStatus[i] == 1) {
				if (j < i) {
					currXY[j << 1] = currXY[i << 1];
					currXY[(j << 1) + 1] = currXY[(i << 1) + 1];
				}
				points.push({
					x: currXY[j << 1],
					y: currXY[(j << 1) + 1],
				});
				++j;
			}
		}
		pointCount = j;
		return points;
	};

	return {
		track: (points) => {
			points.forEach(({ x, y }, idx) => {
				currXY[idx << 1] = x;
				currXY[(idx << 1) + 1] = y;
			});
			pointCount = points.length;
		},
		update: (imageData) => {
			const ptXY = prevXY;
			prevXY = currXY;
			currXY = ptXY;
			const pyr = prevImgPyr;
			prevImgPyr = currImgPyr;
			currImgPyr = pyr;

			jsfeat.imgproc.grayscale(imageData.data, width, height, currImgPyr.data[0]);

			currImgPyr.build(currImgPyr.data[0], true);

			jsfeat.optical_flow_lk.track(
				prevImgPyr,
				currImgPyr,
				prevXY,
				currXY,
				pointCount,
				options.winSize | 0,
				options.maxIterations | 0,
				pointStatus,
				options.epsilon,
				options.minEigen,
			);

			const points = pruneOflowPoints();
			if (points && points.length === 4) {
				return points;
			}
			return null;
		},
	};
};