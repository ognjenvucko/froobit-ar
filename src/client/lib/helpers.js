export const jsQRCornerPoints = (data, sx = 0, sy = 0) => {
	const {
		location: {
			topRightCorner: trc,
			topLeftCorner: tlc,
			bottomRightCorner: brc,
			bottomLeftCorner: blc,
		},
	} = data || {};
	return [ tlc, blc, trc, brc ].map((p) => {
		return {
			x: p.x + sx,
			y: p.y + sy,
		};
	});
};

export const jsQRTrackingPoints = (data, sx = 0, sy = 0) => {
	const {
		location: {
			topRightFinderPattern: trp,
			topLeftFinderPattern: tlp,
			bottomLeftFinderPattern: blp,
			bottomRightAlignmentPattern: bap,
		},
	} = data || {};
	return [ tlp, blp, trp, bap ].map((p) => {
		return {
			x: p.x + sx,
			y: p.y + sy,
		};
	});
};