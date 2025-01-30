import React from "react";
import * as ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import MainPage from "./pages/main";
import KongaProvider from "./engines/konga/provider";
import { SocketProvider } from "./components/heartrate";

import "./index.css";

const router = createBrowserRouter([
	{
		path: "*",
		Component: () => <MainPage />
	}
]);

ReactDOM.createRoot(document.querySelector("#root")!).render(
	<React.StrictMode>
		<SocketProvider>
			<RecoilRoot>
				<RouterProvider router={router} />
				<KongaProvider />
			</RecoilRoot>
		</SocketProvider>
	</React.StrictMode>
);
