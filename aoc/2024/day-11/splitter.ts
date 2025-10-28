type Stone = {
	value: number;
	lapRemoved?: number;
};

export const stone = (n: number | string | Stone): Stone => {
	if (n instanceof Object && "value" in n) {
		return n;
	}
	return { value: Number(n) };
};

export class Splitter {
	categorize(n: Stone, lap: number = 1): Stone[] {
		if (n.lapRemoved != undefined) {
			return [n];
		}
		if (n.value === 0) return [{ value: 1 }];
		if (n.value === 1) {
			return [{ value: 1, lapRemoved: lap - 1 }];
		}
		const nString = `${n.value}`;
		if (nString.length % 2 === 0) {
			const midpoint = nString.length / 2;
			const part1 = nString.slice(0, midpoint);
			const part2 = nString.slice(midpoint);
			return [stone(part1), stone(part2)];
		}
		return [stone(n.value * 2024)];
	}
	process(numbers: Stone[], initialLap = 1): Stone[] {
		const res = numbers.map((n) => this.categorize(n, initialLap)).flat();
		// console.log(res, "\n");
		return res;
	}
	processMany(initial: Stone[], iterations: number): number {
		let next = initial;
		let ones: Stone[] = [];
		for (let i = 0; i < iterations; i++) {
			console.log(`Lap ${i + 1}, length ${next?.length}`);
			next = this.process(next);
			next.map((s) => {
				if (s.value === 1 && !s.lapRemoved) {
					s.lapRemoved = i + 1;
					ones.push(s);
				}
			});
			console.log(`next length before filtering: ${next.length}`);
			next = next.filter((n) => n.lapRemoved == null);
			console.log(`next length: ${next.length}, ones length: ${ones.length}`);
		}
		return next.length;
	}
}
