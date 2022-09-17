import { useCanvas } from "../../hooks/useCanvas";
import Input from "../Input";

export default function CanvasConfig() {
	const { tiles, setWidth, setHeight } = useCanvas();
	return (
		<div className="w-44 mb-4">
			<h2 className="h3 mb-2">Canvas</h2>
			<form action="" className="flex flex-col gap-2">
				<Input
					id="width"
					label="Width:"
					value={tiles[0]}
					className="w-12 rounded-sm px-2 py-1 text-xs"
					onChange={(e) => setWidth(e.target.value)}
				/>
				<Input
					id="height"
					label="Height:"
					value={tiles[1]}
					className="w-12 rounded-sm px-2 py-1 text-xs"
					onChange={(e) => setHeight(e.target.value)}
				/>
			</form>
		</div>
	);
}
