0. $ npm install webpack -g
1. $ mkdir webpack-tut
2. $ cd webpack-tut
3. Create a index.js file and a index.html file in your root directory.
3. Add <script src="bundle.js"></script> to index.js (bundle.js will be generated later).
4. Add console.log("hello") in the index.js
4. $ webpack index.js bundle.js
5. You should now see a bundle.js file in your root directory.  
5. Open your index.html in a browser and you should see a console statmemt printed out in your browerser console panel.
6. Congratulations you have create a webpack application!