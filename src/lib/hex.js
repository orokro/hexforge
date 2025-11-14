/*
	hex.js
	------

	Axial hex math for flat-top layout + brush helpers + constants.
*/

// imports
// (none)

// constants and globals
export const EDGE = 2;				// edge length (matches your 2 cm)
export const TILE_HEIGHT = 1;		// vertical unit (1 cm)
export const HEX_WIDTH = 2 * EDGE;
export const HEX_HEIGHT = Math.sqrt(3) * EDGE;

export const kinds = ["grass", "stone", "dirt", "water"];

// axial helpers
export function axialToWorld(q, r) {
	const x = EDGE * (3/2) * q;
	const z = EDGE * (Math.sqrt(3)/2 * q + Math.sqrt(3) * r);
	return { x, z };
}

export function worldToAxial(x, z) {
	const q = (x * 2/3) / EDGE;
	const r = ((-x / 3) + (Math.sqrt(3)/3) * z) / EDGE;
	return axialRound(q, r);
}

export function axialRound(q, r) {
	const s = -q - r;
	let rq = Math.round(q);
	let rr = Math.round(r);
	let rs = Math.round(s);
	const qd = Math.abs(rq - q);
	const rd = Math.abs(rr - r);
	const sd = Math.abs(rs - s);
	if (qd > rd && qd > sd) rq = -rr - rs;
	else if (rd > sd) rr = -rq - rs;
	return { q: rq, r: rr };
}

export function key(q, r) {
	return `${q},${r}`;
}

export function hexDistance(aq, ar, bq, br) {
	const x1 = aq, z1 = ar, y1 = -x1 - z1;
	const x2 = bq, z2 = br, y2 = -x2 - z2;
	return Math.max(Math.abs(x1 - x2), Math.abs(y1 - y2), Math.abs(z1 - z2));
}

export function forEachInRadius(center, radius, fn) {
	for (let dq = -radius; dq <= radius; dq++) {
		for (let dr = -radius; dr <= radius; dr++) {
			const q = center.q + dq;
			const r = center.r + dr;
			const d = hexDistance(center.q, center.r, q, r);
			if (d <= radius) fn(q, r, d);
		}
	}
}

export function falloff(d, radius) {
	if (d > radius) return 0;
	const t = Math.max(0, 1 - d / (radius + 1e-6));
	return t * t * (3 - 2 * t);
}

