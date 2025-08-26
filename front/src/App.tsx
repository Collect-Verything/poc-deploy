import React, { useState} from 'react';
import './App.css';
import SimpleSiteConfigForm from "./config";

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

    const connectDeployService = ()=>{
        fetchWithFallback()
    }



    return (
        <div className="App">
            <header className="App-header">
                <h1>
                    {!message ?
                        <button onClick={connectDeployService}>Try to connect</button> :
                        <p>{message}</p>
                    }
                </h1>
                <SimpleSiteConfigForm/>
            </header>
        </div>
    );
}

export default App;
