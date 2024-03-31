import { generateListOfLetters } from "./LetterGenerator";

export type Letter = { character: string, entered: boolean, correct: boolean }

class HackingGame {
    timeInSeconds: number;
    listOfRandomLetters: Array<Letter>
    currentLetter = 0
    over = false
    timePassedInSeconds: number = 0
    _id = Date.now()

    constructor(time: number,
        length: number,
        validSet: Array<string>) {
            this.timeInSeconds = time
            this.listOfRandomLetters = generateListOfLetters(length, validSet).map((letter) => { return { character: letter, entered: false, correct: false } })
            this._startGameTimer()
        }

    id() {
        return this._id;
    }

    time() {
        return this.timeInSeconds;
    }

    timePassed() {
        return this.timePassedInSeconds;
    }

    letters() {
        return this.listOfRandomLetters;
    }

    enterLetter(letter: string) {
        this._evaluateLetter(letter)
        this._updateGameStatus()
    }

    isOver() {
        return this.over
    }

    isSuccess() {
        return this.listOfRandomLetters.every((letter) => letter.correct)
    }

    _evaluateLetter(letter: string) {
        if (this.over) return
    
        const currentLetter = this.listOfRandomLetters[this.currentLetter]
        currentLetter.entered = true
        currentLetter.correct = currentLetter.character === letter

        this.currentLetter++
    }

    _updateGameStatus() {
        this.over = this.listOfRandomLetters.some((letter) => letter.entered && !letter.correct) || this.currentLetter >= this.listOfRandomLetters.length
    }

    _startGameTimer() {
        let intervalId = setInterval(() => {
            if (this.over) return

            this.timePassedInSeconds += 1

            this.over = this.timePassedInSeconds >= this.timeInSeconds

            if (this.over) clearInterval(intervalId)

        }, 1000);
    }
}

export default HackingGame