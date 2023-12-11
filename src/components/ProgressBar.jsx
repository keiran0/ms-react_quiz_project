import { useState, useEffect} from 'react';

export default function ProgressBar({ timeout, onTimeout }){

    const [ remainingTime, setRemainingTime ] = useState(timeout)

    useEffect(()=>{
        console.log("setting timeout")
        const timer = setTimeout(()=>{
            onTimeout();
        }, timeout)

        return ()=>{
            clearTimeout(timer)
        }

    }, [timeout, onTimeout])


    useEffect(()=>{ //useEffect used due to possible infinite loop where the setState function executes causing component to render again etc..
        console.log("setting interval")
        const interval = setInterval(() => {
            setRemainingTime(prevState => prevState - 100)
        }, 100);

        return ()=>{clearInterval(interval)}

    }, []) //no dependencies since no props/state values

    return(
        <progress value={remainingTime} max={timeout} id="question-time"></progress>
    )
}