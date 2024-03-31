const generateLetter = (validSet: Array<string>) => {
    const randomIndex = Math.floor(Math.random() * validSet.length)

    return validSet[randomIndex]
}

const generateListOfLetters = (numberOfLetters: number, validSet: Array<string>) => {
    const listOfLetters = []

    for (let i = 0; i < numberOfLetters; i++) {
        listOfLetters.push(generateLetter(validSet))
    }

    return listOfLetters
}

export { generateLetter, generateListOfLetters }