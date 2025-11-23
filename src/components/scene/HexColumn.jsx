import React, { useMemo } from 'react'
import * as THREE from 'three'

// CONSTANTS
// User specified: Side length = 2. 
// In a hexagon, side length == radius.
const RADIUS = 2
const HEIGHT = 1
const SIDES = 6

/**
 * Calculates the X,Z coordinates for the 6 corners of a hexagon.
 * We cache this since it never changes.
 */
const HEX_CORNERS = []
for (let i = 0; i < SIDES; i++) {
	const angle = (Math.PI / 3) * i // 60 degrees * i
	HEX_CORNERS.push({
		x: RADIUS * Math.cos(angle),
		z: RADIUS * Math.sin(angle)
	})
}

/**
 * Helper to generate the BufferGeometry data
 * @param {number} height - number of tiles high
 * @param {number[]} neighborHeights - array of 6 numbers representing neighbor heights
 */
function generateHexGeometryData(height, neighborHeights) {
	const positions = []
	const normals = []
	const uvs = []
	const indices = []

	// Helper to push a single vertex
	let vertCount = 0
	const pushVert = (x, y, z, nx, ny, nz, u, v) => {
		positions.push(x, y, z)
		normals.push(nx, ny, nz)
		uvs.push(u, v)
		return vertCount++
	}

	// Helper to create a quad (two triangles)
	// v1--v2
	// | / |
	// v4--v3
	const pushQuad = (v1, v2, v3, v4) => {
		indices.push(v1, v2, v4)
		indices.push(v2, v3, v4)
	}

	// --- GENERATION LOOP ---

	// We build the column layer by layer (y = 0 to height)
	for (let y = 0; y < height; y++) {
		const bottomY = y * HEIGHT
		const topY = (y + 1) * HEIGHT

		// 1. TOP FACE
		// Only draw top face if this is the very top tile
		if (y === height - 1) {
			// Center point for the triangle fan
			const cIdx = pushVert(0, topY, 0, 0, 1, 0, 0.5, 0.5)

			for (let i = 0; i < SIDES; i++) {
				const next = (i + 1) % SIDES
				const p1 = HEX_CORNERS[i]
				const p2 = HEX_CORNERS[next]

				// Vertices for the rim
				const idx1 = pushVert(p1.x, topY, p1.z, 0, 1, 0, 0.5 + p1.x / 4, 0.5 + p1.z / 4) // simple UV mapping
				const idx2 = pushVert(p2.x, topY, p2.z, 0, 1, 0, 0.5 + p2.x / 4, 0.5 + p2.z / 4)

				indices.push(cIdx, idx1, idx2)
			}
		}

		// 2. SIDE FACES
		// We check each of the 6 sides.
		for (let i = 0; i < SIDES; i++) {
			const neighborH = neighborHeights[i] || 0

			// OPTIMIZATION:
			// Only draw this side wall if the current layer is ABOVE the neighbor.
			if (y >= neighborH) {
				const next = (i + 1) % SIDES
				const p1 = HEX_CORNERS[i]
				const p2 = HEX_CORNERS[next]

				// Calculate normal for this face (simple vector math)
				// Since it's a regular hex, the normal is just the midpoint normalized
				const nx = (p1.x + p2.x) / 2
				const nz = (p1.z + p2.z) / 2
				const len = Math.sqrt(nx * nx + nz * nz)
				const normX = nx / len
				const normZ = nz / len

				// 4 corners of the quad
				// Top Left
				const v1 = pushVert(p1.x, topY, p1.z, normX, 0, normZ, 0, 1)
				// Top Right
				const v2 = pushVert(p2.x, topY, p2.z, normX, 0, normZ, 1, 1)
				// Bottom Right
				const v3 = pushVert(p2.x, bottomY, p2.z, normX, 0, normZ, 1, 0)
				// Bottom Left
				const v4 = pushVert(p1.x, bottomY, p1.z, normX, 0, normZ, 0, 0)

				pushQuad(v1, v2, v3, v4)
			}
		}
	}

	return { positions, normals, uvs, indices }
}

export function HexColumn({ height = 1, neighborHeights = [], ...props }) {

	// Create the geometry ONLY when height or neighbors change
	const geometry = useMemo(() => {
		// If height is 0, return empty
		if (height <= 0) return null

		// Ensure neighbors array has 6 entries (fill missing with 0)
		const safeNeighbors = [...neighborHeights]
		while (safeNeighbors.length < 6) safeNeighbors.push(0)

		const data = generateHexGeometryData(height, safeNeighbors)

		const geo = new THREE.BufferGeometry()
		geo.setIndex(data.indices)
		geo.setAttribute('position', new THREE.Float32BufferAttribute(data.positions, 3))
		geo.setAttribute('normal', new THREE.Float32BufferAttribute(data.normals, 3))
		geo.setAttribute('uv', new THREE.Float32BufferAttribute(data.uvs, 2))

		return geo
	}, [height, neighborHeights.join(',')]) // Simple array dependency check

	if (!geometry) return null

	return (
		<mesh
			geometry={geometry}
			{...props}
			// Add a shadow so we can see the depth immediately
			castShadow
			receiveShadow
		>
			<meshStandardMaterial
				color="#5eba7d" // Default grass green
				roughness={0.8}
				flatShading={true} // Low-poly look
			/>
		</mesh>
	)
}
