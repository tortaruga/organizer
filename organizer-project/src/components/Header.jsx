import { useState, useEffect } from "react";
// import darkModeIcon from '/images/dark-mode-icon.svg';
// import lightModeIcon from '/images/light-mode-icon.svg';

export default function Header() {
    const [darkMode, setDarkMode] = useState(false);

    function switchTheme() {
        setDarkMode(prevMode => !prevMode);
    }

    useEffect(() => {
        document.querySelector('html').classList.toggle('dark');
    }, [darkMode])

    const [date, setDate] = useState(new Date());
    
    useEffect(() => {
        const updateDate = () => {
            setDate(new Date());
        };

        const now = new Date();
        const delay = 60000 - (now.getSeconds() * 1000 + now.getMilliseconds());
        const timeoutId = setTimeout(() => {
            updateDate();
            const intervalId = setInterval(updateDate, 60000);
            return () => clearInterval(intervalId);
        }, delay);

        updateDate();
        return () => clearInterval(timeoutId);
    }, []);

    
    const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const formattedDate = date.toLocaleDateString([], {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });
    
    return (
        <header>
            <div>
                <h1>Let's stay organized!</h1>
                <div className="date-time-section">
                   <span>{formattedDate}</span>
                   <span>{formattedTime}</span>
                </div>
            </div>

            <button type="button" className="theme-btn" aria-label="switch theme" onClick={switchTheme}></button>
        </header>
    )
}