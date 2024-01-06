import React, { useEffect, useState } from "react"
import modifyBoardForGameLevel from "../modifyBoardForGameLevel"
import {
	BackspaceOutlined,
	PauseCircleFilledOutlined,
	PlayCircleFilledOutlined,
	ReplayOutlined,
	RestartAltOutlined,
	LightbulbOutlined,
} from "@mui/icons-material"
const BoardComponent = ({ initialboard, handleValidate, selectedDifficulty, playAgain }) => {
	const [inputValue, setInputValue] = useState([])
	const [selectedButton, setSelectedButton] = useState(null)
	const [initialInputValue, setInitialInputValue] = useState([])
	const [timer, setTimer] = useState(0)
	const [isPaused, setIsPaused] = useState(false)
	const [hintCount, setHintCount] = useState(3)
	const hintFunc = () => {
		if (hintCount > 0) {
			const row = Math.floor(Math.random() * 9)
			const col = Math.floor(Math.random() * 9)
			if (inputValue[row][col] === 0 || inputValue[row][col] === null) {
				const hintCell = initialboard[row][col]
				const updatedInputValue = [...inputValue]
				updatedInputValue[row][col] = hintCell
				setInputValue(updatedInputValue)
				setHintCount((prevhintCount) => prevhintCount - 1)
				return
			} else {
				hintFunc()
			}
		} else {
			alert("You ran out of hints!")
		}
	}
	const formatTime = (seconds) => {
		const hours = Math.floor(seconds / 3600)
		const minutes = Math.floor((seconds % 3600) / 60)
		const remainingSeconds = seconds % 60

		return `${("0" + hours).slice(-2)}:${("0" + minutes).slice(-2)}:${(
			"0" + remainingSeconds
		).slice(-2)}`
	}

	const resetBoard = () => {
		setInputValue(initialInputValue.map((row) => [...row]))
	}
	const renderButtonsVal = () => {
		const buttonVals = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
		return buttonVals.map((val) => (
			<button
				key={val}
				className={`border border-slate-900 dark:border-neutral-300 p-3 md:p-4 shadow ${
					selectedButton === val ? "bg-cyan-700 bg-opacity-50 dark:bg-slate-700" : ""
				}`}
				onClick={() => {
					setSelectedButton(selectedButton === val ? null : val)
				}}>
				{val === 0 ? <BackspaceOutlined /> : val}
			</button>
		))
	}
	const handleCellClick = (rowIndex, columnIndex) => {
		if (selectedButton !== null) {
			const originalCellValue = initialInputValue[rowIndex][columnIndex]
			if (originalCellValue === 0) {
				const updatedInputValue = [...inputValue]
				updatedInputValue[rowIndex][columnIndex] = selectedButton
				setInputValue(updatedInputValue)
			} else {
				setSelectedButton(originalCellValue)
			}
		}
	}
	useEffect(() => {
		const intervalId = setInterval(() => {
			if (!isPaused) {
				setTimer((prevTimer) => prevTimer + 1)
			}
		}, 1000)

		return () => clearInterval(intervalId)
	}, [isPaused])
	useEffect(() => {
		if (
			Array.isArray(initialboard) &&
			initialboard.length === 9 &&
			initialboard.every((row) => Array.isArray(row) && row.length === 9)
		) {
			const copyInitialBoard = initialboard.map((row) => [...row])
			const modifiedBoard = modifyBoardForGameLevel(copyInitialBoard, selectedDifficulty)
			setInputValue([...modifiedBoard])

			//Creating copy of initially generated board for reset function
			setInitialInputValue(modifiedBoard.map((row) => [...row]))
		}
	}, [initialboard])

	return (
		<div className="flex flex-col items-center">
			{isPaused && (
				<div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center backdrop-blur-md z-50">
					{/* Your modal content goes here */}
					<div className="border mb-10 rounded-md">
						<button onClick={() => setIsPaused(false)}>
							<PlayCircleFilledOutlined style={{ fontSize: 60 }} />
						</button>
					</div>
				</div>
			)}
			<div className="inline-flex w-full items-center justify-between px-10">
				<div className="font-mono text-xl tracking-tight">
					<p>
						{`${("0" + Math.floor((timer / 3600) % 60)).slice(-2)}:
						${("0" + Math.floor((timer / 60) % 60)).slice(-2)}:
						${("0" + Math.floor(timer % 60)).slice(-2)}`}
					</p>
				</div>
				<button className="font-mono text-xl inline-flex" onClick={hintFunc}>
					<LightbulbOutlined />
					{hintCount}
				</button>
				<button
					className=" p-4 hover:cursor-pointer"
					onClick={() => {
						setIsPaused(!isPaused)
					}}>
					{isPaused ? <PlayCircleFilledOutlined /> : <PauseCircleFilledOutlined />}
				</button>
			</div>

			<div className="bg-cyan-800 bg-opacity-50 dark:bg-slate-900 border border-white dark:border-slate-800  shadow-lg ">
				{inputValue.map((row, rowIndex) => (
					<div
						key={rowIndex}
						className={`flex flex-row-9 dark:hover:bg-slate-900 ${
							rowIndex % 3 == 2 && rowIndex !== 8
								? "border-b border-black dark:border-red-600"
								: "border-b border-slate-500 dark:border-slate-800"
						}`}>
						{row.map((cell, columnIndex) => (
							<div
								key={columnIndex}
								className={`flex justify-center items-center cursor-pointer w-8 h-8 md:w-12 md:h-12 lg:w-14 lg:h-14 sm:dark:hover:bg-red-900  sm:hover:bg-cyan-700 ${
									selectedButton == cell && selectedButton != (0 && null)
										? "bg-cyan-700 bg-opacity-50 dark:bg-slate-700"
										: ""
								} ${
									columnIndex % 3 == 2 && columnIndex !== 8
										? "border-r border-black dark:border-red-600"
										: "border-r border-slate-500 dark:border-slate-800"
								}`}
								onClick={() => {
									handleCellClick(rowIndex, columnIndex)
								}}>
								<span
									className={`${
										inputValue[rowIndex][columnIndex] !==
										initialInputValue[rowIndex][columnIndex]
											? `text-pink-900 dark:text-red-600 `
											: ""
									}`}>
									{cell !== 0 && cell}
								</span>
							</div>
						))}
					</div>
				))}
			</div>

			<div className="flex flex-nowrap my-8 md:space-x-4 md:my-10">
				{inputValue ? renderButtonsVal() : ""}
			</div>
			<div className="flex gap-4 justify-between shadow">
				<button
					className="border border-slate-900 dark:border-neutral-300 p-4 hover:cursor-pointer hover:bg-slate-300 dark:hover:bg-slate-900"
					onClick={() => handleValidate(inputValue, formatTime(timer))}>
					Validate
				</button>
				<button
					className="border border-slate-900 dark:border-neutral-300 p-4 hover:cursor-pointer inline-block hover:bg-slate-300 dark:hover:bg-slate-900"
					onClick={resetBoard}>
					Reset <RestartAltOutlined />
				</button>
				<button
					className="border border-slate-900 dark:border-neutral-300 p-4 hover:cursor-pointer inline-block hover:bg-slate-300 dark:hover:bg-slate-900"
					onClick={playAgain}>
					New <ReplayOutlined />
				</button>
			</div>
		</div>
	)
}

export default BoardComponent
