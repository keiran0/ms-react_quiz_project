import { createPortal} from 'react-dom'
import { useRef, forwardRef, useImperativeHandle} from 'react'

import image from '../assets/quiz-complete.png'
import questions from '../questions.js'



const Modal = forwardRef(function Modal({userScore, userAnswers}, ref){

    const dialog = useRef();

    useImperativeHandle(ref, ()=>{
        return {
            open(){
                console.log(userAnswers)
                for (var i = 0; i < questions.length; i++){
                    questions[i].userAnswer = userAnswers[i]
                    questions[i].id = questions[i].id.substr(questions[i].id.length - 1)
                    if (userAnswers[i] == 'Skipped') {
                        questions[i].answerStatus = 'user-answer skipped'
                    } else if (userAnswers[i] == questions[i].answers[0]) {
                        questions[i].answerStatus = 'user-answer correct'
                    } else {
                        questions[i].answerStatus = 'user-answer wrong'
                    }
                }
                dialog.current.showModal()
            }
            ,
            isOpen(){
                return dialog.current.open
            }

        }
    })

    return createPortal(
        <dialog id="summary" ref={dialog}>
            <img src={image}/>
            <h2>Quiz completed!</h2>
            <div id="summary-stats">
                <p>
                    <span className="number">{Math.round(userScore.skipped/userScore.total * 100)}%</span>
                    <span className="text">Skipped</span>
                </p>
                <p>
                    <span className="number">{Math.round(userScore.correct/userScore.total * 100)}%</span>
                    <span className="text">Answered Correctly</span>
                </p>
                <p>
                    <span className="number">{Math.round((userScore.total - userScore.correct -userScore.skipped )/userScore.total * 100)}%</span>
                    <span className="text">Answered incorrectly</span>
                </p>
            
            </div>
      
            <ol>
                {questions.map((question)=>
                <li>
                    <h3>{question.id}</h3>
                    <p className="question">{question.text}</p>
                    <p className={question.answerStatus}>{question.userAnswer}</p>
                </li>)}
            </ol>
        </dialog>
    , document.getElementById("root"))
})

export default Modal
