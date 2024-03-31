import HackingGame from "./HackingGame"

jest.useFakeTimers();

describe('hacking game', () => {
    let givenLength: number, givenTime: number, validSet: Array<string>, game: HackingGame;

    beforeEach(() => {
        givenLength = 15
        givenTime = 15
        validSet = ['Q', 'W', 'E', 'R', 'A', 'S', 'D']

        game = new HackingGame(givenTime, givenLength, validSet)
    })

    test('initializes the game', () => {
        expect(game.letters().length).toBe(givenLength)
        expect(game.time()).toBe(givenTime)
        expect(game.isOver()).toBeFalsy()
    })

    test('enters next letter', () => {
        game.enterLetter('Y')

        expect(game.letters()[0].entered).toBeTruthy()
    })

    test('enters correct letter', () => {
        const firstLetter = game.letters()[0]

        game.enterLetter(firstLetter.character)

        expect(firstLetter.correct).toBeTruthy()
    })

    test('enters incorrect letter', () => {
        const firstLetter = game.letters()[0]

        game.enterLetter(' ')

        expect(firstLetter.correct).toBeFalsy()
    })

    test('game over after all letters are entered correctly', () => {
        game.letters().forEach((letter) => {
            game.enterLetter(letter.character)
        })

        expect(game.isOver()).toBeTruthy()
        expect(game.isSuccess()).toBeTruthy()
    })

    test('game over after time has passed', () => {
        jest.advanceTimersByTime(givenTime * 1000);
        expect(game.isOver()).toBeTruthy()
    })

    test('game over after incorrect letter is entered', () => {
        game.enterLetter(' ')
        expect(game.isOver()).toBeTruthy()
    })
})