# promise-loop
Loop for asynchronous javascript

## Installation

```bash
$ npm install promise-loop
```

## Usage

```javascript
var promiseLoop = require('promise-loop');

//Create our promise to Loop
var loopingPromise = function(value) {
	return new Promise(function(resolve, reject) {
		console.log('received value:', value);

		if (value < 10) {
			setTimeout(function() {
				console.log('\tresolving');

				resolve(++value);
			}, 200);
		} else {
			console.log('\trejecting');

			reject(value < 10);
		}
	});
};

//prepare to loop
var myPromiseLoop = promiseLoop(loopingPromise);

//And now, just run it with the correct value
var promise = myPromiseLoop(0);
//received value: 0
// 	resolving
//received value: 1
//	resolving
//received value: 2
//	resolving
//received value: 3
//	resolving
//received value: 4
//	resolving
//received value: 5
//	resolving
//received value: 6
//	resolving
//received value: 7
//	resolving
//received value: 8
//	resolving
//received value: 9
//	resolving
//received value: 10
//	rejecting

//We can use it with other promises
//Create a simples Promises
var startingPromise = function(value) {
	return new Promise(function(resolve, reject) {
		console.log('Starting with value', value);

		resolve(value);
	});
};

var endingPromise = function(value) {
console.log('Ending with value', value);

return value;
};

//Run normally again
var promise = startingPromise(0).then(myPromiseLoop).then(endingPromise);
//Starting with value 0
//received value: 0
//	resolving
//...
//received value: 10
//	rejecting
//Ending with value false

//By default, in promiseLoop, we are using a rejectPromise
//that only pass the value forward, but you can handle it diferent.
//And you have a catchRejectPromise already there to help you
//changing our previous loopingPromise:
var loopingPromiseWithProblems = function(value) {
	return new Promise(function(resolve, reject) {
		console.log('received value:', value);

		if (value < 10) {
			setTimeout(function() {
				console.log('\tresolving');

				resolve(++value);
			}, 200);
		} else {
			console.log('\trejecting');

			reject(Math.random() < 0.5);
		}
	});
};

//And create a function to handle the catch
var catchPromise = function(value) {
	console.log('alert, something is wrong!');
};

//prepare again our loopingPromise
var myPromiseLoopWithProblems = promiseLoop(loopingPromiseWithProblems, promiseLoop.catchRejectPromise);

//Run it with catch
var promise = startingPromise(0).then(myPromiseLoopWithProblems).then(endingPromise).catch(catchPromise);
//And now we will have this:
//Starting with value 0
//received value: 0
//	resolving
//...
//received value: 10
//	rejecting
//Ending with value false
//
//Or this:
//Starting with value 0
//received value: 0
//	resolving
//...
//received value: 10
//	rejecting
//alert, something is wrong!
```
