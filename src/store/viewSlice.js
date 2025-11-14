/*
	viewSlice.js
	------------

	View state: hover/selection, input flags.
*/

// imports
// (none)

// constants and globals
export const viewSlice = (set, get) => ({
	hover: null,			// { q,r } | null
	selection: null,		// { q,r } | null
	mouseDown: false,
	shift: false,

	setHover: (h) => set({ hover: h }),
	setSelection: (s) => set({ selection: s }),
	setMouseDown: (v) => set({ mouseDown: !!v }),
	setShift: (v) => set({ shift: !!v }),
});
