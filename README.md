
Part 1 - Set up a simple Webpack workflow.

0. $ npm install webpack -g
1. $ mkdir webpack-tut
2. $ cd webpack-tut
3. Create a index.js file and a index.html file in your root directory.
4. Add <script src="bundle.js"></script> to index.js (bundle.js will be generated later).
5. Add console.log("hello") in the index.js
6. $ webpack index.js bundle.js
7. You should now see a bundle.js file in your root directory.  
8. Open your index.html in a browser and you should see a console statement printed out in your browser's console window.
9. Congratulations you have created a webpack application!

Part 2 - Set up the Web Pack Dev server for your app.
Webpack comes with a http server that does a bunch of stuff, including reload your page when it detects a change.
Let's enable by ...

0. Add a webpack.config.js file in your root directory that looks like the following ...

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

1. $ webpack-dev-server
2. goto http://localhost:8080/webpack-dev-server/
3. You should see a console statmemt printed out in your browser's console panel.
4. Congratulations you have server running a webpack application!

Part 3 - Modules.
Lets require a module.

1. Create a file called MyModule.js.
2. add some code. How about  ....

module.exports = "This a module.";

3. In index.js, add the following ...
var myModule = require('./MyModule');
console.log('myModule', myModule);

4. $ webpack-dev-server.
5. You should see "This a module." printed out in your browser's console panel.
6. Congratulations you imported a module. Bad ass!

Part 3.5 Async code loading.
This is the main reason I wanted to checkout Webpack was to use it to load code asynchronously.
I wanted to do things like render my initial page and then load JS on demand.
This reduces on load page file size and supports creating self-contained components, that are responsible for their own HTML, JS, styles and assets.

0. add this code to index.js to mimic a user requesting a resource after the site has loaded.

setTimeout(function () {
	require(['./anotherModule'], function (anotherModule) {
		console.log('anotherModule', anotherModule);
	});
}, 3000)

Note the brackets around file we are requiring. This tells web pack to not include this code our output file.
We then supply a call back to we can target the code we just loaded.

1. Create a file called anotherModule.js and add module.exports = "I am testing";
2. $ webpack-dev-server.
3. You should see "I am testing." printed out in your browser's console panel after 3 seconds.
4. congrats. You are loading JS on demand.


In the olden times the JS would be included via a script tag in the html.
But by using Webpack's module loading system we can now separate our code and load pieces whenever we want.
We can have a small file size on load and then fetch more stuff later.

Check out the network tab in your browser's dev tools and you can see your file load after 3 seconds.
That is super cool and awesome!

Part 4 - Loaders. Webpack handles tasks via loaders. Stuff like pulling in templates, manipulating images etc., can all be done via loaders. Once the loaders are in place you can require their functionality in your own modules.

For an example let's add some loaders to get and apply CSS and then we will require our CSS in one our JS files.
1. Install the two loaders: $ npm install css-loader style-loader --save-dev.

2. Modify your webpack.config.js and add a module > loading section. (Note: you can add this functionality in your each of your modules every time you want it, but that gets old. Let's do it once globally in the config.)

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

3. Add some text to your index.html file.
<h1>I am cool</h1>.

Create a CSS file in the root and add a style.
body{color:red;}

4. Require it in index.js
require('./style.css');

and if it worked, the text on your webpage should be red. Inspect your web page and you will see a style tag has been inserted into the <head> tag. There are other ways of treating the CSS, but that is outside the scope of this tutorial. :)

Cool. So you can now start thinking about creating modules that provide there own HTML, JS and CSS all through requiring modules.

Also ... there are zillion Webpack loaders to checkout.

Part 5 - Coding using es2015.
Lets add a JS compiler Babel ... via the Babel Webpack loader so that we can code using es2015.

1. $ npm install babel-loader babel-core babel-preset-es2015 --save-dev
(the above loads the babel loader all the dependencies needed for Webpack )
2. Modify your webpack.config.js adding the babel loader.

3. Write some es6 code and be happy!
[1, 2, 3].map(n => n * 2);
let cool = "you";

Conclusion: Webpack is bad ass and super cool. The above are just simple examples of what you can do. I was sold when I figured how easy it was to load code at run time.

Next steps might be setting up a real dev environment (get everything off the root, create a deploy folder to stick optimized code, etc).

Here are some links.
http://webpack.github.io/
https://github.com/petehunt/webpack-howto
https://christianalfoni.github.io/react-webpack-cookbook/Loading-CSS.html
