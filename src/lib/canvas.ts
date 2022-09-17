import React from "react";

export const tileSize = 32;

export type Layer = {
	[key: string]: [number, number, string];
};

type DrawProps = {
	canvasRef: React.MutableRefObject<HTMLCanvasElement>;
	tilesetRef: React.MutableRefObject<HTMLImageElement>;
	layersRef: React.MutableRefObject<Layer[]>;
};

export const draw = ({ canvasRef, layersRef }: DrawProps) => {
	const canvas = canvasRef.current;
	const ctx = canvas.getContext("2d");
	ctx?.clearRect(0, 0, canvas.width, canvas.height);

	const layers = layersRef.current;
	layers.forEach((layer) => {
		Object.keys(layer).forEach((key) => {
			//Determine x/y position of this placement from key ("3-4" -> x=3, y=4)
			const positionX = Number(key.split("-")[0]);
			const positionY = Number(key.split("-")[1]);
			const [tilesheetX, tilesheetY, src] = layer[key];

			if (ctx) ctx.imageSmoothingEnabled = false;

			const image = document.createElement("img");
			// bad code i know :/
			image.src = src as unknown as string;
			image.onload = () => {
				image.width = image.width * 2;
				image.height = image.height * 2;
			};

			ctx?.drawImage(
				image,
				(tilesheetX * tileSize) / 2, // tilesheet position
				(tilesheetY * tileSize) / 2, // tilesheet position
				tileSize / 2, // tilesheet width
				tileSize / 2, // tilesheet height
				positionX * tileSize, // canvas position
				positionY * tileSize, // canvas position
				tileSize, // canvas width
				tileSize // canvas height
			);
		});
	});
};

export const addOrDeleteTile = (
	layersRef: React.MutableRefObject<Layer[]>,
	selectedRef: React.MutableRefObject<number[]>,
	tilesetRef: React.MutableRefObject<HTMLImageElement>,
	layer: number,
	x: number,
	y: number,
	shiftKey: boolean
) => {
	const key = x + "-" + y;

	const layers = Array.from(layersRef.current);
	if (shiftKey) {
		delete layers[layer][key];
	} else {
		layers[layer][key] = [selectedRef.current[0], selectedRef.current[1], tilesetRef.current.src];
	}

	layersRef.current = layers;
};

export const exportImage = (canvasRef: React.MutableRefObject<HTMLCanvasElement>) => {
	const canvas = canvasRef.current;
	const data = canvas.toDataURL();
	const image = new Image();
	image.src = data;

	const w = window.open("");
	w?.document.write(image.outerHTML);
};
