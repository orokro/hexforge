/*
	export.js
	---------

	Export/Import helpers for world state JSON.
*/

// imports
// (none)

// constants and globals
export function exportJSON(meta, cellsMap) {
	const cells = [];
	cellsMap.forEach((c) => {
		if (c.height > 0) cells.push({ q: c.q, r: c.r, height: c.height, kind: c.kind });
	});
	return { meta, cells };
}

export function importJSON(payload) {
	if (!payload || !payload.meta || !Array.isArray(payload.cells)) {
		throw new Error("Invalid hexforge payload");
	}
	const map = new Map();
	for (const c of payload.cells) {
		const k = `${c.q},${c.r}`;
		map.set(k, { q: c.q, r: c.r, height: c.height|0, kind: c.kind || "grass" });
	}
	return { meta: payload.meta, cells: map };
}
