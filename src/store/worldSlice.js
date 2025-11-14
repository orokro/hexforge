/*
	worldSlice.js
	-------------

	World state: cells map + sculpt/paint + export/import.
*/

// imports
import { EDGE, TILE_HEIGHT, forEachInRadius, falloff, key } from "../lib/hex";

// constants and globals
export const worldSlice = (set, get) => ({
	meta: { version: 1, edge: EDGE, tileHeight: TILE_HEIGHT },
	cells: new Map(),	// key -> { q,r,height,kind }

	applySculpt(center, radius, strength, useFalloff, dir) {
		const prev = get().cells;
		const next = new Map(prev);
		forEachInRadius(center, Math.floor(radius), (q, r, d) => {
			const k = key(q, r);
			const cell = next.get(k) || { q, r, height: 0, kind: "grass" };
			const f = useFalloff ? falloff(d, Math.floor(radius)) : 1;
			const delta = dir * strength * f;
			cell.height = Math.max(0, Math.round(cell.height + delta));
			next.set(k, cell);
		});
		set({ cells: next });
	},

	applyPaint(center, radius, kind) {
		const prev = get().cells;
		const next = new Map(prev);
		forEachInRadius(center, Math.floor(radius), (q, r) => {
			const k = key(q, r);
			const cell = next.get(k) || { q, r, height: 0, kind };
			cell.kind = kind;
			next.set(k, cell);
		});
		set({ cells: next });
	},

	resetWorld() {
		set({ cells: new Map() });
	},
});
