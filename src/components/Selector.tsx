import { tileSize } from "../lib/canvas";

type SelectorProps = {
	x: number;
	y: number;
};

export default function Selector({ x, y }: SelectorProps) {
	return (
		<div
			className="absolute border-4 border-secondary"
			style={{
				width: tileSize,
				height: tileSize,
				top: y * tileSize + "px",
				left: x * tileSize + "px",
			}}
		></div>
	);
}
