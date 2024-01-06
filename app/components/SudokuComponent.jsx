// components/SudokuBoardComponent.js
"use client"
import { useEffect, useState } from "react"
import generateSudokuBoard from "../sudokuGenerate"
import DifficultySelection from "./DifficultySelection"
import BoardComponent from "./BoardComponent"
function SudokuComponent() {
	const [sudokuBoard, setSudokuBoard] = useState([])
	const [selectedDifficulty, setSelectedDifficulty] = useState(null)
	// const [inputValue, setInputValue] = useState([]);
	const handleValidate = (inputValue, timer) => {
		// Check if input values match cell values
		// console.log(inputValue)
		const isSolved = JSON.stringify(inputValue) === JSON.stringify(sudokuBoard)
		if (isSolved) {
			alert(`You solved it in ${timer}`)
			playAgain()
		} else {
			alert('Please try again')
		}
	}
	const onSelectDifficulty = (difficulty) => {
		setSelectedDifficulty(difficulty)
	}

	const playAgain = () => {
		setSelectedDifficulty(null)
	}
	useEffect(() => {
		// Generate Sudoku board when component mounts
		if (selectedDifficulty !== null) {
			const generatedSudoku = generateSudokuBoard(selectedDifficulty)
			setSudokuBoard(generatedSudoku)
		
		}
	}, [selectedDifficulty])
	return (
		<div className="">
			{selectedDifficulty === null ? (
				<DifficultySelection onSelectDifficulty={onSelectDifficulty} />
			) : (
				<div className="flex flex-col items-center justify-center mt-10">
					
					<BoardComponent
						initialboard={sudokuBoard.map((row) => [...row])}
						originalVal={sudokuBoard}
						handleValidate={handleValidate}
						selectedDifficulty={selectedDifficulty}
						playAgain={playAgain}
					/>
				</div>
			)}
		</div>
	)
}

export default SudokuComponent

