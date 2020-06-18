import jsQR from 'jsqr';
import Framework from 'froobit';
import { isMobile } from 'froobit/lib/mobile';
import { config } from '../lib/config';
import { NoopFunc } from '../../app/lib/utils';
import { getExtractionArea } from '../lib/extraction';
import { OpticalFlowEngine } from '../lib/opticalflow';
import { jsQRCornerPoints, jsQRTrackingPoints } from '../lib/helpers';

export class CaptureBackground extends Framework.Entity {
	constructor(onDetect = NoopFunc) {
		super();
		this.capture = null;
		this.videoSettings = null;
		this.onDetect = onDetect;
		this.opticalFlow = null;
		this.lastPoints = null;
		this.clearDetection = null;
		this.cornerDiffs = null;
		this.startMarkers = null;
		this.result = null;
	}
	initialize(p) {
		const facingMode = isMobile() ? 'environment' : 'user';
		this.capture = p.createCapture({
			...config.videoOptions,
			video: {
				...config.videoOptions.video,
				facingMode,
			},
		}, (stream) => {
			const [ videoTrack ] = stream.getVideoTracks();
			this.videoSettings = videoTrack.getSettings();
		});
		this.capture.hide();
		this.opticalFlow = OpticalFlowEngine(p.width, p.height);
	}
	calcParams(p) {
		const {
			width: vw,
			height: vh,
		} = this.videoSettings;
		const ww = p.width;
		const hh = p.height;
		const dh = hh;
		const scale = dh / vh;
		let dw = Math.ceil(vw * scale);
		let sw = vw;
		let dx = (ww - dw) / 2;
		if (dx < 0) {
			dw += dx;
			sw += dx;
		}
		return [ dx, 0, dw, dh, 0, 0, sw, vh ];
	}
	getImageData(p, lastPoints) {
		const params = getExtractionArea(p, lastPoints);
		return {
			imgData: p.canvas.getContext('2d').getImageData(...params),
			sx: params[0],
			sy: params[1],
		};
	}
	render(p) {
		if (!this.videoSettings) {
			p.background(50);
			return;
		}
		p.background(20);
		p.image(this.capture, ...this.calcParams(p));
		let { imgData, sx, sy } = this.getImageData(p);

		const points = this.opticalFlow.update(imgData);
		if (points) {
			const corners = this.result.getCorners({
				topLeft: points[0],
				topRight: points[2],
				alignmentPattern: points[3],
				bottomLeft: points[1],
				dimension: this.result.dimension,
			});
			const cornerPoints = jsQRCornerPoints(corners);
			this.onDetect(cornerPoints);
			this.lastPoints = cornerPoints;
		} else {
			const { imgData: img } = this.getImageData(p, this.lastPoints);
			this.result = jsQR(
				img.data,
				img.width,
				img.height,
				{
					inversionAttempts: 'dontInvert',
				},
			);
			if (this.result) {
				clearTimeout(this.clearDetection);
				const pts = jsQRCornerPoints(this.result, sx, sy);
				this.onDetect(pts);
				const trackingPoints = jsQRTrackingPoints(this.result, sx, sy);
				this.opticalFlow.track(trackingPoints);
			} else {
				this.clearDetection = setTimeout(() => {
					this.onDetect(null);
					this.lastPoints = null;
				}, 50);
			}
		}
	}
}