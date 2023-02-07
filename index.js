const start = new Date();
setTimeout(() => {
	const end = new Date();
	console.log(end - start + 'ms');
}, 500);
while (new Date() - start < 1000) {}
