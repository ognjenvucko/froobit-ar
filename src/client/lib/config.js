export const config = {
	viewport: {
		width: 780,
		height: 585,
	},
	containerId: 'canvasContainer',
	videoOptions: {
		video: {
			width: {
				ideal: 1280,
			},
			height: {
				ideal: 720,
			},
			frameRate: {
				ideal: 30,
				min: 15,
			},
			facingMode: {
				exact: 'environment',
			},
		},
	},
};