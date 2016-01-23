
Part 1 - Set up a simple Webpack workflow.

0. $ npm install webpack -g
1. $ mkdir webpack-tut
2. $ cd webpack-tut
3. Create a index.js file and a index.html file in your root directory.
4. Add <script src="bundle.js"></script> to index.js (bundle.js will be generated later).
5. Add console.log("hello") in the index.js
6. $ webpack index.js bundle.js
7. You should now see a bundle.js file in your root directory.  
8. Open your index.html in a browser and you should see a console statmemt printed out in your browerser console panel.
9. Congratulations you have created a webpack application!

Part 2 - Set up the Web Pack Dev server for your app.
Webpack comes with a http server that does a bunch of stuff, including reload your page when it detects a change.
Let's enable by ...

0. Add a webpack.config.js file in your root directory that looks like the folowing ...

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
This is the main reason i wanted to checkout Webpack was to use it to load code asynchronously.
I wanted to do things like render my initial page and then load JS on demand. 
This reduces onload page file size and supports creating self-contained components, that are responsible for their own HTML, JS, styles and assets.

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
But by using webpack's module loading sytem we can now seperate our code and load peices wheneverer we want.
We can have a smalll file size on load and then fetch more stuff later.

Check out the network tab in your browser's dev tools and you can see your file load after 3 seconds.
Thta is super cool and awesome!


