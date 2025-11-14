/*
	ToolPanel.jsx
	-------------

	Context panel: sculpt/paint settings.
*/

// imports
import React from "react";
import { useStore } from "../store";
import { kinds } from "../lib/hex";
import { kindToColor } from "../lib/materials";

// constants and globals
// (none)

const ToolPanel = () => {
	const tool = useStore((s) => s.activeTool);
	const radius = useStore((s) => s.radius);
	const setRadius = useStore((s) => s.setRadius);
	const strength = useStore((s) => s.strength);
	const setStrength = useStore((s) => s.setStrength);
	const falloff = useStore((s) => s.falloff);
	const setFalloff = useStore((s) => s.setFalloff);
	const paintKind = useStore((s) => s.paintKind);
	const setPaintKind = useStore((s) => s.setPaintKind);

	return (
		<aside data-ui="ToolPanel" className="panel">
			{tool === "sculpt" && (
				<div className="section">
					<div className="label">Brush radius: {radius.toFixed(1)}</div>
					<input type="range" min="0" max="10" step="0.1" value={radius} onChange={(e) => setRadius(e.target.value)} />
					<div className="label">Strength: {strength.toFixed(2)} tiles</div>
					<input type="range" min="-1" max="1" step="0.01" value={strength} onChange={(e) => setStrength(e.target.value)} />
					<label className="row">
						<input type="checkbox" checked={falloff} onChange={(e) => setFalloff(e.target.checked)} />
						<span>Soft falloff (Shift = lower)</span>
					</label>
				</div>
			)}

			{tool === "paint" && (
				<div className="section">
					<div className="label">Brush radius: {radius.toFixed(1)}</div>
					<input type="range" min="0" max="10" step="0.1" value={radius} onChange={(e) => setRadius(e.target.value)} />
					<div className="label">Material</div>
					<div className="chips">
						{kinds.map((k) => (
							<button key={k} data-active={paintKind === k} onClick={() => setPaintKind(k)} style={{ background: kindToColor(k) }}>
								{k}
							</button>
						))}
					</div>
				</div>
			)}

			{tool === "inspect" && (
				<div className="section">
					<div className="muted">Click a cell to select (todo)</div>
				</div>
			)}

			<style>{css}</style>
		</aside>
	);
};

export default ToolPanel;

// 100% of styles here defined in one big CSS block, for all the parts of the template
const css = `
[data-ui="ToolPanel"].panel{
	position: absolute;
	left: .5rem;
	top: 4.25rem;
	width: 18rem;
	bottom: .5rem;
	padding: .75rem;
	display: flex;
	flex-direction: column;
	gap: .75rem;
	border: 1px solid #e5e7eb;
	border-radius: .75rem;
	background: rgba(255,255,255,.85);
	backdrop-filter: blur(6px);
	overflow: auto;
}

[data-ui="ToolPanel"] .section{
	display: grid;
	gap: .5rem;
}

[data-ui="ToolPanel"] .label{
	font-weight: 600;
	font-size: .9rem;
}

[data-ui="ToolPanel"] .row{
	display: flex;
	align-items: center;
	gap: .5rem;
}

[data-ui="ToolPanel"] .chips{
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: .5rem;
}
[data-ui="ToolPanel"] .chips > button{
	padding: .4rem .5rem;
	border: 1px solid #e5e7eb;
	border-radius: .5rem;
	cursor: pointer;
}
[data-ui="ToolPanel"] .chips > button[data-active="true"]{
	outline: 2px solid #111827;
}
`
