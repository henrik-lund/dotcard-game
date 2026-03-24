function DottRound ({ players, roundInputs, handleScoreInput, confirmRound}) {

	return(
		<div>
			<table>
				<thead>
					<tr>
						<th>Spelare</th>
						<th>Poäng denna runda</th>
						<th>Totalt</th>
					</tr>
				</thead>
				<tbody>
					{players.map((player, index) =>
					<tr key={index}>
						<td>{player.name}</td>
						<td>
							<input type="text"
							inputMode="decimal"
							value={roundInputs[player.name] || ''}
							onChange={(e) => handleScoreInput(player.name, e.target.value)} />
						</td>
						<td>{player.total}</td>
					</tr>)}
				</tbody>
			</table>
			<button onClick={confirmRound}>Bekräfta runda</button>
		</div>
	)
}

export default DottRound; 