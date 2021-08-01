import './App.css'
import { useState } from 'react'
import { createList } from './util'

function App() {
  let [nameList, setNameList] = useState([])
  let dattebayo = new Audio('/dattebayo.mp3')
  const playDattebayo = () => dattebayo.play()

  const getNameList = () => {
    setNameList(createList(32))
    playDattebayo()
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Baby Name Generator</h1>
        <div className="banner">
          <button onClick={getNameList}>
            <span className="headbandCircles">&#10247;</span>
            <span className="buttonText">Generate</span>
            <span className="headbandCircles">&#10247;</span>
          </button>
        </div>
        <ul>
          {nameList.map((name) => (
            <li>{name}</li>
          ))}
        </ul>
      </header>
    </div>
  )
}

export default App
