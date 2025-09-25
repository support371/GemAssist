import { useState } from "react";
import Navigation from '../Navigation';

export default function NavigationExample() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    console.log('Dark mode toggled:', !darkMode);
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      <Navigation darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
    </div>
  );
}