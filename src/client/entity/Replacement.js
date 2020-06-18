import Framework from 'froobit';
import { Layers } from '../lib/layers';
import { DEFAULT_SRC_POS } from '../lib/constants';

export class Replacement extends Framework.Entity {
	update(tMatrix) {
		this.tMatrix = tMatrix;
	}
	layer() {
		return Layers.FRONT_GL();
	}
	render(p, { texture }) {
		if (this.tMatrix) {
			p.translate(-p.width / 2, -p.height / 2);
			p.textureMode(p.NORMAL);
			p.texture(texture);
			p.ambientLight(255);
			p.applyMatrix(...this.tMatrix);
			p.beginShape(p.TRIANGLE_FAN);
			DEFAULT_SRC_POS.forEach(({
				x,
				y,
				uv,
			}) => {
				p.vertex(x, y, 5, ...uv);
			});
			p.endShape(p.CLOSE);
		}
	}
}