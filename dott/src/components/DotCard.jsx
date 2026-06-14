import './DotCard.css'

function DotCard({ value, color }) {
	const _ = false, X = true;
	
	const pipLayouts = {
		0: [[_,_,_],[_,_,_],[_,_,_]],
		1: [[_,_,_],[_,X,_],[_,_,_]],
		2: [[X,_,_],[_,_,_],[_,_,X]],
		3: [[X,_,_],[_,X,_],[_,_,X]],
		4: [[X,_,X],[_,_,_],[X,_,X]],
		5: [[X,_,X],[_,X,_],[X,_,X]],
		6: [[X,_,X],[X,_,X],[X,_,X]],
		7: [[X,_,X],[X,X,X],[X,_,X]],
		8: [[X,X,X],[X,_,X],[X,X,X]],
		9: [[X,X,X],[X,X,X],[X,X,X]],
	};
	
	const layout = pipLayouts[value];
	
	return (
		<div className="dot-card">
		<div className="pip-grid">
		{layout.map((row, rowIndex) =>
			row.map((cell, colIndex) => (
				<div
				key={`${rowIndex}-${colIndex}`}
				className={cell ? 'pip' : 'pip empty'}
				style={cell ? { backgroundColor: color } : {}}
				/>
			))
		)}
		</div>
		</div>
	);
}

export default DotCard;