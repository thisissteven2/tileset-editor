import * as React from "react";
import { draw, addOrDeleteTile, Layer, tileSize } from "../lib/canvas";

export const getCoords = (e: MouseEvent) => {
	const target = e.target as HTMLElement;

	const { x, y } = target.getBoundingClientRect();
	const mouseX = e.clientX - x;
	const mouseY = e.clientY - y;
	return [Math.floor(mouseX / tileSize), Math.floor(mouseY / tileSize)];
};

type ReferenceContextValues = {
	layersRef: React.MutableRefObject<Layer[]>;
	selectedRef: React.MutableRefObject<number[]>;
	tilesetRef: React.MutableRefObject<HTMLImageElement>;
	canvasRef: React.MutableRefObject<HTMLCanvasElement>;
};

const ReferenceContext = React.createContext({} as ReferenceContextValues);

export const ReferenceProvider = ({ children }: { children: React.ReactNode }) => {
	const layersRef = React.useRef<Layer[]>([{}, {}, {}]);
	const selectedRef = React.useRef([0, 0]);
	const tilesetRef = React.useRef() as React.MutableRefObject<HTMLImageElement>;
	const canvasRef = React.useRef() as React.MutableRefObject<HTMLCanvasElement>;

	return (
		<ReferenceContext.Provider value={{ layersRef, selectedRef, tilesetRef, canvasRef }}>
			{children}
		</ReferenceContext.Provider>
	);
};

export const useReference = () => React.useContext(ReferenceContext);
