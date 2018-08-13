#!/bin/sh

// initializes a node project or "npm init -y" to accept all defaults 
npm init

// a web server analogous to apache
npm install express --save

// a test framework module
npm install mocha --save

// an assertion library that is often used with Mocha.
npm install chai --save

// a simplified HTTP client
npm install request --save

// utilities for working with directory and file paths, making it easy to serve up files for Express server.
npm install path --save

// dev dependeciy helper tool to work with a browser
npm install open --save-dev

// Babel is a transpiler that can convert ES6 code to standard Javascript (ES5) which all browsers can understand
// Babel is only needed for dev as dependencies
npm install babel-cli  --save-dev
npm install babel-core --save-dev
npm install babel-preset-env --save-dev
npm install babel-loader --save-dev

// Webpack is a module bundler that gathers up all the modules with dependencies and creates static assets to represent those modules.
npm install webpack webpack-dev-middleware --save-dev

// add the reactjs components
npm install react react-dom --save
npm install babel-preset-react-hmre babel-preset-react --save-dev