import './App.css'
import { useState } from 'react'
import { createList } from './util'

function App() {
  let [nameList, setNameList] = useState([])
  let dattebayo = new Audio('dattebayo.mp3')
  const playDattebayo = () => dattebayo.play()

  const getNameList = () => {
    setNameList(createList(50))
    playDattebayo()
  }

  return (
    <div className="App">
      <header className="header">
        <h1>Baby Name Generator</h1>
        <button onClick={getNameList}>
          <span className="headbandCircles">&#10247;</span>
          <span className="buttonText">Generate</span>
          <span className="headbandCircles">&#10247;</span>
        </button>
      </header>
      <div className="content-wrapper">
        <div className="name-list-container">
          {nameList.map((name, i) => (
            <div className="name-container">{`${i + 1}. ${name}`}</div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
