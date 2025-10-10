import { useEffect, useState } from 'react';
import './App.css';

import { Outlet } from 'react-router-dom';
import { config } from './configs/config';

function App() {
    const [works, setWorks] = useState<string | null>(null);
    const [dbWorks, setDBWorks] = useState<string | null>(null);
    const [postWorks, setPostWorks] = useState<string | null>(null);

    useEffect(() => {
        let controller: AbortController;

        async function getWorks() {
            controller = new AbortController();

            let json;
            try {
                const response = await fetch(`${config.baseApiUrl}/works`, {
                    signal: controller.signal,
                });
                json = await response.json();
                setWorks(json.message);
            } catch (e) {
                console.error('App connect err: ', e);
            }
        }

        getWorks();

        return () => {
            controller.abort();
        };
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);

        const formJSON = Object.fromEntries(formData.entries());
        const headers = new Headers({
            'Content-Type': 'application/json',
        });

        try {
            const response = await fetch(`${config.baseApiUrl}/works`, {
                method: 'POST',
                headers,
                body: JSON.stringify(formJSON),
            });

            const json = await response.json();

            setPostWorks(json.message);
        } catch (e) {
            console.error('App submit err: ', e);
        }
    }

    async function handleDBCheck(e) {
        try {
            const res = await fetch(`${config.baseApiUrl}/check`);
            const json = await res.json();

            setDBWorks(json.message);
        } catch (e) {
            setDBWorks('DB err: ' + e);
            console.log('DB err: ', e);
        }
    }

    return (
        <>
            <div className="main-container">
                <header className="main-header">Header</header>

                {!works ? <h2>loading...</h2> : <h2>{works}</h2>}

                <div>
                    <button onClick={handleDBCheck}>DB check: {dbWorks}</button>
                </div>

                <div>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="name">First name:</label>
                        <input
                            id="name"
                            name="name"
                            placeholder="Greg"
                            type="text"
                        ></input>

                        <button>submit</button>
                    </form>
                    {!postWorks ? <h2>loading...</h2> : <h2>{postWorks}</h2>}
                </div>

                <main className="main-body">
                    <Outlet />
                </main>

                <footer className="main-footer">Footer</footer>
            </div>
        </>
    );
}

export default App;
