import { config } from 'dotenv';
config();

import express from 'express';
import http from 'http';
import cors from 'cors';

import { connect } from './server/db/connect';

const PORT = parseInt(process.env.VITE_DEV_SERVER_PORT);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

const server = http.createServer(app);

app.get('/api/works', (req, res) => {
    res.status(200).json({
        message: 'Connection works',
    });
});

app.get('/api/check', async (req, res) => {
    const [pool, client] = await connect();

    console.log('completed DB check', pool, client);

    res.status(200).json({ message: 'DB check done' });
});

app.post('/api/works', (req, res) => {
    const { name } = req.body;

    console.log('what is req.body', req.body, req.params);

    if (name) {
        res.status(200).json({ message: `Hi there ${name}` });
    } else {
        res.status(422).json({ error: 'Missing (name)' });
    }
});

// Added this for playwright to start a webserver,
// but also good if request is not understood
app.get('/*', (req, res) => {
    console.log('Unknown: ', req.url);

    res.status(400).json({ message: `Unknown request, route, or params` });
});

server.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}`);
});
