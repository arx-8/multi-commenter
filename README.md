[![Netlify Status](https://api.netlify.com/api/v1/badges/1ae14e3f-1935-45c2-9625-ce11a25dfb0b/deploy-status)](https://app.netlify.com/sites/multi-commenter/deploys)

* * *

# re-ducks example

I think `re-ducks` is the best design of React state management.<br>
This project is an example of the history leading to `re-ducks`.<br>
(Not completely the same as the official `re-ducks`. I arranged that a little.)

For comparison, Implement several patterns.<br>
These are history of React state management design in 2019.

## Stack

| Live demo                                                                                       | State management                                         |
| ----------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| 1. [TodoApp (Old plain state)](https://re-ducks-example.netlify.com/#/todo-app-old-plain-state) | React state (class component)                            |
| 2. [TodoApp (Plain state)](https://re-ducks-example.netlify.com/#/todo-app-plain-state)         | React state (React Hooks)                                |
| 3. [TodoApp (Old design redux)](https://re-ducks-example.netlify.com/#/todo-app-old-redux)      | Redux (Directly dispatch)                                |
| 4. [TodoApp (re-ducks)](https://re-ducks-example.netlify.com/#/todo-app-re-ducks)               | Redux (re-ducks)                                         |
| 5. [TodoApp (re-ducks + async)](https://re-ducks-example.netlify.com/#/todo-app-async)          | Redux (re-ducks) + async (**_Sounds good & Recommend_**) |

### Inspired design patterns

- [ducks](https://github.com/erikras/ducks-modular-redux)
- [re-ducks](https://github.com/alexnm/re-ducks)
- [Atomic Design](https://patternlab.io/)
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Presentational and Container Components - Dan Abramov - Medium](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)
- [The Case For Colocating Tests in React - Connor Elsea - Medium](https://medium.com/@Connorelsea/the-case-for-colocating-tests-in-react-cef6ea7b4a1a)

### Package structure

| Package             | Overview                                                                                     |
| ------------------- | -------------------------------------------------------------------------------------------- |
| \_\_tests\_\_/      | Shared code for UnitTest. Place product's UnitTest code as `Colocating Tests`.               |
| assets/             | logo, svg etc.                                                                               |
| components/         | React Components based on `Atomic Design`. And `Presentation-Layer` of `Clean Architecture`. |
| components/helpers/ | No `Atomic Design`, But React Component. (e.g. Routing component)                            |
| components/styles/  | Shared styles.                                                                               |
| constants/          | Constants. (e.g. App settings, Messages)                                                     |
| data/               | `Data-layer` of `Clean Architecture`.                                                        |
| domain/             | `Domain-layer` of `Clean Architecture`.                                                      |
| store/              | Redux state.                                                                                 |
| types/              | Project specific types.                                                                      |
| utils/              | General utils.                                                                               |
| index.tsx           | Entry point.                                                                                 |
| react-app-env.d.ts  | Create-react-app auto generated file.                                                        |
| serviceWorker.ts    | Create-react-app auto generated file for PWA.                                                |

## Quick Start

```sh
npm i
npm start
```

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
