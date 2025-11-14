/*
	materials.js
	------------

	PBR-ready material helpers (placeholder colors for now).
*/

// imports
// (none)

// constants and globals
export function kindToColor(kind) {
	switch (kind) {
		case "grass": return "#7fb069";
		case "stone": return "#8a8f98";
		case "dirt": return "#8b5a2b";
		case "water": return "#3e7cb1";
		default: return "#cccccc";
	}
}
