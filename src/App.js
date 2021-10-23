const width = 8
const candyColors = ['blue', 'green', 'orange', 'purple', 'red', 'yellow']


const App = () => {

  const createBoard = () => {
    for (let i=0; i< width * width; i++) {
      const randomColor = candyColors[Math.floor(Math.random() * candyColors.length)]
    }
  }

  return (
    <div>
    </div>
  );
}

export default App;
