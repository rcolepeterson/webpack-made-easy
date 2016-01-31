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

//$ webpack-dev-server
//and go to http://localhost:8080/webpack-dev-server/
