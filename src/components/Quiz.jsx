import { useState } from 'react';
import questions from '../questions.js'
import Modal from './Modal.jsx';

let userAnswers = []

let correctAnswers = []

questions.forEach(function(question){
    correctAnswers.push(question.answers[0])
})

export default function Quiz() {

    const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
    let answers = questions[activeQuestionIndex].answers;
    let questionText = questions[activeQuestionIndex].text;

    function nextQuestion(e) {
        userAnswers.push(e.target.innerHTML)
        if (activeQuestionIndex < questions.length - 1) {
            setActiveQuestionIndex(prevState => prevState + 1)
        }
        console.log(userAnswers)
    }

    function calculateScore(){
        let totalScore = questions.length - 1
        let userScore = 0
        for (var i=0; i < userAnswers.length; i++) {
            if (userAnswers[i] === correctAnswers[i]){
                userScore += 1
            } 
        }
        console.log("Your score is " + userScore)
    }

    function randomizeAnswers(){
        
    }

    return (
        <div id="quiz">
            <div id="question">
                <h2>{questionText}</h2>
            </div>
            
            <ul id="answers">
                {answers.map(answer => <li className="answer" key={Math.random()}><button onClick={(e) => nextQuestion(e)}value={answer}>{answer}</button></li>)}
            </ul>

            <button onClick={calculateScore}>q1</button>
            
        </div>

    )
}