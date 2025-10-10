import { config } from 'dotenv';
config();

import pg from 'pg';

const { Pool, Client } = pg;

const PG_PORT = process.env.DEV_DOCKER_PORT;
const PG_USER = process.env.DEV_PG_USER;
const PG_PW = process.env.DEV_PG_PW;
const PG_DB = process.env.DEV_PG_DB;

console.log('DB info', PG_DB, PG_PORT, PG_USER);

const connectInfo = {
    user: PG_USER,
    password: PG_PW,
    host: 'localhost',
    port: PG_PORT,
    database: PG_DB,
};

export async function connect() {
    let pool;
    try {
        pool = new Pool({
            ...connectInfo,
        });
    } catch (e) {
        console.log('pool does not conenct');
    }

    let poolRes;
    try {
        poolRes = await pool.query('SELECT NOW()');
        console.log('PG pool select now: ', poolRes);
    } catch (e) {
        console.log('PG pool err query', e);
    }

    const client = new Client({
        ...connectInfo,
    });

    await client.connect();

    const clientRes = await client.query('SELECT NOW()');

    console.log('PG client select now', clientRes);

    await client.end();

    return [poolRes, clientRes];
}
