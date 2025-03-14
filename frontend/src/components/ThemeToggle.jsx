import React, { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
const ThemeToggle = () => {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || 'light')
    useEffect(() => {
        if (theme) {

            document.documentElement.setAttribute("data-theme", theme);
        }
        localStorage.setItem("theme", theme)
    }, [theme])
    return (
        <button onClick={() => theme === "dark" ? setTheme('light') : setTheme('dark')} className='w-12 h-12 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 transition-all'>
            {
                theme === 'dark' ?
                    <Sun size={24} className="text-yellow-400" /> :
                    <Moon size={24} className="text-gray-800 dark:text-gray-300" />
            }
        </button>
    )
}

export default ThemeToggle