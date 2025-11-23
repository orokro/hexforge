import React, { useMemo } from 'react'
import * as THREE from 'three'

// CONSTANTS
const RADIUS = 2
const VISIBLE_RADIUS = 1.95
const HEIGHT = 1
const SIDES = 6

const HEX_CORNERS = []
for (let i = 0; i < SIDES; i++) {
	const angle = (Math.PI / 3) * i
	HEX_CORNERS.push({
		x: VISIBLE_RADIUS * Math.cos(angle),
		z: VISIBLE_RADIUS * Math.sin(angle)
	})
}

function generateHexGeometryData(height, neighborHeights) {
	const positions = []
	const indices = []
	let vIdx = 0

	const addVertex = (x, y, z) => {
		positions.push(x, y, z)
		return vIdx++
	}

	// Standard Triangle Add
	const addFace = (a, b, c) => indices.push(a, b, c)

	// Standard Quad Add (Expects CCW winding: BL -> BR -> TR -> TL)
	const addQuad = (bl, br, tr, tl) => {
		addFace(bl, br, tr)
		addFace(bl, tr, tl)
	}

	// 1. TOP FACE
	const topY = height * HEIGHT
	const c = addVertex(0, topY, 0)

	for (let i = 0; i < SIDES; i++) {
		const next = (i + 1) % SIDES
		const p1 = HEX_CORNERS[i]    // Current
		const p2 = HEX_CORNERS[next] // Next

		const v1 = addVertex(p1.x, topY, p1.z)
		const v2 = addVertex(p2.x, topY, p2.z)

		// FLIP HERE: Center -> Next -> Current
		// This produces a POSITIVE Y (Up) normal
		addFace(c, v2, v1)
	}

	// 2. SIDE FACES (Keeping the logic that works!)
	for (let y = 0; y < height; y++) {
		const layerBottomY = y * HEIGHT
		const layerTopY = (y + 1) * HEIGHT

		for (let i = 0; i < SIDES; i++) {
			const neighborH = neighborHeights[i] || 0

			if (y >= neighborH) {
				const next = (i + 1) % SIDES
				const p1 = HEX_CORNERS[i]
				const p2 = HEX_CORNERS[next]

				const bl = addVertex(p1.x, layerBottomY, p1.z) // Current Bot
				const br = addVertex(p2.x, layerBottomY, p2.z) // Next Bot
				const tr = addVertex(p2.x, layerTopY, p2.z)    // Next Top
				const tl = addVertex(p1.x, layerTopY, p1.z)    // Current Top

				// Keep this exactly as is:
				// NextBot -> CurrentBot -> CurrentTop -> NextTop
				addQuad(br, bl, tl, tr)
			}
		}
	}

	return { positions, indices }
}

export function HexColumn({ height = 1, neighborHeights = [], ...props }) {
	const geometry = useMemo(() => {
		if (height <= 0) return null
		const safeNeighbors = [...neighborHeights]
		while (safeNeighbors.length < 6) safeNeighbors.push(0)

		const data = generateHexGeometryData(height, safeNeighbors)

		const geo = new THREE.BufferGeometry()
		geo.setIndex(data.indices)
		geo.setAttribute('position', new THREE.Float32BufferAttribute(data.positions, 3))
		geo.computeVertexNormals()
		return geo
	}, [height, neighborHeights.join(',')])

	if (!geometry) return null

	return (
		<mesh
			geometry={geometry}
			{...props}
			castShadow
			receiveShadow
		>
			<meshStandardMaterial
				color="#5eba7d"
				roughness={0.8}
				flatShading={false}
			// We can confidently leave DoubleSide OFF now
			/>
		</mesh>
	)
}