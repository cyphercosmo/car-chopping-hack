import { useEffect, useState } from 'react'
import './App.css'
import HackingGame from './HackingGame'
import Letter from './Letter'
import ProgressBar from './ProgressBar'

let hackingGame = new HackingGame(15, 15, ['Q', 'W', 'E', 'R', 'A', 'S', 'D'])

function App() {
  const [letters, setLetters] = useState(hackingGame.letters())
  const [progress, setProgress] = useState({ time: hackingGame.time(), timePassed: hackingGame.timePassed(), over: hackingGame.isOver(), success: hackingGame.isSuccess() })

  document.onkeydown = (event) => {
    hackingGame.enterLetter(event.key.toUpperCase())
    setLetters([...hackingGame.letters()])
  }

  useEffect(() => {
    let intervalId = setInterval(() => {
      setProgress({ time: hackingGame.time(), timePassed: hackingGame.timePassed(), over: hackingGame.isOver(), success: hackingGame.isSuccess() })
    }, 1000)

    return () => {
      clearInterval(intervalId)
    }
  }, [progress])
  
  let renderStatus = () => {
    if (!progress.over) return null
  
    if (progress.success) {
      return <div className='status-success'><p>Success!</p></div>
    }
    
    return <div className='status-fail'><p>Failed!</p></div>
  }

  let renderNewGameButton = () => {
    if (!progress.over) return null

    return <div><button onClick={newGame}>Again!</button></div>
  }

  let newGame = () => {
    hackingGame = new HackingGame(15, 15, ['Q', 'W', 'E', 'R', 'A', 'S', 'D'])
    setLetters([...hackingGame.letters()])
    setProgress({ time: hackingGame.time(), timePassed: hackingGame.timePassed(), over: hackingGame.isOver(), success: hackingGame.isSuccess() })
  }

  return (
    <div className='App'>
      <div className='letters'>{ letters.map((randomLetter, index) => <Letter key={index} character={randomLetter.character} correct={randomLetter.correct} entered={randomLetter.entered}/>)}</div>
      <ProgressBar bgcolor='red' completed={(1-progress.timePassed/progress.time)*100}/>
      <div className='time'><p>{progress.timePassed} seconds passed out of {progress.time}</p></div>
      { renderStatus() }
      { renderNewGameButton() }
    </div>
  );
}

export default App;
