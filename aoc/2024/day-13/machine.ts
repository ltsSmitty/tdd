export type Button = { x: number; y: number };

const sumButtons = (b1: Button, b2: Button): Button => {
	return { x: b1.x + b2.x, y: b1.y + b2.y };
};

const subtractButtons = (b1: Button, b2: Button): Button => {
	return { x: b1.x - b2.x, y: b1.y - b2.y };
};

export class Machine {
	current: Button = { x: 0, y: 0 };
	numPressedA = 0;
	numPressedB = 0;
	constructor(public a: Button, public b: Button, public prize: Button) {}

	pressA() {
		this.current = sumButtons(this.current, this.a);
		this.numPressedA++;
		return this.current;
	}
	pressB() {
		this.current = sumButtons(this.current, this.b);
		this.numPressedB++;
		return this.current;
	}
	getRemaining(): Button {
		return subtractButtons(this.prize, this.current);
	}
	reset() {
		this.current = { x: 0, y: 0 };
	}
	dividesRemaining(coord: "x" | "y") {
		const remaining = this.getRemaining();
		const remainingTimesA = remaining[coord] / this.a[coord];
		const dividesA = remaining[coord] % this.a[coord] === 0;
		const remainingTimesB = remaining[coord] / this.b[coord];
		const dividesB = remaining[coord] % this.b[coord] === 0;
		return { dividesA, dividesB, remainingTimesA, remainingTimesB };
	}
}
