"use client";

import {
	PropsWithChildren,
	createContext,
	useContext,
	useEffect,
	useState
} from "react";

export interface Heartbeat {
	bpm: number;
	timestamp: number;
}

export interface SocketContextProps {
	socket: WebSocket | null;
	latestHeartbeat: Heartbeat | null;
}
const SocketContext = createContext<SocketContextProps>({
	latestHeartbeat: {
		bpm: 69,
		timestamp: 69
	},
	socket: null
});

export const SocketProvider = ({ children }: PropsWithChildren) => {
	const [heartbeat, setHeartbeat] = useState<Heartbeat | null>(null);
	const [socket, setSocket] = useState<WebSocket | null>(null);

	useEffect(() => {
		(async () => {
			const initialHeartbeat = await fetch("https://health.nobu.sh/", {
				cache: "no-cache"
			}).then((response) => response.json());

			setHeartbeat(initialHeartbeat);
		})().catch(console.error);
	}, []);

	useEffect(() => {
		const socket = new WebSocket("wss://gateway.nobu.sh");
		setSocket(socket);

		socket.addEventListener("open", () => {
			socket.send("sub:nobu_health");
			console.debug("[s]", "connected!");
		});
		socket.addEventListener("close", () => {
			console.debug("[s]", "disconnected!");
		});
		socket.addEventListener("error", (error) => {
			console.error("[s] error:", error);
		});
		socket.addEventListener("message", (event) => {
			const data = String(event.data);

			if (data === "ack") {
				return socket.send("nack");
			}

			const [action, ...rest] = data.split(":");
			if (action !== "pub") {
				return console.debug("[s]", `${action}: ${rest.join(":")}`);
			}

			const [channels, ...payload] = rest.join(":").split(":");
			if (!channels.includes("nobu_health")) {
				return console.debug("[s]", `pub: ${channels}: ${payload.join(":")}`);
			}

			const message = JSON.parse(payload.join(":"));
			setHeartbeat({
				bpm: message.bpm,
				timestamp: message.at
			});

			console.debug("[s]", `health update:`, message);
		});

		return () => {
			socket.close();
			setSocket(null);
		};
	}, []);

	return (
		<SocketContext.Provider value={{ latestHeartbeat: heartbeat, socket }}>
			{children}
		</SocketContext.Provider>
	);
};

export const useSocket = () => useContext(SocketContext);
