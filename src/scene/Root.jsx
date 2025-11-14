/*
	Root.jsx
	--------

	Canvas scene root: lights, surfaces, cursor, raycaster, controls.
*/

// imports
import React, { useEffect, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import Lights from "./Lights";
import ControlsOrbit from "./ControlsOrbit";
import Cursor from "./Cursor";
import Raycaster from "./Raycaster";
import SurfacesInstanced from "./SurfacesInstanced";
import { useStore } from "../store";

// constants and globals
// (none)

const SceneContent = () => {
	const hover = useStore((s) => s.hover);
	const mouseDown = useStore((s) => s.mouseDown);
	const setMouseDown = useStore((s) => s.setMouseDown);
	const shift = useStore((s) => s.shift);
	const setShift = useStore((s) => s.setShift);

	const tool = useStore((s) => s.activeTool);
	const radius = useStore((s) => s.radius);
	const strength = useStore((s) => s.strength);
	const falloff = useStore((s) => s.falloff);
	const paintKind = useStore((s) => s.paintKind);
	const applySculpt = useStore((s) => s.applySculpt);
	const applyPaint = useStore((s) => s.applyPaint);

	useEffect(() => {
		const onKey = (ev) => {
			if (ev.key === "Shift") setShift(ev.type === "keydown");
		};
		window.addEventListener("keydown", onKey);
		window.addEventListener("keyup", onKey);
		return () => {
			window.removeEventListener("keydown", onKey);
			window.removeEventListener("keyup", onKey);
		};
	}, [setShift]);

	useFrame(() => {
		if (!mouseDown || !hover) return;
		if (tool === "sculpt") {
			applySculpt(hover, radius, strength, falloff, shift ? -1 : 1);
		} else if (tool === "paint") {
			applyPaint(hover, radius, paintKind);
		}
	});

	const onPointerDown = useCallback(() => setMouseDown(true), [setMouseDown]);
	const onPointerUp = useCallback(() => setMouseDown(false), [setMouseDown]);

	return (
		<group onPointerDown={onPointerDown} onPointerUp={onPointerUp} data-ui="SceneContent">
			<mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.002, 0]}>
				<planeGeometry args={[2000, 2000]} />
				<meshBasicMaterial wireframe opacity={0.08} transparent />
			</mesh>

			<Lights />
			<SurfacesInstanced />
			<Cursor />
			<Raycaster />
			<ControlsOrbit />
		</group>
	);
};

const Root = () => {
	return (
		<div data-ui="Scene.Root" className="r3f-shell">
			<Canvas shadows camera={{ position: [20, 20, 20], fov: 50 }}>
				<color attach="background" args={["#e9eef3"]} />
				<SceneContent />
			</Canvas>
			<style>{css}</style>
		</div>
	);
};

export default Root;

// 100% of styles here defined in one big CSS block, for all the parts of the template
const css = `
	[data-ui="Scene.Root"].r3f-shell{
		position: absolute;
		inset: 0;
	}
`
