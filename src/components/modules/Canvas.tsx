import { useCanvas } from "../../hooks/useCanvas";
import { useReference } from "../../hooks/useReference";
import { tileSize } from "../../lib/canvas";

export default function Canvas() {
	const { tiles } = useCanvas();
	const { canvasRef } = useReference();

	return (
		<canvas
			ref={canvasRef}
			className="bg-light-bg ring-primary ring-2 ring-offset-4 ring-offset-bg mt-6"
			width={tiles[0] * tileSize}
			height={tiles[1] * tileSize}
			style={{ imageRendering: "pixelated" }}
		></canvas>
	);
}
