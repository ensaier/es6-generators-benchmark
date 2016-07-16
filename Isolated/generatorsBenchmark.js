let result = [];
let i = 0;

let generatorsBenchmark = () => {
	let finished = 0;
	let started = window.performance.now();
	let asc = (value) => {
		setTimeout(() => {
			test.next();
		}, 100);
	}
	function* testGenerator() {
		let x = yield asc();
		let finished = window.performance.now();
		result.push(finished - started - 100);
	}

	let test = testGenerator();
	test.next();
};

let interval = setInterval(() => {
	if (i < 500) {
		i++;
		console.log(i);
		generatorsBenchmark();
	} else {
		let sum = result.reduce((a, b) => {
			return a + b;
		});
		console.log(sum/500);
		document.getElementById('result').innerHTML = sum/500;
		clearInterval(interval);
	}
}, 105);
