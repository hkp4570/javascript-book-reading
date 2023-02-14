const plays = {
	hamlet: { name: 'Hamlet', type: 'tragedy' },
	'as-like': { name: 'As You Like It', type: 'comedy' },
	othello: { name: 'Othello', type: 'tragedy' },
};

const invoice = {
	customer: 'BigCo',
	performances: [
		{
			playID: 'hamlet',
			audience: 55,
		},
		{
			playID: 'as-like',
			audience: 35,
		},
		{
			playID: 'othello',
			audience: 40,
		},
	],
};

function playFor(aPerformance) {
	return plays[aPerformance.playID];
}

function amountFor(perf) {
	let thisAmount = 0;
	switch (playFor(perf).type) {
		case 'tragedy':
			thisAmount = 40000;
			if (perf.audience > 30) {
				thisAmount += 1000 * (perf.audience - 30);
			}
			break;
		case 'comedy':
			thisAmount = 30000;
			if (perf.audience > 20) {
				thisAmount += 10000 + 500 * (perf.audience - 20);
			}
			thisAmount += 300 * perf.audience;
			break;
		default:
			throw new Error(`unknown type: ${play.type}`);
	}
	return thisAmount;
}

function volumeCreditsFor(perf) {
	let volumeCredits = 0;
	volumeCredits += Math.max(perf.audience - 30, 0);
	if ('comedy' === playFor(perf).type)
		volumeCredits += Math.floor(perf.audience / 5);
	return volumeCredits;
}

function format(aNumber) {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 2,
	}).format(aNumber);
}

function totalVolumeCredits() {
	let volumeCredits = 0;
	for (let perf of invoice.performances) {
		volumeCredits += volumeCreditsFor(perf);
	}
	return volumeCredits;
}

function statement(invoice) {
	let totalAmount = 0;
	let result = `Statement for ${invoice.customer}\n`;
	for (let perf of invoice.performances) {
		let thisAmount = amountFor(perf);
		// print line for this order
		result += ` ${playFor(perf).name}: ${format(thisAmount / 100)} (${
			perf.audience
		} seats)\n`;
		totalAmount += thisAmount;
	}
	result += `Amount owed is ${format(totalAmount / 100)}\n`;
	result += `You earned ${totalVolumeCredits()} credits\n`;
	return result;
}
console.log(statement(invoice));
