import './App.css'
import { useState } from 'react'
import { createList } from './util'

function App() {
  let [nameList, setNameList] = useState([])
  let [numOfNames, setNumOfNames] = useState(50)
  let dattebayo = new Audio('dattebayo.mp3')
  const playDattebayo = () => dattebayo.play()

  const getNameList = () => {
    setNameList(createList(numOfNames))
    playDattebayo()
  }

  return (
    <div className="App">
      <header className="header">
        <h1>Baby Name Generator</h1>
        <div className="name-counter">
          <div className="counter-text">{`${numOfNames} names`}</div>
          <div className="counter-button" onClick={() => numOfNames - 10 >= 0 && setNumOfNames(numOfNames - 10)}>-10</div>
          <div className="counter-button" onClick={() => setNumOfNames(numOfNames + 10)}>+10</div>
        </div>
        <button onClick={getNameList}>
          <span className="headbandCircles">&#10247;</span>
          <span className="buttonText">Generate</span>
          <span className="headbandCircles">&#10247;</span>
        </button>
      </header>
      <div className="content-wrapper">
        {nameList.length ? <div className="name-list-container">
          {nameList.map((name, i) => (
            <div className="name-container">{`${i + 1}. ${name}`}</div>
          ))}
        </div> : undefined}
      </div>
    </div>
  )
}

export default App
