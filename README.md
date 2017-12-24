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
Follows the [Airbnb JavaScript coding standard](https://github.com/airbnb/javascript/). Additionally, smaller functions with lower cyclomatic complexities are used, aiming to make code less buggy and easier to wrap the head around.

Code can be linted using ESLint with:

    yarn lint

    # auto-fix small issues such as missing semi-colons
    yarn lint-fix

### Functional approach
A functional approach is followed and pure functions without side-effects are used where possible, instead of objects and manipulating states. This makes the code easily comprehensible and testable as smaller units.

### Tests
Only back-end has tests now. Back-end tests cab be run with:

    yarn test

### Browser compatibility
**Conclusion:** Should work in all modern browsers, and IE from version 10 upwards (see *DOM* below).

- **CSS** - The CSS styles used supports 92% of the global browser share, as checked with [browserl.ist](http://browserl.ist/?q=last%204%20version). This includes IE browsers from IE 8 upwards.
- **JavaScript** - Babel is used to transpile all front-end JS (ES6+) to ES5, so it ideally should support all browsers that support ES5.
- **DOM** - document.querySelector and and Element.classList are used. While [document.querySelector](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector#Browser_Compatibility) is supported from IE 8 onwards, [Element.classList](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList#Browser_compatibility) is supported only from IE 10.

I've tested this in the latest version of Chrome and Firefox. (Haven't checked in IE since I own a Linux machine).
