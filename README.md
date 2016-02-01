# Webpack and you!

I have been playing around with [Webpack](https://webpack.github.io/) and have found it to be bad ass and super awesome. The following are some notes and some simple code that I thought others might find useful when getting started.

**What is web pack?**

Webpack is a module loader that you use to build out applications. Single page or multipage.

Webpack can work within Gulp or Grunt or replace them.

Webpack takes your code, and it's dependencies, and converts them into static assets / modules which you can then load using require. (Webpack supports AMD and CommonJS).

You can use Webpack to split up your code so that you can do things like lazy load modules on demand.

You can use Webpack to enable your code to require JS, CSS, HTML and images.

Webpack can do 10,000 more things and gets us on the path to discreet, modularized, component based development.


### Part 1 - Set up a simple Webpack workflow.
```
$ npm install webpack -g
$ mkdir webpack-tut
$ cd webpack-tut
```
1. Create an index.js file and an index.html file in your root directory.
2. Add the following to your index.html file. (bundle.js will be generated later).

```
<script src="bundle.js"></script>
```

3. Add console.log("hello") in the index.js file.
4. Create the bundle.js file by running with the following command ...

```
$ webpack index.js bundle.js
```

You should now see a bundle.js file in your root directory and if you open your index.html in a browser and you should see a console statement printed out in your browser's console window.

Congratulations, you have created a Webpack application!

### Part 2 - Set up the Web Pack Dev server for your app.
Webpack comes with a http server that does a bunch of stuff, including reload your page when it detects a change.
Let's enable by ...

1. Add a webpack.config.js file in your root directory that looks like the following ...

```javascript
var config = {
  //input
  entry: "./index.js",
  output: {
    //where to put it
    path: "./",
    //what to name it.
    filename: "bundle.js"
  }
};
module.exports = config;
```

2. Run the server ...
```javascript
$ webpack-dev-server
```
3. Goto http://localhost:8080/webpack-dev-server/
4. You should see a console statememt printed out in your browser's console panel.
5. Congratulations you have server running a webpack application! Make some changes and you see them reflected in the browser.

### Part 3 - Modules.
Lets require a module.

1. Create a file called MyModule.js.
2. Add some code. How about  ....
```javascript
module.exports = "This a module.";
```
3. In index.js, lets load it by adding the following ...
```javascript
var myModule = require('./MyModule');
console.log('myModule', myModule);
```

4. run ...
```javascript
$ webpack-dev-server
```
and go to http://localhost:8080/webpack-dev-server/

You should see "This a module." printed out in your browser's console panel. Congratulations you imported a Module. Bad ass!

### Part 3.5 Async code loading.
This is the main reason I wanted to checkout Webpack. I wanted load code asynchronously and on demand.

I wanted to do things like render my initial page and then load certain JS only when needed.
This reduces 'on load' file size and supports creating self-contained components, that are responsible for their own HTML, JS, styles and assets.

1. Add this code to index.js to mimic a user requesting a resource after the site has loaded.

```javascript
setTimeout(function () {
	require(['./anotherModule'], function (anotherModule) {
		console.log('anotherModule', anotherModule);
	});
}, 3000)
```

Note the brackets around file we are requiring. This tells web pack to not include this code in our initial bundle.js output file.

We then supply a call back so we can target the code after it loads.

Create a module to load.

1. Create a file called anotherModule.js and add
```javascript
module.exports = "I am testing";
```
2. run ...
```javascript
$ webpack-dev-server
```
and go to http://localhost:8080/webpack-dev-server/

3. You should see "I am testing." printed out in your browser's console panel after 3 seconds.
4. Congrats. You are loading JS on demand.


In the olden times all the JS would be included via a script tags in the HTML.
But, by using Webpack's module loading system we can now separate our code and load pieces whenever we want.

We can have a small file size on load and then fetch more stuff later.

Check out the network tab in your browser's dev tools and you can see your 2nd file load after 3 seconds. That is super cool and awesome!

### Part 4 - Loaders.

Webpack handles tasks via loaders. Stuff like pulling in templates, manipulating images etc., can all be done via loaders. Once the loaders are in place you can require their functionality in your own modules.

For an example let's add some loaders to get and apply CSS and then we will require our CSS in one our JS files.
1. Install the two loaders:
```javascript
$ npm install css-loader style-loader --save-dev.
```
2. Modify your webpack.config.js and add a module > loading section. (Note: You can add this functionality in your each of your modules, in the require call, every time you want it, but that gets old. Let's do it once globally in the config.)
```javascript
var config = {
  //input
  entry: "./index.js",
  output: {
    //where to put it
    path: "./",
    //what to name it.
    filename: "bundle.js"
  },
  module: {
    loaders: [{
      // do this only for .css files
      test: /\.css$/,
      // Run both style and css loaders. One gets the style the other applies it.
      loader: 'style!css'
    }]
  }
};
module.exports = config;
```

3. Add some text to your index.html file.
```
<h1>I am cool</h1>.
```
Create a CSS file in the root and add a style.
```
body{color:red;}
```
4. Require it in index.js
```javascript
require('./style.css');
```
5. run ...
```javascript
$ webpack-dev-server
```
and go to http://localhost:8080/webpack-dev-server/

and if it worked, the text on your webpage should be red. Inspect your web page and you will see a style tag has been inserted into the <head> tag. There are other ways of treating the CSS, but that is outside the scope of this tutorial. :)

Cool. So you can now start thinking about creating modules / components that provide their own HTML, JS and CSS and can be easily shared amongst different projects.

Also ... there are zillion [Webpack loaders](https://webpack.github.io/docs/list-of-loaders.html) to checkout.

### Part 5 - Coding using es2015.
Lets add a JS compiler called Babel ... via the Babel Webpack loader so that we can code using es2015 in our modules. Babel takes your es2015 code and converts it to es5 so browsers can run it.

1. Install the code via npm.

```javascript
$ npm install babel-loader babel-core babel-preset-es2015 --save-dev
```
(the above grabs the Babel loader and all the dependencies needed for Webpack and what we are doing.)
2. Modify your webpack.config.js adding the Babel loader.
```javascript
var config = {
  //input
  entry: "./index.js",
  output: {
    //where to put it
    path: "./",
    //what to name it.
    filename: "bundle.js"
  },
  module: {
    loaders: [{
      // do this for .css files
      test: /\.css$/,
      // Run both style and css loaders. One gets the style the other applies it.
      loader: 'style!css'
    },
    {
      //do this for all the JS files.
      test: /\.js$/,
      loader: 'babel',
      query: {
        presets: ['es2015']
      },
      //don't apply to all the node modules.
      exclude: ['/node_modules/']
    }]
  }
};
module.exports = config;
```

3. Write some es6 code in your JS.
```javascript
let arr = [1, 2, 3].map(n => n * 2);
console.log('arr', arr);
let cool = "you";
$ webpack-dev-server
```

and go to http://localhost:8080/webpack-dev-server/

Check the console to see the output. No errors means you are writing some dope es6 code.

### Conclusion
Webpack is bad ass and super cool. The above are just some simple examples of what you can do. I was sold when I figured how easy it was to load code on demand at run time. Using require really changes the way you think about coding.

Next steps might be setting up a real dev environment (get everything off the root, create a deploy folder to stick optimized code in, add a loader to optimize images, etc).

I have stuck the above code in a repo [here.](https://github.com/rcolepeterson/webpack-made-easy)

Here are some links to get to the next level.

http://webpack.github.io/

https://github.com/petehunt/webpack-howto

https://christianalfoni.github.io/react-webpack-cookbook/Loading-CSS.html


cole.peterson@possible.com
