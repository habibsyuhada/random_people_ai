import { useEffect, useState } from 'react'

const themes = ["light", "dark", "cupcake", "cyberpunk", "fantasy"]

export default function ThemeChanger() {
  const [theme, setTheme] = useState('dark')

  // Initialize theme from localStorage or default to 'dark'
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark'
    setTheme(savedTheme)
    document.documentElement.setAttribute('data-theme', savedTheme)
  }, [])

  // Update theme when changed
  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newTheme = e.target.value
    setTheme(newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
    localStorage.setItem('theme', newTheme)
  }

  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost gap-1 normal-case">
        <svg
          width="20"
          height="20"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="inline-block h-5 w-5 stroke-current md:h-6 md:w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
          ></path>
        </svg>
        <span className="hidden md:inline">Theme</span>
        <svg
          width="12px"
          height="12px"
          className="ml-1 hidden h-3 w-3 fill-current opacity-60 sm:inline-block"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 2048 2048"
        >
          <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
        </svg>
      </label>
      <div
        tabIndex={0}
        className="dropdown-content bg-base-200 text-base-content rounded-t-box rounded-b-box top-px mt-16 w-56 overflow-y-auto shadow-2xl"
      >
        <div className="grid grid-cols-1 gap-3 p-3" tabIndex={0}>
          <select 
            className="select select-bordered w-full" 
            value={theme}
            onChange={handleThemeChange}
          >
            {themes.map((t) => (
              <option key={t} value={t}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
} 