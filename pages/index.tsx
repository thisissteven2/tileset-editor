import { NextPage } from "next";
import Assets, { AssetsType } from "../src/components/Assets";
import Button from "../src/components/Button";
import Buttons from "../src/components/modules/Buttons";
import Canvas from "../src/components/modules/Canvas";
import CanvasConfig from "../src/components/modules/CanvasConfig";
import Tileset from "../src/components/modules/Tileset";

import { CanvasProvider } from "../src/hooks/useCanvas";
import { ReferenceProvider } from "../src/hooks/useReference";
import { getAssets } from "../src/lib/getAssets";

const Home = ({ assets, folders }: AssetsType) => {
	return (
		<main className="layout">
			<div className="py-8">
				<h1 className="mb-2">Tileset Editor</h1>
				<p className="mb-4">Create and Export your tileset assets!</p>
				<ReferenceProvider>
					<CanvasProvider>
						<div className="flex gap-4 justify-between">
							<Assets assets={assets} folders={folders} />
							<CanvasConfig />
						</div>
						<div className="flex gap-8 justify-between flex-wrap">
							<Tileset />
							<div>
								<Buttons />
								<Canvas />
							</div>
						</div>
					</CanvasProvider>
				</ReferenceProvider>
			</div>
		</main>
	);
};

export default Home;

export async function getStaticProps() {
	const { folders, assets } = getAssets();
	return {
		props: {
			assets,
			folders,
		},
	};
}
