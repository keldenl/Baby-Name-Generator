import db from './db'

const nameList = db.split('\n')

const toProperCase = (str) => {
  return str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
}

// (inclusive, exclusive)
const randNum = (min, max) => (Math.floor(Math.random() * (max - min)) + min)

// 1-3 characters
const getRandSub = () => randNum(2, 4)


// random word from list
const getRandWord = () => nameList[randNum(0, nameList.length)]

const getRandPart = (startIdx) => {
  const word = getRandWord()
  const sub = getRandSub()
  if (startIdx > word.length - sub) {
    return ''
  }

  const randStart = randNum(startIdx, word.length - sub)
  return word.substring(randStart, sub + randStart)
}

const createName = () => {
  let output = ''

  while (output.length < 6) {
    const name = getRandPart(output.length)
    output += name
  }


  return toProperCase(output)
}

export const createList = (max = 25) => {
  let outputList = []
  for (let i = 0; i < max; i++) {
    outputList.push(createName())
  }
  return outputList
}