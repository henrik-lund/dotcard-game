import { useState, useEffect } from "react"
import DottRound from "./DottRound"
import DottRoundIndicator from "./DottRoundIndicator"
import confetti from 'canvas-confetti'
import DottStartPage from "./DottStartPage"
import './Dott.css'

function Dott() {
	const [players, setPlayers] = useState([])
	const [inputName, setInputName] = useState('')
	const [round, setRound] = useState(9)
	const [roundInputs, setRoundInputs] = useState({})
	const [gameStarted, setGameStarted] = useState(false)  // NY
	
	const handleStart = (playerNames) => {  // NY
		setPlayers(playerNames.map(name => ({ name, scores: [], total: 0 })))
		setGameStarted(true)
	}
	
	const addPlayer = () => {
		if (inputName.trim() === '') return
		setPlayers([...players, { name: inputName, scores: [], total: 0 }])
		setInputName('')
	}
	
	const handleScoreInput = (playerName, value) => {
		setRoundInputs({ ...roundInputs, [playerName]: value })
	}
	
	const confirmRound = () => {
		setPlayers(players.map(player => {
			const score = parseInt(roundInputs[player.name]) || 0
			return {
				...player,
				scores: [...player.scores, score],
				total: player.total + score
			}
		}))
		setRoundInputs({})
		setRound(round - 1)
	}
	
	const getWinner = () => {
		if (players.length === 0) return null
		return players.reduce((lowest, player) =>
			player.total < lowest.total ? player : lowest
	)
}

const winner = round < 0 ? getWinner() : null

useEffect(() => {
	if (winner) {
		const duration = 3000
		const end = Date.now() + duration
		
		const frame = () => {
			confetti({
				particleCount: 5,
				angle: 60,
				spread: 55,
				origin: { x: 0 },
				colors: ['#FFD700', '#8b0000', '#ffffff']
			})
			confetti({
				particleCount: 5,
				angle: 120,
				spread: 55,
				origin: { x: 1 },
				colors: ['#FFD700', '#8b0000', '#ffffff']
			})
			
			if (Date.now() < end) {
				requestAnimationFrame(frame)
			}
		}
		frame()
	}
}, [winner])


if (!gameStarted) {
	return <DottStartPage onStart={handleStart} />
}

return (
	<div className="dott">
	<h1>Dot 🃏</h1>
	{winner ? (
		<div className="winner">
		<h2>🏆 {winner.name} vinner med {winner.total} poäng!</h2>
		<table>
		<thead>
		<tr>
		<th>Spelare</th>
		<th>Total poäng</th>
		</tr>
		</thead>
		<tbody>
		{players
			.sort((a, b) => a.total - b.total)
			.map((player, index) => (
				<tr key={index}>
				<td>{player.name}</td>
				<td>{player.total}</td>
				</tr>
			))}
			</tbody>
			</table>
			<button onClick={() => {
				setPlayers([])
				setRound(9)
				setRoundInputs({})
				setGameStarted(false)  
			}}>Spela igen</button>
			</div>
		) : (
			<>
			<h2>Runda {round}</h2>
			<DottRoundIndicator round={round} />
			<div className="add-player">
			<input
			type="text"
			placeholder="Spelarnamn..."
			value={inputName}
			onChange={(e) => setInputName(e.target.value)}
			/>
			<button onClick={addPlayer}>Lägg till spelare</button>
			</div>
			<DottRound
			players={players}
			roundInputs={roundInputs}
			handleScoreInput={handleScoreInput}
			confirmRound={confirmRound}
			/>
			</>
		)}
		</div>
	)
}

export default Dott