import React from "react"

const DifficultySelection = ({ onSelectDifficulty }) => {
	const difficulties = {
		Easy: 40,
		Medium: 53,
		Hard: 58,
		Extreme: 60,
	}

	return (
		<div className="flex flex-col items-center h-screen justify-center">
			<div>
				<h2 className="font-mono text-xl tracking-tight">Select Difficulty:</h2>
			</div>
			<div className="flex gap-2 mt-8 font-mono text-xl tracking-tight">
				{Object.keys(difficulties).map((difficulty) => (
					<button
						key={difficulty}
						onClick={() => onSelectDifficulty(difficulties[difficulty])}
						className="border p-4 border-black dark:border-neutral-400 hover:bg-slate-300 dark:hover:bg-slate-900">
						{difficulty}
					</button>
				))}
			</div>
		</div>
	)
}

export default DifficultySelection
