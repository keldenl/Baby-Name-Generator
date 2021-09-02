import { defaultDb, japaneseDb, chineseDb, englishDb } from './db'

const nameLists = {
  default: defaultDb.split('\n'),
  japanese: japaneseDb.split('\n'),
  chinese: chineseDb.split('\n'),
  english: englishDb.split('\n'),
}

const toProperCase = (str) => {
  return str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
}

// (inclusive, exclusive)
const randNum = (min, max) => (Math.floor(Math.random() * (max - min)) + min)

// 1-3 characters
const getRandSub = () => randNum(2, 4)


// random word from list
const getRandWord = (nameList) => nameList[randNum(0, nameList.length)]

const getRandPart = (startIdx, totalLength, nameList, isSyllables) => {
  const word = getRandWord(nameList)
  if (isSyllables) {
    return word
  }

  const sub = getRandSub()
  const newPartIdx = Math.floor((startIdx / totalLength) * word.length)
  if (newPartIdx > word.length - sub) {
    return ''
  }

  // const randStart = randNum(startIdx, word.length - sub)
  return word.substring(newPartIdx, sub + newPartIdx)
}

// Regexes
const threeConsecutiveRegex = /(?=(.)\1{2})(\1+)/gm
const threeConsecutiveConsonants = /([^aeiou]{3})/i

// Takes in a string and multiple regexes, return true if there are matches, false otherwise
const hasMatchesMultiple = (str, arrRegex) => {
  for (let reg of arrRegex) {
    if (str.match(reg) != null) return true
  }
  return false
}

const createName = (length, startsWith, nameList, isSyllables) => {
  if (isSyllables) {
    return createSyllablesName(length, startsWith, nameList)
  }
  return createDefaultName(length, startsWith, nameList)
}

const createDefaultName = (length, startsWith, nameList) => {
  let output = startsWith[0]

  while (output.length < length) {
    let name = getRandPart(output.length, length, nameList, false)
    let possibleName = output + name

    // If there are 3 consecutive IDENTICAL or CONSONANTS characters...
    // try again until there isn't
    while (hasMatchesMultiple(possibleName, [threeConsecutiveRegex, threeConsecutiveConsonants])) {
      name = getRandPart(output.length, length, nameList)
      possibleName = output + name
    }
    output = possibleName
  }

  return toProperCase(output.substring(0, length))
}

const createSyllablesName = (length, startsWith, nameList) => {
  let output = new Array(length).fill('')
  startsWith.map((s, i) => output[i] = s)

  for (let i = 0; i < length; i++) {
    if (output[i].length) continue
    let name = getRandPart(output.length, length, nameList, true)
    output[i] = name
  }

  return output.join(' ')
}

export const createList = (max = 25, length = 6, startWith = [''], db = defaultDb, isSyllables = false) => {
  let outputList = []
  const nameList = nameLists[db]

  for (let i = 0; i < max; i++) {
    outputList.push(createName(length, startWith, nameList, isSyllables))
  }
  return outputList
}