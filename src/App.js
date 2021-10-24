import React, {useState, useEffect} from 'react'

const width = 8
// const candyColors = ['blue', 'green', 'orange']
const candyColors = ['blue', 'green', 'orange', 'purple', 'red', 'yellow']


const App = () => {
  const [currentColorArrangement, setCurrentColorArrangement] = useState([])

  

  const checkForRowOfThree = () => {
    // select a row
    for(let j=0; j < width; j++) {
      // check in a row
      for(let i = j*width; i < width+(j*width)-3; i++) {
        const rowOfThree = [i, i+1, i+2]
        const decidedColor = currentColorArrangement[i]

        if(rowOfThree.every(square => currentColorArrangement[square] === decidedColor)) {
          rowOfThree.forEach(square => currentColorArrangement[square] = '')
        }
      }
    }
  }

  const checkForRowOfFour = () => {
    // select a row
    for(let j=0; j < width; j++) {
      // check in a row
      for(let i = j*width; i < width+(j*width)-4; i++) {
        const rowOfFour = [i, i+1, i+2, i+3]
        const decidedColor = currentColorArrangement[i]

        if(rowOfFour.every(square => currentColorArrangement[square] === decidedColor)) {
          rowOfFour.forEach(square => currentColorArrangement[square] = '')
        }
      }
    }
  }

  const checkForColumnOfThree = () => {
    for(let i=0; i < (width *(width-2))-1; i++) {
      const columnOfThree = [i, i+width, i+(width*2)];
      const decidedColor = currentColorArrangement[i];

      if ( columnOfThree.every( square => currentColorArrangement[square] === decidedColor)) {
        columnOfThree.forEach(square => currentColorArrangement[square] = '')
      }
    }
  }

  const checkForColumnOfFour = () => {
    for(let i=0; i < (width *(width-3))-1; i++) {
      const columnOfFour = [i, i+width, i+(width*2), i+(width*3)];
      const decidedColor = currentColorArrangement[i];

      if ( columnOfFour.every( square => currentColorArrangement[square] === decidedColor)) {
        columnOfFour.forEach(square => currentColorArrangement[square] = '')
      }
    }
  }

  const createBoard = () => {
    const randomColorArrangament = []
    for (let i=0; i< width * width; i++) {
      // generate randome number 0 - length of array
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
      setCurrentColorArrangement([...currentColorArrangement])
    }, 100)
    return () => clearInterval(timer)
  }, [currentColorArrangement])
  // }, [checkForColumnOfFour, checkForColumnOfThree, currentColorArrangement])

  // console.log(currentColorArrangement)

  return (
    <div className="app">
      <div className="game">
        {currentColorArrangement.map((candyColor, index) => (
          <img
            key={`img-${index}`}
            alt={candyColor}
            style={{backgroundColor: candyColor}}></img>
        ))}
      </div>
    </div>
  );
}

export default App;
