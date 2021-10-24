import React, {useState, useEffect} from 'react'
import ScoreBoard from './components/ScoreBoard'

import blueCandy from './images/blue.png'
import greenCandy from './images/green.png'
import orangeCandy from './images/orange.png'
import purpleCandy from './images/purple.png'
import redCandy from './images/red.png'
import yellowCandy from './images/yellow.png'
import blank from './images/blank.png'

const width = 8
// const candyColors = ['blue', 'green', 'orange', 'purple', 'red', 'yellow']
const candyColors = [blueCandy, greenCandy, orangeCandy, purpleCandy, redCandy, yellowCandy]


const App = () => {
  const [currentColorArrangement, setCurrentColorArrangement] = useState([])
  const [squareBeingDragged, setsquareBeingDragged] = useState(null)
  const [squareBeingDroped, setSquareBeingDroped] = useState(null)
  const [score, setScore] = useState(0)

  const prevDefault = e => e.preventDefault()

  const handleDragStart = (e) => {
    setsquareBeingDragged(e.target)
  }
  const handleOnDrop = (e) => {
    setSquareBeingDroped(e.target)
  }
  const handleDragEnd = () => {
    // write the moved squares id
    const squareBeingReplacedId = parseInt(squareBeingDroped.getAttribute('data-id'))
    const squareBeingDraggedId = parseInt(squareBeingDragged.getAttribute('data-id'))
    // flip the squares
    currentColorArrangement[parseInt(squareBeingReplacedId)] = squareBeingDragged.getAttribute('src')
    currentColorArrangement[parseInt(squareBeingDraggedId)] = squareBeingDroped.getAttribute('src')
    // set valid moves
    const validMoves = [
      squareBeingDraggedId + 1,
      squareBeingDraggedId - 1,
      squareBeingDraggedId + width,
      squareBeingDraggedId - width
    ]
    const validMove = validMoves.includes(squareBeingReplacedId)
    // check for matches
    const hasColumnOfThree = checkForColumnOfThree()
    const hasColumnOfFour = checkForColumnOfFour()
    const hasRowOfThree = checkForRowOfThree()
    const hasRowOfFour = checkForRowOfFour()
    // check if this was a valid move and has three/four matches
    if (squareBeingDraggedId &&
        validMove && (hasColumnOfThree || hasColumnOfFour || hasRowOfThree || hasRowOfFour)) {
        setSquareBeingDroped(null)
        setsquareBeingDragged(null)
      } else {
      // otherwise revert the colors as they were
      // currentColorArrangement[squareBeingReplacedId] = squareBeingDroped.style.backgroundColor
      // currentColorArrangement[squareBeingDraggedId] = squareBeingDragged.style.backgroundColor
      currentColorArrangement[squareBeingReplacedId] = squareBeingDroped.getAttribute('src')
      currentColorArrangement[squareBeingDraggedId] = squareBeingDragged.getAttribute('src')
      setCurrentColorArrangement([...currentColorArrangement])
    }
  }

  const moveIntoSquareBelowFillEmpty = () => {
    currentColorArrangement.map((item, index) => {
      if ((index >= width) && item === blank) {
        currentColorArrangement[index] = currentColorArrangement[index-width]
        currentColorArrangement[index-width] = blank
      }
      if ((index < width) && item ===blank) {
        currentColorArrangement[index] = candyColors[Math.floor(Math.random() * candyColors.length)]
      }
    })
  }

  const checkForRowOfThree = () => {
    // select a row
    for(let j=0; j < width; j++) {
      // check in a row
      for(let i = j*width; i < width+(j*width)-2; i++) {
        const rowOfThree = [i, i+1, i+2]
        const decidedColor = currentColorArrangement[i]
        const isBlank = currentColorArrangement[i] === blank

        if(rowOfThree.every(square => currentColorArrangement[square] === decidedColor && !isBlank)) {
          setScore((score) => score + 3)
          rowOfThree.forEach(square => currentColorArrangement[square] = blank)
          return true
        }
      }
    }
  }

  const checkForRowOfFour = () => {
    // select a row
    for(let j=0; j < width; j++) {
      // check in a row
      for(let i = j*width; i < width+(j*width)-3; i++) {
        const rowOfFour = [i, i+1, i+2, i+3]
        const decidedColor = currentColorArrangement[i]
        const isBlank = currentColorArrangement[i] === blank

        if(rowOfFour.every(square => currentColorArrangement[square] === decidedColor && !isBlank)) {
          setScore((score) => score + 4)
          rowOfFour.forEach(square => currentColorArrangement[square] = blank)
          return true
        }
      }
    }
  }

  const checkForColumnOfThree = () => {
    for(let i=0; i <= (width *(width-2))-1; i++) {
      const columnOfThree = [i, i+width, i+(width*2)];
      const decidedColor = currentColorArrangement[i];
      const isBlank = currentColorArrangement[i] === blank

      if ( columnOfThree.every( square => currentColorArrangement[square] === decidedColor && !isBlank)) {
        setScore((score) => score + 3)
        columnOfThree.forEach(square => currentColorArrangement[square] = blank)
        return true
      }
    }
  }

  const checkForColumnOfFour = () => {
    for(let i=0; i <= (width *(width-3))-1; i++) {
      const columnOfFour = [i, i+width, i+(width*2), i+(width*3)];
      const decidedColor = currentColorArrangement[i];
      const isBlank = currentColorArrangement[i] === blank

      if ( columnOfFour.every( square => currentColorArrangement[square] === decidedColor && !isBlank)) {
        setScore((score) => score + 4)
        columnOfFour.forEach(square => currentColorArrangement[square] = blank)
        return true
      }
    }
  }

  const createBoard = () => {
    const randomColorArrangament = []
    for (let i=0; i< width * width; i++) {
      // generate random number 0 - length of array
      const randomColor = candyColors[Math.floor(Math.random() * candyColors.length)]
      randomColorArrangament.push(randomColor)
    }
    setCurrentColorArrangement(randomColorArrangament)
  }

  useEffect(() => {
    createBoard()
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      checkForRowOfFour()
      checkForColumnOfFour()
      checkForRowOfThree()
      checkForColumnOfThree()
      moveIntoSquareBelowFillEmpty()
      setCurrentColorArrangement([...currentColorArrangement])
    }, 100)
    return () => clearInterval(timer)
  }, [currentColorArrangement,
    checkForRowOfFour,
    checkForColumnOfFour,
    checkForRowOfThree,
    checkForColumnOfThree,
    moveIntoSquareBelowFillEmpty])

  return (
    <div>
    <ScoreBoard score={score}/>
    <div className="app">
      <div className="game">
        {currentColorArrangement.map((candyColor, index) => (
          <img
            key={`img-${index}`}
            alt={candyColor}
            // style={{backgroundColor: candyColor}}
            src={candyColor}
            data-id={index}
            draggable={true}
            onDragStart={handleDragStart}
            onDragOver={prevDefault}
            onDragEnter={prevDefault}
            onDragLeave={prevDefault}
            onDrop={handleOnDrop}
            onDragEnd={handleDragEnd}
          >
          </img>
        ))}
      </div>
    </div>
    </div>
  );
}

export default App;
