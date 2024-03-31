import './Letter.css'

interface LetterProps {
    character: string,
    entered: boolean,
    correct: boolean
}

function Letter(props: LetterProps) {
    let clazz = 'unanswered'

    if (props.entered && props.correct) clazz = 'correct'
    if (props.entered && !props.correct) clazz = 'incorrect'

    return (
        <div className="Letter">
            <p className={clazz}>{props.character}</p>
        </div>
    )
}

export default Letter