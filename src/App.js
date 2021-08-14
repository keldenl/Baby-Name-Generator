import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { createList } from './util'
import './App.css'

function App() {
  let dattebayo = new Audio('dattebayo.mp3')
  const playDattebayo = () => dattebayo.play()

  let [nameList, setNameList] = useState([])
  let [numOfNames, setNumOfNames] = useState(50)
  let [length, setLength] = useState(7)

  const [showClipboard, setShowClipboard] = useState(false)
  const [copyText, setCopyText] = useState('')

  const getNameList = () => {
    setNameList(createList(numOfNames, length))
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
      toast.success(`Clipboard updated to "${newCopyText}"!`, toastConfig)
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
      <div className={`clipboard-container ${showClipboard && 'show-container'}`} >
        <div className='dark-overlay' onClick={() => setShowClipboard(!showClipboard)}></div>
        <div className='clipboard-modal'>
          <span className='modal-header'>
            <h2>Clipboard
              <div className="counter-button reset-clipboard" onPointerDown={resetClipboard}>RESET CLIPBOARD</div>
            </h2>
            <span className="close" onClick={() => setShowClipboard(!showClipboard)}>+</span>
          </span>
          <textarea value={copyText} readonly></textarea>
        </div>
      </div>
      <header className="header">
        <h1>Baby Name Generator</h1>
        <div className="name-counter">
          <div className="counter-text">{`${numOfNames} names`}</div>
          <div className="counter-button" onClick={() => numOfNames - 10 >= 0 && setNumOfNames(numOfNames - 10)}>-10</div>
          <div className="counter-button" onClick={() => setNumOfNames(numOfNames + 10)}>+10</div>
        </div>
        <div className="name-counter">
          <div className="counter-text">{`${length} characters`}</div>
          <div className="counter-button" onClick={() => length - 1 >= 3 && setLength(length - 1)}>-1</div>
          <div className="counter-button" onClick={() => length + 1 < 11 && setLength(length + 1)}>+1</div>
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
            <div className="name-container" onPointerDown={() => copyToClipBoard(name)}>{`${i + 1}. ${name}`}</div>
          ))}
        </div> : undefined}
      </div>
    </div >
  )
}

export default App
