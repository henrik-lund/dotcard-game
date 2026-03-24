import { useState } from 'react'

function DottStartPage({ onStart }) {
	const [players, setPlayers] = useState([])
	const [inputName, setInputName] = useState('')
	
	const addPlayer = () => {
		if (inputName.trim() === '') return
		setPlayers([...players, inputName])
		setInputName('')
	}
	
	const handleKeyDown = (e) => {
		if (e.key === 'Enter') addPlayer()
		}
	
	return (
		<div className="dott">
		<h1>Dot 🃏</h1>
		<h2>Lägg till spelare</h2>
		
		<div className="add-player">
		<input
		type="text"
		placeholder="Spelarnamn..."
		value={inputName}
		onChange={(e) => setInputName(e.target.value)}
		onKeyDown={handleKeyDown}
		/>
		<button onClick={addPlayer}>Lägg till</button>
		</div>
		
		<ul className="player-list">
		{players.map((player, index) => (
			<li key={index}>{player}</li>
		))}
		</ul>
		
		{players.length >= 2 && (
			<button className="start-btn" onClick={() => onStart(players)}>
			Starta spelet 🎮
			</button>
		)}
		</div>
	)
}

export default DottStartPage