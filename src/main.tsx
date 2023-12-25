import React from "react";
import * as ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import SillyGame from "./pages/silly-game";
import MainPage from "./pages/main";
import KongaProvider from "./engines/konga/provider";

import "./index.css";

const router = createBrowserRouter([
	{
		path: "/silly-game",
		Component: () => <SillyGame />
	},
	{
		path: "*",
		Component: () => <MainPage />
	}
]);

ReactDOM.createRoot(document.querySelector("#root")!).render(
	<React.StrictMode>
		<RecoilRoot>
			<RouterProvider router={router} />
			<KongaProvider />
		</RecoilRoot>
	</React.StrictMode>
);
