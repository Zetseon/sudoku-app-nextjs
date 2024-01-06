import React, { useState } from "react"

const HintComponent = ({ currentValues, startingValues }) => {
	const [hintCount, setHintCount] = useState(3)

	const hintFunc = () => {
		row = Math.floor(Math.random() * 9)
		col = Math.floor(Math.random() * 9)
		if(currentValues[row][col] === 0 || currentValues[row][col] === null){
			const hintCell = startingValues[row][col]
			setHintCount(prevhintCount => prevhintCount + 1)
			return hintCell
		}
		else{
			hintFunc(currentValues,startingValues)
		}
	}
	return <div>HintComponent</div>
}

export default HintComponent
