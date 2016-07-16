let result = [];
let i = 0;


let promisesBenchmark = () => {
	let finished = 0;
	let started = window.performance.now();
	let request = new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve('test response');
		}, 100);
	});
	request.then(() => {
		finished = window.performance.now();
		result.push(finished - started - 100);
	})
};

let interval = setInterval(() => {
	if (i < 500) {
		i++;
		console.log(i);
		promisesBenchmark();
	} else {
		let sum = result.reduce((a, b) => {
			return a + b;
		});
		console.log(sum/500);
		document.getElementById('result').innerHTML = sum/500;
		clearInterval(interval);
	}
}, 105);
