import React, {useState, useEffect} from 'react'

const width = 8
const candyColors = ['blue', 'green', 'orange', 'purple', 'red', 'yellow']


const App = () => {
  const [currentColorArrangement, setCurrentColorArrangement] = useState([])

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

  console.log(currentColorArrangement)

  return (
    <div>
    </div>
  );
}

export default App;
