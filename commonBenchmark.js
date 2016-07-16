(function() {
	let result = [];
	let i = 0;
	let totalIterations = 1000;
	let asyncMockTime = 100;
	let interval;

	/**
	 * Generators bench
	 */
	let generatorsBenchmark = () => {
		let finished = 0;
		let started = window.performance.now();
		let asc = (value) => {
			setTimeout(() => {
				test.next();
			}, asyncMockTime);
		}
		function* testGenerator() {
			let x = yield asc();
			let finished = window.performance.now();
			result.push(finished - started - asyncMockTime);
		}

		let test = testGenerator();
		test.next();
	};


	/**
	 * Promises benchmark
	 */
	let promisesBenchmark = () => {
		let finished = 0;
		let started = window.performance.now();
		let request = new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve('test response');
			}, asyncMockTime);
		});
		request.then(() => {
			finished = window.performance.now();
			result.push(finished - started - asyncMockTime);
		})
	};

	/**
	 * Benchmark decorator for spent time calculations
	 * @return {[type]} [description]
	 */
	let callbacksBenchmark = () => {
		let finished = 0;
		let started = window.performance.now();
		let callback = () => {
			finished = window.performance.now();
			result.push(finished - started - asyncMockTime);
		};
		setTimeout(() => {
			callback();
		}, asyncMockTime);
	};

	/**
	 * Map of benchmark for a common test
	 */
	let iterables = [
		{
			self: generatorsBenchmark,
			container: 'generatorsResult'
		},
		{
			self: promisesBenchmark,
			container: 'promisesResult'
		},
		{
			self: callbacksBenchmark,
			container: 'callbacksResult'
		},
	]

	/**
	 * Benchmark runner
	 */
	let processBenchmark = () => {
		if (i < totalIterations) {
			// Iterate
			i++;
			iterables[0].self();
		} else {
			let sum = result.reduce((a, b) => {
				return a + b;
			});

			// Draw results
			document.getElementById(iterables[0].container).innerHTML = Math.round(sum/totalIterations * 10000) / 10000;
			if (iterables.length > 1) {
				// Remove the object and new links from memory for garbage collector.
				iterables[0].self = undefined;

				// Reset cycle
				iterables.splice(0, 1);
				result = [];
				i = 0;
				return;
			}

			// Finish benchmarking
			clearInterval(interval);
		}
	}

	/**
	 * Initial actions
	 */
	let init = () => {
		document.getElementById('totalIterations').innerHTML = totalIterations;
		document.getElementById('totalTests').innerHTML = iterables.length;
		document.getElementById('iterationTime').innerHTML = asyncMockTime + 5;
		document.getElementById('estimatedTime').innerHTML = Math.round((asyncMockTime + 5) * totalIterations * iterables.length / 60000); // Minutes are more clear than miliseconds

		setInterval(processBenchmark, asyncMockTime + 5);
	}

	init();
})();