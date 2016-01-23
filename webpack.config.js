var config = {
  //input 
  entry: "./index.js",
  //output
  output: {
    //where to put it
    path: "./",
    //what to name it.
    filename: "bundle.js"
  }
};
module.exports = config;

//$ webpack-dev-server
//and go to http://localhost:8080/webpack-dev-server/