/*
	HexUtils.js
	Standard Axial Coordinate logic for flat-topped hexagons.
	Assumes standard size of 1 unit (width = 2, height = sqrt(3))
*/

export const HexUtils = {

	// CONSTANTS
	// -------------------------------------------------------------------------
	// sqrt(3) is roughly 1.732. This is the height of a hex if width is 2.
	SQRT3: Math.sqrt(3),

	// DIRECTIONS
	// In axial, these are the 6 neighbors. 
	// Order: East, SouthEast, SouthWest, West, NorthWest, NorthEast
	NEIGHBORS: [
		{ q: 1, r: 0 }, { q: 0, r: 1 }, { q: -1, r: 1 }, 
		{ q: -1, r: 0 }, { q: 0, r: -1 }, { q: 1, r: -1 }
	],

	// CONVERSIONS
	// -------------------------------------------------------------------------
	
	/*
		hexToPixel
		Takes axial (q,r) and converts to World (x,z) for 3D rendering.
		We map 2D y to 3D z because usually Y is 'up' in 3D.
	*/
	hexToPixel(q, r, size = 1) {
		const x = size * (3/2 * q);
		const z = size * (this.SQRT3/2 * q + this.SQRT3 * r);
		return { x, z };
	},

	/*
		pixelToHex
		Takes World (x,z) and finds the nearest hex coordinate.
		Used for raycasting/mouse interaction.
	*/
	pixelToHex(x, z, size = 1) {
		const q = (2/3 * x) / size;
		const r = (-1/3 * x + Math.sqrt(3)/3 * z) / size;
		return this.roundHex(q, r);
	},

	/*
		roundHex
		Since pixelToHex returns floats (e.g. 1.0004, 0.999), we need to round
		to the nearest valid integer hex. This algorithm ensures we don't
		break the grid topology.
	*/
	roundHex(q, r) {
		let s = -q - r; // s is the hidden third coordinate (cube coords)
		
		let rq = Math.round(q);
		let rr = Math.round(r);
		let rs = Math.round(s);

		const q_diff = Math.abs(rq - q);
		const r_diff = Math.abs(rr - r);
		const s_diff = Math.abs(rs - s);

		if (q_diff > r_diff && q_diff > s_diff) {
			rq = -rr - rs;
		} else if (r_diff > s_diff) {
			rr = -rq - rs;
		}
		
		return { q: rq, r: rr };
	},


	// HELPERS
	// -------------------------------------------------------------------------

	/*
		getNeighbors
		Returns array of {q,r} for all 6 neighbors
	*/
	getNeighbors(q, r) {
		return this.NEIGHBORS.map(n => ({ q: q + n.q, r: r + n.r }));
	},

	/*
		getHexesInRadius
		Used for the Brush Tool. Returns an array of coordinate strings "q,r"
		that are within 'radius' steps of the center.
	*/
	getHexesInRadius(centerQ, centerR, radius) {
		const results = [];
		
		// In axial, a radius loop is simple:
		// We loop q from -radius to +radius
		// We loop r from max(-radius, -q-radius) to min(radius, -q+radius)
		for (let q = -radius; q <= radius; q++) {
			const r1 = Math.max(-radius, -q - radius);
			const r2 = Math.min(radius, -q + radius);
			
			for (let r = r1; r <= r2; r++) {
				results.push({ q: centerQ + q, r: centerR + r });
			}
		}
		return results;
	},

	/*
		getKey / parseKey
		Standard way to store coordinates in our Map/Object
	*/
	getKey(q, r) { return `${q},${r}`; },
	parseKey(key) { 
		const [q, r] = key.split(',').map(Number);
		return { q, r };
	}
};
