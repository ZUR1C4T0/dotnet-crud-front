import { create } from "zustand";

type State = {
	userId: number;
};

type Actions = {
	setUserId: (id: number) => void;
	resetUserId: () => void;
};

export const useUserStore = create<State & Actions>((set) => ({
	userId: 0,
	setUserId: (id: number) => set(() => ({ userId: id })),
	resetUserId: () => set(() => ({ userId: 0 })),
}));
