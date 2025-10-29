import { Machine } from "./machine";

export class Human2 {
	solutions: { numA: number; numB: number }[] = [];
	constructor(public m: Machine) {}
	isAtPrize() {
		return this.m.current.x === this.m.prize.x && this.m.current.y === this.m.prize.y;
	}
	pressAs() {
		let i = 0;
		while (i * this.m.a.x < this.m.prize.x) {
			const dividesX = this.m.dividesRemaining("x");
			const dividesY = this.m.dividesRemaining("y");
			if (dividesX.dividesA && dividesY.dividesA) {
				// pressing A all the way will get us to a solution!
				const numRemainingPressesX = this.m.getRemaining().x / this.m.a.x;
				const numRemainingPressesY = this.m.getRemaining().y / this.m.a.y;
				const matchingDivisibility = numRemainingPressesX == numRemainingPressesY;
				const totalAPresses = this.m.numPressedA + numRemainingPressesX;

				if (matchingDivisibility) {
					console.log(`Found a solution!`, {
						numA: totalAPresses,
						numB: this.m.numPressedB,
					});
					this.solutions.push({ numA: totalAPresses, numB: this.m.numPressedB });
				}
			}
			// so just pushing A won't work. So we need to introduce button B
			// loop through all the B press options
			// console.log(`Remaining: ${JSON.stringify(this.m.getRemaining())}`);
			const bDividesX = this.m.dividesRemaining("x");
			const bDividesY = this.m.dividesRemaining("y");
			if (bDividesX.dividesB && bDividesY.dividesB) {
				const numRemainingPressesX = this.m.getRemaining().x / this.m.b.x;
				const numRemainingPressesY = this.m.getRemaining().y / this.m.b.y;
				const sameDivisibility = numRemainingPressesX == numRemainingPressesY;
				const totalBPresses = this.m.numPressedB + numRemainingPressesX;
				console.log(`Found a solution!`, { numA: this.m.numPressedA, numB: totalBPresses });
				if (sameDivisibility) {
					this.solutions.push({ numA: this.m.numPressedA, numB: totalBPresses });
				}
			}

			const newVal = this.m.pressA();
			if (newVal.x > this.m.prize.x || newVal.y > this.m.prize.y) {
				console.log(`x and y too big`);
				break;
			}
			i++;
		}
	}
	bestSolution() {
		return this.solutions.sort((a, b) => {
			return 3 * a.numA + a.numB - (3 * b.numA + b.numB);
		})[0];
	}
	cost() {
		const soln = this.bestSolution() ?? { numA: 0, numB: 0 };
		return soln.numA * 3 + soln.numB;
	}
}
