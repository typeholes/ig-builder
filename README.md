# IG Builder (ig-builder)

ig builder

Fair Warning: this is just an experiment with an insane idea and should not be used by anybody.

This is a starter project for developing an incremental game. It runs in two modes.
1. Game mode.  Allows playing the game. this mode is triggered whenever the build is not for dev or is not electron
2. Dev mode. provides a structured editor and live preview in an electron app.

The idea is to have a structured editor for game items. Updating these items will modify the *DoNotTouchThis.ts* file.
There is a suite of components for displaying these items and UI elements to interact with them.

# Why?

The first goal is to have all calculations for the game logic be symbolic formulas. This allows us to easily do things like graph progression or calculate derivatives to show the players what the growth of an item is.

The second goal is to have game items narrowly typed. This allows us to catch more errors and provides better autocompletion.

The third goal is to catch problems in the formulas during during development, instead of at run time.

* for example, no formulas can have undefined terms or recursive definitions.
* this could be accomplished with the Typescript type system, but it would be gnarly and tank the performance of type checking.

## Install the dependencies
```bash
yarn
# or
npm install
```

### Start the app in development Game mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```

### Start the app in development Dev mode (hot-code reloading, error reporting, etc.)
```bash
./dev.sh
```

### Lint the files
```bash
yarn lint
# or
npm run lint
```


### Format the files
```bash
yarn format
# or
npm run format
```

### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-webpack/quasar-config-js).
