import React from "react";
import { getCoords, useReference } from "../../hooks/useReference";
import Selector from "../Selector";

export default function Tileset() {
	const { selectedRef, tilesetRef } = useReference();

	// state for optimistic update of selector position
	const [selected, setSelected] = React.useState([0, 0]);

	React.useEffect(() => {
		const tileset = tilesetRef.current;

		const handleMouseDown = (e: MouseEvent) => {
			const coords = getCoords(e);
			selectedRef.current = coords;
			setSelected(coords);
		};
		tileset?.addEventListener("mousedown", handleMouseDown);

		return () => tileset?.removeEventListener("mousedown", handleMouseDown);
	}, [selectedRef, tilesetRef]);

	return (
		<div className="relative">
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<img ref={tilesetRef} alt="Select an asset" className="text-primary" />
			<Selector x={selected[0]} y={selected[1]} />
		</div>
	);
}
