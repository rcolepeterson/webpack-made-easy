
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

Part 3 - Dev env. 
Let's add a folder for coding and a folder to put our built files and assets. 
It will feel like more a real dev enviorenment. So far everything has been done in the root directory.

Add a app folder.  