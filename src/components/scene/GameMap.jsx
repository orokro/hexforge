import React, { useEffect } from 'react'
import { useStore } from '../../store/store'
import { HexUtils } from '../../utils/HexUtils'
import { HexColumn } from './HexColumn'

export function GameMap() {
	const grid = useStore(state => state.grid)
	const initMap = useStore(state => state.initMap)

	useEffect(() => {
		if (grid.size === 0) initMap()
	}, [grid.size, initMap])

	return (
		<group>
			{Array.from(grid.entries()).map(([key, cell]) => {
				const { q, r } = HexUtils.parseKey(key)

				// FIX: Pass size=2 to match the geometry radius
				const { x, z } = HexUtils.hexToPixel(q, r, 2)

				const neighborHeights = HexUtils.getNeighbors(q, r).map(nCoord => {
					const nKey = HexUtils.getKey(nCoord.q, nCoord.r)
					const nCell = grid.get(nKey)
					return nCell ? nCell.height : 0
				})

				return (
					<HexColumn
						key={key}
						position={[x, 0, z]}
						height={cell.height}
						neighborHeights={neighborHeights}
					/>
				)
			})}
		</group>
	)
}
