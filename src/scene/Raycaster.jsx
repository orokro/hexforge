/*
	Raycaster.jsx
	-------------

	Projects pointer to world XZ plane, updates hover axial.
*/

// imports
import React, { useMemo } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { worldToAxial } from "../lib/hex";
import { useStore } from "../store";

// constants and globals
// (none)

const Raycaster = () => {
	const setHover = useStore((s) => s.setHover);
	const { camera, raycaster } = useThree();
	const plane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 1, 0), 0), []);
	const p = useMemo(() => new THREE.Vector3(), []);

	useFrame(({ pointer }) => {
		raycaster.setFromCamera(pointer, camera);
		if (!raycaster.ray.intersectPlane(plane, p)) return;
		const { q, r } = worldToAxial(p.x, p.z);
		setHover({ q, r });
	});

	return <></>;
};

export default Raycaster;
