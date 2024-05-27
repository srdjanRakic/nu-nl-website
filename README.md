# News Website

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14.x or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

```sh
npm install
# or
yarn install
```

### Running the Project

To start the development server with hot module replacement (HMR):

```sh
npm run dev
# or
yarn dev
```

### Building for Production

To build the project for production:

```sh
npm run build
# or
yarn build
```

### Previewing the Production Build

To preview the production build locally:

```sh
npm run preview
# or
yarn preview
```

### Linting the Code

To lint the code using ESLint:

```sh
npm run lint
# or
yarn lint
```

### Formatting the Code

To format the code using Prettier:

```sh
npm run format
# or
yarn format
```

### Running Tests

To run tests using Vitest:

```sh
npm run test
# or
yarn test
```

## Project Structure

The basic structure of your project should look like this:

```
your-repo-name/
├── node_modules/
├── public/
│   └── index.html
├── src/
│   ├── assets/
│   ├── components/
│   ├── hooks/
│   ├── styles/
│   ├── App.tsx
│   ├── main.tsx
│   └── vite-env.d.ts
├── .eslintrc.js
├── .prettierrc
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## Available Scripts

Here are the available scripts in the `package.json`:

```json
"scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "test": "vitest",
    "preview": "vite preview",
    "format": "prettier --write ./src"
}
```

- `start`: Starts the development server with Vite.
- `build`: Builds the project for production using TypeScript and Vite.
- `lint`: Lints the project files using ESLint.
- `test`: Runs the tests using Vitest.
- `preview`: Previews the production build locally.
- `format`: Formats the code using Prettier.

## Additional Resources

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://reactjs.org/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [ESLint Documentation](https://eslint.org/)
- [Prettier Documentation](https://prettier.io/)
