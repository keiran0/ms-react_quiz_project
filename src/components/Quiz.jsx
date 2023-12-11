import { useRef, useState, useCallback } from 'react';

import Modal from './Modal.jsx';
import ProgressBar from './ProgressBar.jsx';
import questions from '../questions.js'

let userAnswers = []

let correctAnswers = []

questions.forEach(function(question){
    correctAnswers.push(question.answers[0])
})

export default function Quiz() {

    const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
    const [score, setScore] = useState({
        skipped: 0, 
        correct: 0, 
        total: questions.length
    })

    let answers = questions[activeQuestionIndex].answers;
    let questionText = questions[activeQuestionIndex].text;

    const modal = useRef();

    let timer = 10000

    const randomizedAnswers = useRef(); //can be used to 'store' values that do not need to be re-evaluated each time the component re-renders.
    randomizedAnswers.current = [...answers]
    randomizedAnswers.current.sort( ()=>Math.random()-0.5 ); 

    function calculateScore(){
        for (var i=0; i < userAnswers.length; i++) {
            if (userAnswers[i] === correctAnswers[i]){
                setScore((prevState)=>{
                    return {
                        ...prevState,
                        correct: prevState.correct + 1
                    }
                })
            } 
            if (userAnswers[i] === 'Skipped') {
                setScore((prevState)=>{
                    return {
                        ...prevState,
                        skipped: prevState.skipped + 1
                    }
                })
            }
        }
        modal.current.open();
    }

    function nextQuestion() {

        const timeout = setTimeout(()=>{
            clearTimeout(timeout);
            if (activeQuestionIndex < questions.length - 1) {
                setActiveQuestionIndex(prevState => prevState + 1)
            } else {
                if (!modal.current.isOpen()){
                    calculateScore();
                } 
            }
        }, 1000)
        
    }

    function questionAnswered(e){

        userAnswers.push(e.target.innerHTML)
        
        if (e.target.innerHTML == correctAnswers[activeQuestionIndex]) {
            e.target.classList.add("correct")
        } else {
            e.target.classList.add("wrong")
        }

        timer = 1000

        nextQuestion();
    }

    const questionSkipped = useCallback(function questionSkipped(){
        userAnswers.push("Skipped")
        nextQuestion();

    })

    const handleQuestionSkipped = useCallback(()=>{
        questionSkipped();
    }, [questionSkipped])

    return (
        <div id="quiz">
            {/* the key prop can be used on any component. When the key changes, the component will unmount and remount again */}
            <ProgressBar timeout={timer} onTimeout={handleQuestionSkipped} key={activeQuestionIndex}/>
            <div id="question">
                <h2>{questionText}</h2>
            </div>
            <ul id="answers">
                {randomizedAnswers.current.map(answer => <li className="answer" key={Math.random()}><button onClick={(e) => questionAnswered(e)} value={answer}>{answer}</button></li>)}
            </ul>
            <Modal ref={modal} userScore={score} userAnswers={userAnswers}/>
        </div>

    )
}