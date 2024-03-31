import { generateLetter, generateListOfLetters } from './LetterGenerator'

test('generates a random letter in the valid set', () => {
    const validSet = ['Q', 'W', 'E', 'R', 'A', 'S', 'D']

    const generatedLetter = generateLetter(validSet)

    expect(validSet.indexOf(generatedLetter)).toBeGreaterThan(-1)
})

test('generates a given number of random letters in a valid set', () => {
    const validSet = ['Q', 'W', 'E', 'R', 'A', 'S', 'D']
    const givenLength = 15

    const randomLetters = generateListOfLetters(givenLength, validSet)

    expect(randomLetters.length).toBe(givenLength)
    randomLetters.forEach((letter) => { expect(validSet.indexOf(letter)).toBeGreaterThan(-1) })
})