import { defaultDb, japaneseDb, chineseDb } from './db'

const nameLists = {
  default: defaultDb.split('\n'),
  japanese: japaneseDb.split('\n'),
  chinese: chineseDb.split('\n'),
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

const getRandPart = (startIdx, totalLength, nameList, isConcat) => {
  const word = getRandWord(nameList)
  if (!isConcat) {
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

const createName = (length, startsWith, nameList, isConcat, exactLength) => {
  let output = startsWith
  let separatorCount = 0

  while (output.length - separatorCount < length) {
    let name = getRandPart(output.length, length, nameList, isConcat)
    let possibleName = output + (output.length > 0 && !isConcat ? '-' : '') + name

    // If there are 3 consecutive IDENTICAL or CONSONANTS characters...
    // try again until there isn't
    while (isConcat && hasMatchesMultiple(possibleName, [threeConsecutiveRegex, threeConsecutiveConsonants])) {
      name = getRandPart(output.length, length, nameList)
      possibleName = output + name
    }
    output = possibleName
    !isConcat && separatorCount++
  }

  return toProperCase(exactLength ? output.substring(0, length) : output)
}

export const createList = (max = 25, length = 6, startWith = '', db = defaultDb, isConcat = true, exactLength = true) => {
  let outputList = []
  const nameList = nameLists[db]

  for (let i = 0; i < max; i++) {
    outputList.push(createName(length, startWith, nameList, isConcat, exactLength))
  }
  return outputList
}