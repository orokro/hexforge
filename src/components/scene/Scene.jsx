import React from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei'
import { GameMap } from './GameMap'

export function Scene() {
	return (
		<div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
			<Canvas shadows>
				{/* CAMERA */}
				<PerspectiveCamera makeDefault position={[5, 10, 10]} fov={50} />
				<OrbitControls makeDefault maxPolarAngle={Math.PI / 2.2} />

				{/* LIGHTS */}
				<ambientLight intensity={0.5} />
				<directionalLight
					position={[10, 20, 10]}
					intensity={1.5}
					castShadow
					shadow-mapSize={[2048, 2048]}
				/>
				<Environment preset="city" />

				{/* CONTENT */}
				<GameMap />

				{/* GROUND SHADOW */}
				<ContactShadows position={[0, -0.1, 0]} opacity={0.6} scale={40} blur={2} far={10} color="#000000" />
			</Canvas>
		</div>
	)
}
