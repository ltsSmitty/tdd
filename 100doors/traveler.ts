export class Traveler {
	getDoorsToVisit(mod: number, length: number) {
		const count = this.count(mod, length);
		let visitedNumbers: number[] = [];
		for (let i = 1; i <= count; i += 1) {
			if (i * mod <= length) {
				visitedNumbers.push(i * mod);
			} else {
				break;
			}
		}
		return visitedNumbers;
	}

	count(mod: number, length: number) {
		return Math.floor(length / mod);
	}
}
