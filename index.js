'use strict';

var promiseLoop = function(resolvePromise, rejectPromise) {
	rejectPromise = rejectPromise || promiseLoop.defaultRejectPromise;

	return function internalPromiseLoop(value) {
		return resolvePromise(value)
			.then(function(nextValue) {
				return internalPromiseLoop(nextValue);
			}, function(endValue) {
				return rejectPromise(endValue);
			});
	}
};

promiseLoop.defaultRejectPromise = function(value) {
	return value;
};

promiseLoop.catchRejectPromise = function(isSomethingWrong) {
	return new Promise(function(resolve, reject) {
		if (isSomethingWrong) {
			reject(isSomethingWrong);
		} else {
			resolve(isSomethingWrong);
		}
	});
}

module.exports = promiseLoop;
