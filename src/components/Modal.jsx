import { createPortal } from 'react-dom'

import image from '../assets/quiz-complete.png'

export default function Modal(){
    return createPortal(
        <dialog id="summary">
            <img src={image}/>
            <h2>Quiz completed!</h2>
            <button>ok</button>
        </dialog>
    , document.getElementById("root"))
}