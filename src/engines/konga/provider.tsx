import { useRecoilValue } from "recoil";
import { useEffect, useState } from "react";

import { kongaState } from "../../states";

import { KongaCanvas, useKongaAudio } from "./engine";
import { Vector2 } from "./vector2";
import styles from "./provider.module.css";

function Konga({ enabled }: { enabled: boolean }) {
	const [size, setSize] = useState(
		Vector2(window.innerWidth, window.innerHeight)
	);

	useEffect(() => {
		window.addEventListener("resize", onResize);

		return () => window.removeEventListener("resize", onResize);
	});
	function onResize() {
		setSize(Vector2(window.innerWidth, window.innerHeight));
	}

	if (enabled)
		return (
			<KongaCanvas
				className={styles.konga_provider}
				height={size.y}
				width={size.x}
			/>
		);

	return null;
}

export default function KongaProvider() {
	const konga = useRecoilValue(kongaState);
	const kongaAudio = useKongaAudio("main-konga-root");

	useEffect(() => {
		if (!konga && !kongaAudio.paused) {
			kongaAudio.currentTime = 0.5;
			kongaAudio.pause();
		}

		if (konga && kongaAudio.paused) {
			kongaAudio.currentTime = 0.5;
			// Make not blaring loud
			kongaAudio.volume = 0.5;

			void kongaAudio.play();
		}
	}, [konga, kongaAudio]);

	return <Konga enabled={konga} />;
}
