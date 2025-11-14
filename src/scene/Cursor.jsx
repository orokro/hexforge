/*
	Cursor.jsx
	----------

	Brush footprint preview circles.
*/

// imports
import React from "react";
import { useStore } from "../store";
import { axialToWorld, hexDistance } from "../lib/hex";

// constants and globals
// (none)

const Cursor = () => {
	const hover = useStore((s) => s.hover);
	const radius = Math.floor(useStore((s) => s.radius));
	if (!hover) return null;

	const tiles = [];
	for (let dq = -radius; dq <= radius; dq++) {
		for (let dr = -radius; dr <= radius; dr++) {
			const q = hover.q + dq;
			const r = hover.r + dr;
			if (hexDistance(hover.q, hover.r, q, r) <= radius) tiles.push({ q, r });
		}
	}

	return (
		<group data-ui="Cursor">
			{tiles.map(({ q, r }) => {
				const { x, z } = axialToWorld(q, r);
				return (
					<mesh key={`${q},${r}`} position={[x, 0.01, z]} rotation={[-Math.PI / 2, 0, 0]}>
						<circleGeometry args={[1.9, 32]} />
						<meshBasicMaterial transparent opacity={0.15} />
					</mesh>
				);
			})}
		</group>
	);
};

export default Cursor;
