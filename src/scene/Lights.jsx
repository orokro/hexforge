/*
	Lights.jsx
	----------

	Scene lighting for PBR look.
*/

// imports
import React from "react";

// constants and globals
// (none)

const Lights = () => {
	return (
		<group data-ui="Lights">
			<hemisphereLight intensity={0.7} />
			<directionalLight position={[10, 20, 5]} intensity={1} castShadow />
		</group>
	);
};

export default Lights;
