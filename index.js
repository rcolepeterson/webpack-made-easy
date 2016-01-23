"use strict";

console.log("we are working!");

var myModule = require('./myModule');
console.log('myModule', myModule);

//simulate a user gesture after seconds.
setTimeout(function () {
	require(['./anotherModule'], function (anotherModule) {
		console.log('anotherModule', anotherModule);
	});
}, 3000)