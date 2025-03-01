import timerIcon from '/images/timer-icon.svg';
import { useState } from 'react';
import PomodoroTimer from './PomodoroTimer';

export default function Tools() {
   const [pomodoro, setPomodoro] = useState(false);

   function handlePomodoroTimer() {
    setPomodoro(prevState => !prevState);
   }

    return ( 
        <section className='tool-section'>
          <div className="tools">
            <button type="button" title="pomodoro timer" onClick={handlePomodoroTimer}>
              <img src={timerIcon} alt="" />
            </button>
          </div>

          {pomodoro && <PomodoroTimer onClick={handlePomodoroTimer}/>}
        </section>
    )
}