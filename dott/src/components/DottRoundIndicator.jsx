// function DottRoundIndicator({ round }) {
// 	const roundColors = {
// 		9: '#e03c00',
// 		8: '#3e1a8c',
// 		7: '#f5c500',
// 		6: '#2a8c2a',
// 		5: '#111111',
// 		4: '#f0f0f0',
// 		3: '#8b4513',
// 		2: '#ff00dd',
// 		1: '#00bfff',
// 		0: null
// 	}
	
// 	const color = roundColors[round]
// 	const dots = Array.from({ length: round }, (_, i) => i)
	
// 	if (round === 0) return <div className="round-indicator empty"></div>
	
// 	return (
// 		<div className="round-indicator">
// 		{dots.map(i => (
// 			<div
// 			key={i}
// 			className="dot"
// 			style={{ backgroundColor: color }}
// 			/>
// 		))}
// 		</div>
// 	)
// }

// export default DottRoundIndicator

import DotCard from './DotCard'

function DottRoundIndicator({ round }) {
	const roundColors = {
		9: '#e03c00',
		8: '#3e1a8c',
		7: '#f5c500',
		6: '#2a8c2a',
		5: '#111111',
		4: '#f0f0f0',
		3: '#8b4513',
		2: '#ff00dd',
		1: '#00bfff',
		0: null
	}

	if (round === 0) return (
    <div className="round-indicator">
        <div className="dot-card"></div>
    </div>
)

	return (
		<div className="round-indicator">
			<DotCard value={round} color={roundColors[round]} />
		</div>
	)
}

export default DottRoundIndicator