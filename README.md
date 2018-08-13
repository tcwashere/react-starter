# Creating an Express.js Environment with Webpack, React, and Babel Configurations  

**For The Impatient**
*   clone repo
*   npm install
*   npm start

**Overview**

*   Introduction
*   Prerequisites
*   Setting up Express
*   Adding Babel to the mix
*   Adding Webpack configurations
*   Bringing in React

### Introduction

There are two main different ways one could set up an environment for a React project; using create-react-app (which takes care of just about everything for you), or creating your own Express.js file server with your own Webpack and Babel configurations. The former is great for when one is just beginning to learn and play with React, but there’s going to be a point where you need to make some changes to a webpack.config.js file and it’s going to seem foreign and scary. But really it isn’t and it gets easier.

The other minor issue I have with create-react-app and similar tools is that there is a lot of "black magic" going on, and I would like to know at least the basics of what’s going on under the hood.

Today I’m going to walk through creating a very basic file server using Express.js with some Webpack and Babel configurations and implement a very basic React application to get you started.

**Prerequisites**

*   Node js and npm (https://nodejs.org/en/)

*   A basic understanding of Javascript

### Setting up Express

From the terminal of your choosing make a new directory and change to that directory

mkdir react-starter-project  
cd react-starter-project  

From that directory run

npm init  

To initialize npm in this directory and you can use the defaults for all of the options that come up. This will create and populate a package.json with the default values.

Now it’s time to add some initial packages.

npm install path express –save  

This is bringing in the express and the path package.

Express works with Node.js to bring Javascript to the backend. Express is a Node.js framework that brings an additional layer of structure and function to build a full site. For this project, Express will be used for listening on a specific port and serve out an html file when requested. It will also take in the webpack configurations for module bundling. (To read more about Express at a high level read this [article](”)).

The path library is actually a direct copy of the Node path module. It simply provides the utilities for working with directory and file paths, making it easier for us to serve up files for our Express server.

Now create a new directory called buildScripts inside react-starter-project. Open up the react-starter-project directory in an IDE of your choosing. Create a server.js file inside buildScripts and add path and express to the file.

buildScripts/server.js  

var express = require('express')  

var path = require('path')  

A port number is required and express will need to be initialized.

const port = 8080;  

const app = express();  

Now we can listen on port 8080 and report if there are any errors in doing so.  

<pre>
app.listen(port, function (error) {  
    if(error) {  
        console.log(error);  
    }  
});  

</pre>


While we’re here let’s have the instantiated Express application serve a file when you visit localhost:3000/  

<pre>  

 app.get('/', function (req, res) {  
    res.sendFile(path.join(__dirname, '../src/index.html'));  
});  

</pre>

This is when the path library comes in handy. The resulting sent file will be from the directory of the current module (__dirname) and this path will be joined with the path ../src/index.html. Speaking of which, let’s create that file now.  
/src/index.html


```html
<!DOCTYPE html>
<html>
  <head>
    <title>Sample Project</title>
  </head>
  <body>
    <div id="root"></div>
    <h1>Hello World!</h1>
  </body>
</html>
```

Now we need to switch to the package.json and create a new script. This will be the start script which will start up the Express file server. You can remove your ‘test’ script if you wish. Add the following script in it’s place like so

<pre>  

  "scripts": {  
    "start": "node buildScripts/server.js"  
  },  

</pre>

The node command dictates that node.js should run the buildScripts/server.js file.  
Now you can run npm start from the terminal, and visit localhost:3000 to see a ‘Hello World’ message.  
Subsequent scripts can be added before or after the start script as long as there is a comma before the next script. The last script in the list cannot have a comma at the end.

Note: start is special script term to npm. Other custom scripts would need to be run as npm run myScript. Read more about other special scripts for npm here (https://docs.npmjs.com/misc/scripts).  
Just to make life a little easier, I like to have my applications automatically open the browser up to localhost:3000/ while testing. To do so add the open library using

npm install open --save-dev  

In server.js change the app.listen function to have the following else statement.

<pre>  

 app.listen(port, function (error) {  
    if(error) {  
        console.log(error);  
    } else {  
        open(`http://localhost:${port}`)  
    }  
});  

</pre>

If express is successfully able to listen on port 3000 the application will try to open up your default browser and navigate to http://localhost:3000  
When adding the open library we used --save-dev instead of --save and this was done because we only really want open to be used for development purposes and not to be used for production. Go [here](”) for more on --save vs --save-dev

### Adding Babel to the mix

Babel is a transpiler that can convert ES6 code to standard Javascript (ES5) which all browsers can understand. ES6 or ECMAScript2015 is an update to the Javascript language that has brought in a lot of new features. Read more about these new features here. ES6 at the time of writing is still underway of being standardized so when used it needs to be converted by a transpiler. Any modern React application should be written in ES6.

To begin adding Babel to our project we need to install a few more packages.  

<pre>  

npm install babel-cli babel-core babel-preset-es2015 --save-dev  

</pre>

These will introduce code for invoking scripts using babel, the babel core itself and the presets to use es2015 (aka ES6).

In package.json change the start script to

<pre>  

"start": "babel-node buildScripts/server.js"  

</pre>

Babel-node comes from the babel-cli package.  

Now add the following babel preset after the devDependancies  

<pre>  

  "babel": {  
    "presets": [  
      "es2015"  
    ] 
  }  

</pre>

We can test that Babel is being used by introducing some ES6 code to our code. In buildScripts/server.js change the require statements to import statements. Import being the replacement for require.

*   import express from 'express';
*   import path from 'path';
*   import open from 'open';

And in the terminal run  

<pre>  

npm start  

</pre>

and “Hello World” will show up as expected.  
Now we can move on to setting up Webpack in ES6  

### Adding Webpack configurations

First of all what is Webpack and why is it needed. Webpack is a module bundler that gathers up all the modules with dependencies and creates static assets to represent those modules. This allows for splitting up the codebase of an application up into chunks and Webpack can bundle up the libraries and modules that were required for that chunk. Those chunks can then be loaded on demand which leads to a reduction in the loading time of an application. Another feature that is important for a React application is for compiling to Javascript, so we can use JSX and ES6 to write code and Webpack + Babel will compile the code to Javascript. Read more about Babel here.

JSX is a special syntax for writing React components and the code is written as a fusion of

HTML and Javascript. Read more about JSX here

The first thing to do is add webpack to the project  

<pre>  

npm install webpack webpack-dev-middleware --save-dev  

</pre>

The webpack-dev-middleware is being used in conjunction with webpack to compile assets in-memory and sever them.

Create a new file called webpack.config.dev.js in the root directory (react-starter-project/) and add the following.

<pre>  

import webpack from 'webpack'  

import path from 'path'  

export default {  
  devtool: 'inline-source-map',  
  entry: [  
    path.resolve(__dirname, 'src/index.js')   
  ],  

  output: {  
    path: path.resolve(__dirname, 'src'),  
    publicPath: '/',  
    filename: 'bundle.js'  
  }  
}  

</pre>

The first two lines shouldn’t be anything surprising, just adding webpack and path.  
Now we’re exporting using ES6 syntax. The devtool: ‘inline-source-map’; will provide a path for a file that has an error or warning in the browser’s console. Then

<pre>  

entry: [  
    path.resolve(__dirname, 'src/index.js')   
  ],  

Is adding the point of origin for all of our application code. So any Javascript code and React components that are added here will be bundled to an output file by   

 output: {  
    path: path.resolve(__dirname, 'src'),  
    publicPath: '/',  
    filename: 'bundle.js'  
  }
  </pre>

In src/ create a file called index.js and add a simple console.log("hello from index.js (bundle.js)");

And in index.html add to bring in the file that will be bundled at run time by webpack-dev-middleware.

Last thing we need to do is add  the following code to server.js<br>

<pre>
import webpack from 'webpack';  
import config from '../webpack.config.dev';  

const compiler = webpack(config); ;  
</pre>

And ;  

<pre>  

app.use(require('webpack-dev-middleware')(compiler, {  
    noInfo: true,  
    publicPath: config.output.publicPath  
}));  

</pre>

This will use the webpack-dev-middleware to bundle the index.js file to bundle.js at the time the server starts. So when index.html is called upon bundle.js is ready to be used.  
To buildScripts/server.js.  

### Bringing in React

Finally we are ready to bring in React.  
npm install react react-dom --save  
npm install babel-preset-react-hmre babel-preset-react --save-dev  
The babel-preset-react-hmre and babel-preset-react libraries will allow us to set up the presets for using babel when React is being used.  
In package.json add the following lines under babel  

<pre>  

  "babel": {  
    "presets": [  
      "es2015",  
      "react"  
    ],  
    "env": {  
      "presets":[  
        "react-hmre"  
      ]  
    }  
  }  

</pre>

In index.js we can add React and add a simple React component to be rendered to the screen.  
import React from 'react';  
import ReactDOM from 'react-dom';  

<pre>  

class App extends React.Component {
    render(){
        return(
            <div>
                <h1>Howdy from React!</h1>
            </div>
        )
    }
}
</pre>



ReactDOM.render(<app>, document.getElementById('root'));  
Now with npm start localhost:3000 should read “Howdy from React!” above “Hello World!”  
</app>

Source: https://spinspire.com/article/creating-expressjs-environment-webpack-react-and-babel-configurations</pb>
