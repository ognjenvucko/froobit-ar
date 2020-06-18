import { CaptureBackground } from '../entity/CaptureBackground';
import { AREvents } from '../lib/events';

const CaptureBackgroundController = ({
	trigger,
}) => {
	const onDetect = (data) => {
		if (data) {
			trigger(AREvents.ON_DETECT, data);
			return;
		}
		trigger(AREvents.NO_DETECTION);
	};
	return new CaptureBackground(onDetect);
};

export default CaptureBackgroundController;