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
	const [gameStarted, setGameStarted] = useState(false)
	
	const handleStart = (playerNames) => {
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
		return players.reduce((lowest, player) => {
			return player.total < lowest.total ? player : lowest
		}, players[0])
	}

	const winner = round < 0 ? getWinner() : null
	const sortedPlayers = [...players].sort((a, b) => a.total - b.total)  // ← HÄR

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
							{sortedPlayers.map((player, index) => (  // ← OCH HÄR
								<tr key={index}>
									<td>{player.name}</td>
									<td>{player.total}</td>
								</tr>
							))}
						</tbody>
					</table>
					<div className="game-over-buttons">
						<button onClick={() => {
							const resetPlayers = players.map(p => ({ ...p, scores: [], total: 0 }))
							setPlayers(resetPlayers)
							setRound(9)
							setRoundInputs({})
						}}>
							Spela igen
						</button>
						<button onClick={() => {
							setPlayers([])
							setRound(9)
							setRoundInputs({})
							setGameStarted(false)
						}}>
							Nytt spel
						</button>
					</div>
				</div>
			) : (
				<>
					<h2>Runda {round}</h2>
					<DottRoundIndicator round={round} />
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