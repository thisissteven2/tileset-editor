import { useCanvas } from "../../hooks/useCanvas";
import { useReference } from "../../hooks/useReference";
import Button from "../Button";
import { exportImage } from "../../lib/canvas";

export default function Buttons() {
	const { canvasRef } = useReference();
	const { layer, setLayer, clearCanvas } = useCanvas();

	const nextLayer = layer + 1 > 2 ? 0 : layer + 1;

	return (
		<div className="flex justify-end gap-4">
			<Button variant="primary" onClick={() => setLayer(nextLayer)}>
				Current Layer: {layer}
			</Button>
			<Button variant="primary" onClick={() => exportImage(canvasRef)}>
				Export
			</Button>
			<Button variant="secondary" onClick={clearCanvas}>
				Clear All
			</Button>
		</div>
	);
}
