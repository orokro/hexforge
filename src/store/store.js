import { create } from 'zustand'
import { HexUtils } from '../utils/HexUtils'

export const useStore = create((set, get) => ({
	
	// STATE
	// -------------------------------------------------------------------------
	
	// The main world data. 
	// Key: "q,r" string
	// Value: { height: int, type: string, decor: object|null }
	grid: new Map(), 

	// UI State
	activeTool: 'land-shape', // land-shape, land-style, land-decor, wall
	brushSize: 1,
	brushFalloff: 'flat', // flat, linear, smooth
	
	// Selection State (for walls)
	selectedTile: null, // { q, r }

	// ACTIONS
	// -------------------------------------------------------------------------

	/*
		initMap
		Creates a basic starting island so the screen isn't empty
	*/
	initMap: () => {
		const newGrid = new Map();
		const radius = 3;
		const tiles = HexUtils.getHexesInRadius(0, 0, radius);
		
		tiles.forEach(({q, r}) => {
			newGrid.set(HexUtils.getKey(q, r), {
				height: 1,
				type: 'grass',
				decor: null
			});
		});

		set({ grid: newGrid });
	},

	/*
		updateColumn
		The atomic update function. 
		If height <= 0, we delete the entry (bedrock).
	*/
	updateColumn: (q, r, mutationFn) => {
		const key = HexUtils.getKey(q, r);
		const grid = new Map(get().grid); // Clone map to trigger reactivity
		
		const current = grid.get(key) || { height: 0, type: 'grass', decor: null };
		const updated = mutationFn(current);

		if (updated.height <= 0) {
			grid.delete(key);
		} else {
			grid.set(key, updated);
		}

		set({ grid });
	},

	/*
		applyTool
		This is the main entry point for mouse clicks.
		It decides what to do based on 'activeTool'.
	*/
	applyTool: (q, r, isDrag = false) => {
		const state = get();
		const { activeTool, brushSize } = state;

		// 1. LAND SHAPE TOOL
		if (activeTool === 'land-shape') {
			// Get all tiles in radius
			const targets = HexUtils.getHexesInRadius(q, r, brushSize);
			
			// We clone the grid ONCE for the whole batch operation
			const newGrid = new Map(state.grid);

			targets.forEach(coord => {
				const key = HexUtils.getKey(coord.q, coord.r);
				const cell = newGrid.get(key) || { height: 0, type: 'grass' };
				
				// Logic: If left click (shift not held), grow. If shift held, shrink.
				// (We'll handle the shift-key logic in the component layer later)
				// For now, let's assume this function receives a direction or we toggle it externally.
				// simpler for now: just grow
				
				newGrid.set(key, { ...cell, height: cell.height + 1 });
			});

			set({ grid: newGrid });
		}

		// 2. LAND STYLE TOOL
		else if (activeTool === 'land-style') {
			state.updateColumn(q, r, (cell) => ({
				...cell,
				type: 'stone' // Hardcoded for now, will connect to UI later
			}));
		}
	}
}));
