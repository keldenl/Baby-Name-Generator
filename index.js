const testList = ['eliza', 'kevin', 'kelden', 'tiajha']

//let nameRaw = fs.readFileSync(path.resolve(__dirname, 'db.txt'), 'utf8')
let nameList = async () => await fetch('db.txt').then(res => res.text()).then(names => names.split('\n')).then(n => console.log(n))
//let nameList = nameRaw().split("\n")

String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

// (inclusive, exclusive)
const randNum = (min, max) => (Math.floor(Math.random() * (max-min)) + min)

  // 1-3 characters
const getRandSub = () => randNum(2, 4)

// random word from list
const getRandWord = () => nameList()[randNum(0, nameList().length)]

const getRandPart = async (startIdx) => {
  const word = await getRandWord()
  const sub = getRandSub()
  if (startIdx > word.length-sub) {
    return ''
  }
  
  const randStart = randNum(startIdx, word.length-sub)
  return word.substring(randStart, sub+randStart)
}

const createName = async () => {
  let output = ''

  while(output.length < 6) {
    const name = await getRandPart(output.length)
    output += name  
  }
 
 
  return output.toProperCase()
}

const createList = async (max = 10) => {
  let outputList = ''
  for (let i = 0; i < max; i++) {
    outputList.push(await createName())
  }
  alert(outputList)
  return outputList
}

const main = (max = 25) => {
//  console.log(`${max} GENERATED NAMES`)
//  console.log('=================================================')
//  console.log()
//  console.log(createList(max))
//  console.log()
//  console.log(`Press CMD+R twice to generate ${max} more...`)
  
}