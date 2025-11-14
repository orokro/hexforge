/*
	ControlsOrbit.jsx
	-----------------

	OrbitControls wrapper.
*/

// imports
import React from "react";
import { OrbitControls } from "@react-three/drei";

// constants and globals
// (none)

const ControlsOrbit = () => {
	return (
		<>
			<OrbitControls makeDefault enableDamping dampingFactor={0.1} target={[0, 0, 0]} />
		</>
	);
};

export default ControlsOrbit;