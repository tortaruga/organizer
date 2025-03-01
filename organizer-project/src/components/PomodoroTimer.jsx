import { useEffect, useState } from "react";
import notification from '/audio/notification-1.mp3';

export default function PomodoroTimer({onClick}) {
    const [timer, setTimer] = useState({min: 25, sec: 0});
    const [isActive, setIsActive] = useState(false);

    function handleTimer(e) {
        document.querySelectorAll('.pomodoro button.selected').forEach(btn => btn.classList.remove('selected'));

        e.target.classList.add('selected');

        if (e.target.id === 'timer-task') {
            setTimer({
                min: 25,
                sec: 0
            });
        } else if (e.target.id === 'timer-short') {
            setTimer({
                min: 5,
                sec: 0
            });
        } else if (e.target.id === 'timer-long') {
            setTimer({
                min: 15,
                sec: 0
            });
        }
    }
    
    useEffect(() => {
        let interval;
        if (isActive) {
            interval = setInterval(() => {
                setTimer(prevTimer => {
                    if (prevTimer.sec === 0) {
                        if (prevTimer.min === 0) {
                            clearInterval(interval);
                            handleTimerEnd();
                            return prevTimer;
                        }
                        return {
                            min: prevTimer.min - 1,
                            sec: 59
                        };
                    } else {
                        return {
                            ...prevTimer,
                            sec: prevTimer.sec - 1
                        };
                    }
                });
            }, 1000);
        } else if (!isActive) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, timer]);

    function startTimer() {
        setIsActive(true);
    }

    function handleTimerEnd() {
        playNotification();
        showNotification();
    }

    function playNotification() {
        const audio = new Audio(notification);
        audio.play();
    }

    const showNotification = () => {
        if (Notification.permission === 'granted') {
            new Notification('Time is up!', { body: 'Your timer has ended.' });
        } else if (Notification.permission !== 'denied') {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    new Notification('Time is up!', { body: 'Your timer has ended.' });
                }
            });
        }
    };

    function pauseTimer() {
        setIsActive(false);
    }

    function resetTimer() {
        setIsActive(false);
        setTimer({});
    }

    const minLeft = `${timer.min < 10 ? '0' + timer.min : timer.min}`;
    const secLeft = `${timer.sec < 10 ? '0' + timer.sec : timer.sec}`;
    const timeLeft = `${minLeft !== 'undefined' ? minLeft : '00'}:${secLeft !== 'undefined' ? secLeft : '00'}`;
    
    return (
        <div className="pomodoro">
            <button className="close-pomodoro" onClick={onClick}></button>
            <span className="time-left">{timeLeft || '00:00'}</span>

            {!isActive && <button type="button" className="start-timer" onClick={startTimer}>start</button>}
            {isActive && <button type="button" className="pause-timer" onClick={pauseTimer}>pause</button>} 
            
            <div className="buttons">
                <button type="button" id="timer-task" className="selected" onClick={handleTimer}>task</button>
                <button type="button" id="timer-short" onClick={handleTimer}>short break</button>
                <button type="button" id="timer-long" onClick={handleTimer}>long break</button>
            </div>

            <button type="button" className="reset-timer" onClick={resetTimer}>reset</button>

        </div>
    )
}
