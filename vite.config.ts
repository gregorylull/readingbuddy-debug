import { ConfigEnv, defineConfig } from 'vitest/config';

import react from '@vitejs/plugin-react';

import path from 'path';
import { loadEnv } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }: ConfigEnv) => {
    console.log('Current mode: ', command);

    const cwd = process.cwd();
    const env = { ...loadEnv(mode, cwd, 'VITE_') };

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
