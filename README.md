## How to start this app locally

This chat app was developed using:

-   Node LTS `v20.18.0 (npm v10.8.2)`
-   React `v18.3`
-   vite `v5.4.8`

1. Clone/download this github repo, open up a terminal and cd into the project root folder, and run `npm ci` to get all the dependencies.
2. In the same terminal enter `npm run dev`, which will start vite's local development server.
3. Open a second terminal, cd into the project root folder again, and enter `npm run server`, which will start a simple node/express server to demo the chat application.
4. Now open up the app at http://localhost:5174.
5. Best way to test would be to open two separate windows, log in as two separate users, and watch in real time the messaging system and notifications system.

## Technical stack:

## Assets attribution

1. free icons for profile pictures are from: [Freepik -Flation](<a href="https://www.flaticon.com/free-icons/animal" title="animal icons">Animal icons created by Freepik - Flaticon</a>)

## Everything below this line is the default README from Vite's create-vite command to quickly get started for a react + typescript + vite project.

-   [Vite getting started guide](https://vite.dev/guide/)

### React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

-   [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
-   [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

### Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

-   Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
    languageOptions: {
        // other options...
        parserOptions: {
            project: ['./tsconfig.node.json', './tsconfig.app.json'],
            tsconfigRootDir: import.meta.dirname,
        },
    },
});
```

-   Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
-   Optionally add `...tseslint.configs.stylisticTypeChecked`
-   Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react';

export default tseslint.config({
    // Set the react version
    settings: { react: { version: '18.3' } },
    plugins: {
        // Add the react plugin
        react,
    },
    rules: {
        // other rules...
        // Enable its recommended rules
        ...react.configs.recommended.rules,
        ...react.configs['jsx-runtime'].rules,
    },
});
```
