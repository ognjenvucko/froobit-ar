import Framework, { scene } from 'froobit';
import { images } from './src/client/assets/images';
import { config } from './src/client/lib/config';
import { startReactFrontend } from './src/app';
import { Layers } from './src/client/lib/layers';
import CaptureBackgroundController from './src/client/controller/CaptureBackgroundController';
import ReplacementController from './src/client/controller/ReplacementController';
import './src/style/style.scss';

// Entry point
const assets = {
	images,
};

const {
	viewport,
	containerId,
} = config;

const ARStage = {
	name: 'ARStage',
	runFirst: true,
	controllers: [
		CaptureBackgroundController,
		ReplacementController,
	],
};

const options = {
	assets,
	autoLoad: true,
	containerId,
	scene: scene(viewport.width, viewport.height),
	loading: {
		text: 'Loading...',
	},
	fullscreen: true,
	landscape: true,
	layers: Layers,
};

const arApp = Framework.with([ ARStage ], options);

startReactFrontend({ arApp });