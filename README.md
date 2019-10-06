[![Netlify Status](https://api.netlify.com/api/v1/badges/1ae14e3f-1935-45c2-9625-ce11a25dfb0b/deploy-status)](https://app.netlify.com/sites/multi-commenter/deploys)

* * *

# multi-commenter

WIP

## Quick Start

```sh
cp -f .env .env.local
npm i
PORT=80 npm start
```

### Note

- The reason for using `PORT 80` is for Twitter OAuth in development.
  - Any port number is not allowed in Twitter OAuth callback url.

## Available DevTools

- [Redux DevTools - Chrome Web Store](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open <http://localhost:3000> to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run lint`

Run ESLint with autofix & Type check.<br>
If you want to NO autofix (= Dry run):

```sh
npm run lint-dry
```

### `npm run typesync`

Install missing TypeScript typings for dependencies.

If you want to install together, you can run:

```sh
npm i ${PACKAGE_NAME} && npm run typesync && npm i
```

### `GENERATE_SOURCEMAP=true npm run analyze`

Analyzing the bundle size.<br>
Output to `misc/source-map-explorer.html`.

### `npm run eslint-print-config`

Outputs the configuration to be used for the file passed.<br>
See [`ESLint --print-config`](https://eslint.org/docs/user-guide/command-line-interface#--print-config)

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
