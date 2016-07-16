(function() {
	let result = [];
	let i = 0;
	let totalIterations = 50;
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
	 * Callbacks bencmark
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
			container: 'generators'
		},
		{
			self: promisesBenchmark,
			container: 'promises'
		},
		{
			self: callbacksBenchmark,
			container: 'callbacks'
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
			let block = document.getElementById(iterables[0].container);
			block.querySelector('.min').innerHTML = Math.round(Math.min(...result) * 10000) / 10000;
			block.querySelector('.max').innerHTML = Math.round(Math.max(...result) * 10000) / 10000;

			let sum = result.reduce((a, b) => {
				return a + b;
			});

			// Draw results
			document.getElementById(iterables[0].container).querySelector('.result').innerHTML = Math.round(sum/totalIterations * 10000) / 10000;
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

		interval = setInterval(processBenchmark, asyncMockTime + 5);
	}

	init();
})();