import { ConfigEnv, defineConfig } from 'vitest/config';

import react from '@vitejs/plugin-react';

import path from 'path';
import os from 'os'
import dns from 'dns'

import { loadEnv } from 'vite';

async function getIp() {
    const hostname = os.hostname()
    const {promise, resolve, reject} = Promise.withResolvers()
    const options = {
        family: 4
    }

    dns.lookup(hostname, options, (err, addr) => {
        if (err) {
            reject("can't find hostname")
        } else {
            resolve(addr)
        }
    });

    return promise
}


// https://vitejs.dev/config/
export default defineConfig(async ({ command, mode }: ConfigEnv) => {
    console.log('Current mode: ', command);

    const cwd = process.cwd();
    const env = { ...loadEnv(mode, cwd, 'VITE_') };
    
    const networkIp = await getIp()

    console.log('network ip', networkIp)
    console.log('local env vars', JSON.stringify(env, null, 2));

    return {
        plugins: [react()],
        server: {
            host: true,
            port: parseInt(env.VITE_DEV_APP_PORT),
            strictPort: true,
        },
        define: {
            __SERVER__: JSON.stringify(`http://localhost:${env.VITE_DEV_SERVER_PORT}`),
            __NETWORK__: JSON.stringify(`http://${networkIp}:${env.VITE_DEV_SERVER_PORT}`),
            __PORT__: JSON.stringify(env.VITE_DEV_SERVER_PORT)
        },
        test: {
            globals: true,
            environment: 'jsdom',
            setupFiles: './src/tests/setup.ts',
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
                '@server': path.resolve(__dirname, './server'),
                '@tests': path.resolve(__dirname, './src/tests'),
                '@app': path.resolve(__dirname, './src/app'),
                '@components': path.resolve(__dirname, './src/components'),
                '@features': path.resolve(__dirname, './src/features'),
                '@utilities': path.resolve(__dirname, './src/utilities'),
            },
        },
    };
});
