import { atom } from "recoil";

export const kongaState = atom<boolean>({
	key: "konga",
	default: false
});
