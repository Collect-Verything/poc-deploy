import React, {useEffect, useState} from 'react';
import './App.css';
import SimpleSiteConfigForm from "./condif";

function App() {

    const [message, setMessage] = useState('');

    async function fetchWithFallback() {
        try {
            const res = await fetch("http://localhost:3001/");
            const body = await res.text();
            setMessage(body);
        } catch (err2) {
            console.error("Échec sur localhost aussi :", err2);
            setMessage("Aucune réponse du backend");
        }
    }


    useEffect(() => {
        fetchWithFallback()
    })

    return (
        <div className="App">
            <header className="App-header">
                <p>
                    {!message ?
                        <p>Loading ...</p> :
                        <p>{message}</p>
                    }
                </p>
                <SimpleSiteConfigForm/>
            </header>
        </div>
    );
}

export default App;
