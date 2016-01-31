"use strict";

console.log("we are working!");

var myModule = require('./myModule');
console.log('myModule', myModule);

require('./style.css');

let arr = [1, 2, 3].map(n => n * 2);
console.log('arr', arr);
let cool = "you";


//simulate a user gesture after seconds.
setTimeout(function () {
	require(['./anotherModule'], function (anotherModule) {
		console.log('anotherModule', anotherModule);
	});
}, 3000)
