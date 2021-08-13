import { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { createList } from './util'
import './App.css'

function App() {
  let dattebayo = new Audio('dattebayo.mp3')
  const playDattebayo = () => dattebayo.play()

  let [nameList, setNameList] = useState([])
  let [numOfNames, setNumOfNames] = useState(50)

  const [showClipboard, setShowClipboard] = useState(false)
  const [copyText, setCopyText] = useState('')

  const getNameList = () => {
    setNameList(createList(numOfNames))
    playDattebayo()
  }

  const toastConfig = {
    position: "bottom-center",
    autoClose: 1750,
  }

  const copyToClipBoard = async (name) => {
    const newCopyText = copyText.length ? `${copyText}, ${name}` : name
    setCopyText(newCopyText)
    try {
      await navigator.clipboard.writeText(newCopyText);
      toast.success(`Copied ${newCopyText}!`, toastConfig)
    } catch (err) {
      toast.error('Failed to copy name!', toastConfig)
    }
  }

  const resetClipboard = () => {
    setCopyText('')
    toast.info(`Successfully reset clipboard!`, toastConfig)
  }

  return (
    <div className="App">
      <ToastContainer />
      <div className="clipboard" onClick={() => setShowClipboard(!showClipboard)}>
        <img alt='clipboard' src='https://i.pinimg.com/originals/82/30/7b/82307bf80edf1f01c739302c34e9d743.png' />
        <p>Clipboard</p>
      </div>
      <div className={`clipboard-modal ${showClipboard && 'show-modal'}`}>
        <h2>Clipboard</h2>
        <textarea value={copyText}></textarea>
      </div>
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
        <div className="counter-button" onPointerDown={resetClipboard}>RESET CLIPBOARD</div>
        {nameList.length ? <div className="name-list-container">
          {nameList.map((name, i) => (
            <div className="name-container" onPointerDown={() => copyToClipBoard(name)}>{`${i + 1}. ${name}`}</div>
          ))}
        </div> : undefined}
      </div>
    </div>
  )
}

export default App
