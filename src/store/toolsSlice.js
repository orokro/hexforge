/*
	toolsSlice.js
	-------------

	Tool settings & actions.
*/

// imports
// (none)

// constants and globals
export const toolsSlice = (set, get) => ({
	activeTool: "sculpt",			// "sculpt" | "paint" | "inspect"
	radius: 2.25,
	strength: 0.25,
	falloff: true,
	paintKind: "grass",

	setTool: (tool) => set({ activeTool: tool }),
	setRadius: (r) => set({ radius: Math.max(0, +r) }),
	setStrength: (s) => set({ strength: +s }),
	setFalloff: (v) => set({ falloff: !!v }),
	setPaintKind: (k) => set({ paintKind: k }),
});
