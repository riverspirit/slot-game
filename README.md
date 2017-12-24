Slot Game
=========
## Dependencies
- Node.js v8.9 LTS or above
- Yarn

## Run
    yarn
    yarn start

## Build
Uses Webpack to bundle the scripts. To build the bundle, do:

    yarn webpack

PS: I haven't added a build step that creates a separate distributable version of the app (which is usually put in a `dist` folder).

## Development

### Vanilla JS
Uses vanilla JS in the front-end and back-end

### Coding standard
Follows the [Airbnb JavaScript coding standard](https://github.com/airbnb/javascript/). Additionally, smaller functons with lower cyclomatic complexities are used, aiming to make code less buggy and easier to wrap the head around.

Code can be linted using ESLint with:

    yarn lint

    # auto-fix small issues such as missing semi-colons
    yarn lint-fix

### Functional approach
A functional approach is followed and pure functions without side-effects are used where possible, instead of objects and manipulating states. This makes the code easily comphrehensible and testable as smaller units.

### Tests
Only back-end has tests now. Back-end tests cab be run with:

    yarn test