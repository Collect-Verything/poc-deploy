import React, {useEffect, useState} from 'react';
import './App.css';

function App() {

    const[message, setMessage] = useState('');

    async function fetchWithFallback() {
        try {
            const res = await fetch("http://deploy-service:3001/");
            setMessage(res.statusText);
        } catch (err) {
            console.warn("Échec sur deploy-service, tentative sur localhost...", err);
            try {
                // 2. Fallback sur localhost
                const res = await fetch("http://localhost:3001/");
                setMessage(res.statusText);
            } catch (err2) {
                console.error("Échec sur localhost aussi :", err2);
                setMessage("Aucune réponse du backend");
            }
        }
    }


    useEffect(() => {
         fetchWithFallback()
    })

    if(!message) return <p>Loading ...</p>
    // if(!message) return <CircularProgress variant="solid" />


    return (
    <div className="App">
      <header className="App-header">
        <p>
            {message}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
