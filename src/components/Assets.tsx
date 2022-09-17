import Image from "next/image";
import * as React from "react";
import { useReference } from "../hooks/useReference";
import Button from "./Button";

export const ASSETS_PATH = "/assets/1/";

export type AssetsType = {
	folders: string[];
	assets: {
		[folder: string]: string[];
	};
};

export default function Assets({ folders, assets }: AssetsType) {
	const [selected, setSelected] = React.useState(() => folders[0]);
	const [selectedAsset, setSelectedAsset] = React.useState(() => ASSETS_PATH + selected + assets[selected][0]);
	const assetsSrc = assets[selected].map((asset) => ASSETS_PATH + selected + asset);

	const { tilesetRef } = useReference();

	React.useEffect(() => {
		const tileset = tilesetRef.current;
		const image = document.createElement("img");
		image.src = selectedAsset;
		tileset.src = selectedAsset;
		image.onload = () => {
			tileset.width = image.width * 2;
			tileset.height = image.height * 2;
		};
	}, [selectedAsset, tilesetRef]);

	return (
		<div>
			<h2 className="mb-2 h4">Pick an asset</h2>
			<div className="space-x-4 mb-4">
				{folders.map((folder) => {
					return (
						<Button
							onClick={() => setSelected(folder)}
							variant={selected === folder ? "primary" : "secondary"}
							key={folder}
						>
							{folder}
						</Button>
					);
				})}
			</div>
			<div className="flex gap-4">
				{assetsSrc.map((src) => {
					return (
						<button
							onClick={() => setSelectedAsset(src)}
							className={`aspect-square w-16 relative mb-2 border-4 border-bg ${
								selectedAsset === src && "ring-4 ring-primary"
							}`}
							key={src}
						>
							<Image src={src} alt="Asset" layout="fill" objectFit="contain" />
						</button>
					);
				})}
			</div>
		</div>
	);
}
