import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { createList } from './util'
import './App.css'

function App() {
  let dattebayo = new Audio('dattebayo.mp3')
  const [bgMusic] = useState(new Audio('bg-music.mp3'))
  const playDattebayo = () => dattebayo.play()
  const bgMusicPlaying = (playing = true) => {
    setMusicPlaying(playing)
    playing ? bgMusic.play() : bgMusic.pause()
  }

  const [musicPlaying, setMusicPlaying] = useState(false)

  const [showSettings, setShowSettings] = useState(false);
  let [nameList, setNameList] = useState([])
  let [numOfNames, setNumOfNames] = useState(50)
  let [length, setLength] = useState(7)
  let [startsWith, setStartsWith] = useState('')
  const [db, setDb] = useState('default')
  const [isConcat, setIsConcat] = useState(true)
  const [isExactLength, setIsExactLength] = useState(true)

  const [showClipboard, setShowClipboard] = useState(false)
  const [copyText, setCopyText] = useState('')

  const getNameList = () => {
    setNameList(createList(numOfNames, length, startsWith, db, isConcat, isExactLength))
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

  // change isConcat to false/true depending on the db
  const dbConfigs = {
    default: {
      name: 'Popular American Names',
      isConcat: true,
      exactLength: true
    },
    japanese: {
      name: 'Japanese Syllables',
      isConcat: false,
      exactLength: false
    },
    chinese: {
      name: 'Chinese Pinyin Syllables',
      isConcat: false,
      exactLength: false
    },
  }

  const onDbChange = db => {
    setIsConcat(dbConfigs[db].isConcat)
    setIsExactLength(dbConfigs[db].isExactLength)
    setDb(db)
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
        {/* <div className="counter-button" style={{ float: 'right'}} onClick={() => bgMusicPlaying(!musicPlaying)}>⚂</div> */}
        <div className="counter-button" style={{ float: 'right' }} onClick={() => bgMusicPlaying(!musicPlaying)}>♫ {musicPlaying ? 'ON' : 'OFF'}</div>

        <h1>Baby Name Generator</h1>
        <div>
          <div className="counter-button" style={{ display: 'inline-block' }} onClick={() => setShowSettings(!showSettings)}>
            {showSettings ? 'Hide Advanced Options' : 'Show Advanced Options'}
          </div>
        </div>
        {showSettings ?
          <>
            <div className="name-counter">
              <div className="counter-text">{`${numOfNames} names`}</div>
              <div className="counter-button" onClick={() => numOfNames - 10 >= 0 && setNumOfNames(numOfNames - 10)}>-10</div>
              <div className="counter-button" onClick={() => setNumOfNames(numOfNames + 10)}>+10</div>
            </div>
            <div className="name-counter">
              <div className="counter-text">{`${length} characters`}</div>
              <div className="counter-button" onClick={() => length - 1 >= 3 && setLength(length - 1)}>-1</div>
              <div className="counter-button" onClick={() => length + 1 < 20 && setLength(length + 1)}>+1</div>
            </div>
            <div className="name-counter">
              <div className="counter-text">Starts with: </div>
              <input value={startsWith} onChange={(e) => e.target.value.length <= length && setStartsWith(e.target.value)} />
            </div>
            <div className="name-counter">
              <div className="counter-text">Name Database: </div>
              <select onChange={(e) => onDbChange(e.target.value)} value={db}>
                {Object.keys(dbConfigs).map(db =>
                  <option value={db}>{dbConfigs[db].name}</option>
                )}
              </select>
            </div>
            <div className="name-counter">
              <div className="counter-text" title="Do you want to concatenate different parts of names together, or do you want to use whole names (i.e. japanese syllables would want this to be false).">Concating Names </div>
              <input type="checkbox" checked={isConcat} readonly />
            </div>
            <div className="name-counter">
              <div className="counter-text" title="Makes sense to not cut off names with mid syllable / chinese pinyin">Match requested length</div>
              <input type="checkbox" checked={isExactLength} readonly />
            </div>
          </>
          : null}

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
