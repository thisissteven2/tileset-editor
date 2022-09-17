import path from "path";
import fs from "fs";
import { ASSETS_PATH } from "../components/Assets";

type Asset = {
	[folder: string]: string[];
};

export const getAssets = () => {
	const PATH = path.join(process.cwd(), `/public/${ASSETS_PATH}`);
	const folders = fs.readdirSync(PATH, { withFileTypes: true }).map((folder) => folder.name + "/");

	const assets: Asset = {};
	folders.forEach((folder) => {
		assets[folder] = fs.readdirSync(PATH + `/${folder}`);
	});
	return { folders, assets };
};
