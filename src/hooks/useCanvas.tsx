import * as React from "react";
import { draw, addOrDeleteTile, Layer } from "../lib/canvas";
import { getCoords, useReference } from "./useReference";

type CanvasContextValues = {
	tiles: number[];
	setWidth: (width: string) => void;
	setHeight: (height: string) => void;
	layer: number;
	setLayer: React.Dispatch<React.SetStateAction<number>>;
	addOrDeleteTile: (
		layersRef: React.MutableRefObject<Layer[]>,
		selectedRef: React.MutableRefObject<number[]>,
		tilesetRef: React.MutableRefObject<HTMLImageElement>,
		layer: number,
		x: number,
		y: number,
		shiftKey: boolean
	) => void;
	clearCanvas: () => void;
};

const CanvasContext = React.createContext({} as CanvasContextValues);

export const CanvasProvider = ({ children }: { children: React.ReactNode }) => {
	const [tiles, setTiles] = React.useState([20, 10]);
	const [layer, setLayer] = React.useState<number>(0);
	const [isMouseDown, setIsMouseDown] = React.useState(false);

	const { canvasRef, tilesetRef, layersRef, selectedRef } = useReference();

	const updateCanvas = () => draw({ canvasRef, tilesetRef, layersRef });

	const clearCanvas = () => {
		layersRef.current = [{}, {}, {}];
		updateCanvas();
	};

	const setWidth = (width: string) => {
		setTiles((prev) => [Number(width), prev[1]]);
	};

	const setHeight = (height: string) => {
		setTiles((prev) => [prev[0], Number(height)]);
	};

	React.useEffect(() => {
		updateCanvas();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [tiles]);

	React.useEffect(() => {
		const canvas = canvasRef.current;

		const handleClick = (e: MouseEvent) => {
			setIsMouseDown(true);
			const [x, y] = getCoords(e);
			addOrDeleteTile(layersRef, selectedRef, tilesetRef, layer, x, y, e.shiftKey);
			updateCanvas();
		};

		const handleMove = (e: MouseEvent) => {
			if (isMouseDown) {
				const [x, y] = getCoords(e);
				addOrDeleteTile(layersRef, selectedRef, tilesetRef, layer, x, y, e.shiftKey);
				updateCanvas();
			}
		};

		const handleLeave = () => setIsMouseDown(false);

		canvas.addEventListener("mousedown", handleClick);
		canvas.addEventListener("mousemove", handleMove);
		canvas.addEventListener("mouseup", handleLeave);
		canvas.addEventListener("mouseleave", handleLeave);

		return () => {
			canvas.removeEventListener("mousedown", handleClick);
			canvas.removeEventListener("mousemove", handleMove);
			canvas.removeEventListener("mouseup", handleLeave);
			canvas.removeEventListener("mouseleave", handleLeave);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isMouseDown, layer]);

	return (
		<CanvasContext.Provider value={{ tiles, setWidth, setHeight, layer, setLayer, addOrDeleteTile, clearCanvas }}>
			{children}
		</CanvasContext.Provider>
	);
};

export const useCanvas = () => React.useContext(CanvasContext);
