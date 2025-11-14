/*
	store/index.js
	--------------

	Combines slices into a single Zustand store.
*/

// imports
import { create } from "zustand";
import { toolsSlice } from "./toolsSlice";
import { worldSlice } from "./worldSlice";
import { viewSlice } from "./viewSlice";

// constants and globals
export const useStore = create((set, get) => ({
	...toolsSlice(set, get),
	...worldSlice(set, get),
	...viewSlice(set, get),
}));
