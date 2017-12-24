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

PS: I haven't added a build step that creates a distributable version of the app and puts it in a folder.

## Development

### Vanilla JS
Uses vanilla JS in the front-end and back-end

### Coding standard
Follows the Airbnb coding standards, with minor changes. Additionally, smaller functons with lower cyclomatic complexities are used, aiming to make code less buggy and easier to wrap the head around.

Code can be linted using ESLint with:

    yarn lint

    # auto-fix small issues such as missing semi-colons
    yarn lint-fix

### Functional
A functional approach is followed and pure functions without side-effects are used where possible, instead of objects manipulating states. This makes the code easily comphrehensible and testable independently.

### Tests
Only back-end has tests now.