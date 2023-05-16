# tsoa-type-vs-interface

## Requirements

- [Node 18.15.0+](https://nodejs.org/)

## Usage

### Run: Development mode using node/yarn

See the [package.json](package.json) scripts attribute for more details.

1. #### Initial Setup

   DO NOT USE `NPM INSTALL`, we are using yarn for this project

   Configure environment. Make sure you are using the right version of npm (18.15.0)

   ```bash
   nvm install
   nvm use
   npm i -g yarn
   yarn install
   ```

2. #### Run

   ```bash
   yarn start
   ```

### Run: Production Mode

```bash
yarn build:start
```

## Linting & Styling

We use `eslint` in combination with `prettier` to provide linting and auto formatting.
When using VsCode we recommend you install the [prettier plugin](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) and the vscode workspace settings (in `./vscode/settings`)should take care of formatting on save.

- Check linter:

  ```bash
  yarn lint
  ```

- Run auto formatter:

  ```bash
  yarn format
  ```

- Run both:

  ```bash
  yarn style
  ```
