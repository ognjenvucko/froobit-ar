import { Replacement } from '../entity/Replacement';
import { AREvents } from '../lib/events';
import { getTransformationMatrix } from '../lib/transformation';
import { DEFAULT_SRC_POS } from '../lib/constants';


const ReplacementController = ({
	accept,
}) => {
	const rep = new Replacement();
	accept(AREvents.ON_DETECT, (coords) => {
		const tMatrix = getTransformationMatrix([
			DEFAULT_SRC_POS[0],
			DEFAULT_SRC_POS[3],
			DEFAULT_SRC_POS[1],
			DEFAULT_SRC_POS[2],
		], coords);
		rep.update(tMatrix);
	});
	accept(AREvents.NO_DETECTION, () => {
		rep.update();
	});
	return rep;
};

export default ReplacementController;