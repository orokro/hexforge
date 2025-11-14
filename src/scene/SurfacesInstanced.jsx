/*
	SurfacesInstanced.jsx
	---------------------

	Instanced hex prisms for visible surfaces, grouped by kind.
*/

// imports
import React, { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useStore } from "../store";
import { kinds, axialToWorld, TILE_HEIGHT, EDGE } from "../lib/hex";
import { kindToColor } from "../lib/materials";

// constants and globals
// (none)

const SurfacesInstanced = () => {
	return (
		<group data-ui="SurfacesInstanced">
			{kinds.map((k) => <SurfaceKind key={k} kind={k} />)}
		</group>
	);
};
export default SurfacesInstanced;

function SurfaceKind({ kind }) {
	const meshRef = useRef(null);
	const cells = useStore((s) => s.cells);

	const data = useMemo(() => {
		const arr = [];
		cells.forEach((cell) => {
			if (cell.kind !== kind) return;
			if (cell.height <= 0) return;
			arr.push(cell);
		});
		return arr;
	}, [cells, kind]);

	useEffect(() => {
		if (!meshRef.current) return;
		meshRef.current.count = data.length;
		const m = new THREE.Matrix4();
		for (let i = 0; i < data.length; i++) {
			const c = data[i];
			const { x, z } = axialToWorld(c.q, c.r);
			const y = (c.height * TILE_HEIGHT) / 2;
			m.compose(
				new THREE.Vector3(x, y, z),
				new THREE.Quaternion(),
				new THREE.Vector3(1, c.height * TILE_HEIGHT, 1)
			);
			meshRef.current.setMatrixAt(i, m);
		}
		meshRef.current.instanceMatrix.needsUpdate = true;
	}, [data]);

	return (
		<instancedMesh ref={meshRef} args={[undefined, undefined, data.length]}>
			<cylinderGeometry args={[EDGE, EDGE, 1, 6]} />
			<meshStandardMaterial metalness={0} roughness={1} color={kindToColor(kind)} />
		</instancedMesh>
	);
}
