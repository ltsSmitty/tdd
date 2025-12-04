import { FileReader } from "../../infra/fileReader";

export class Dial {
	constructor(private value = 50) {}
	previous = 50;
	move(d: Direction) {
		if (d.d === "L") {
			this.left(d.amount);
		} else {
			this.right(d.amount);
		}
	}
	left(n: number) {
		this.previous = this.value;
		this.value += n;
	}
	right(n: number) {
		this.previous = this.value;
		this.value -= n;
	}
	get values() {
		return {
			absolute: this.value,
			mod100: this.value % 100,
		};
	}
}

export class ZeroDialReader {
	atZero(dial: Dial) {
		return dial.values.mod100 === 0;
	}
	passedZero(dial: Dial) {
		// console.log(`previous`, dial.previous, `values`, dial.values);
		const prevFloor = Math.floor(dial.previous / 100);
		const nowFloor = Math.floor(dial.values.absolute / 100);
		// console.log({ prevFloor, nowFloor });
		const passed = prevFloor != nowFloor;
		const numPassed = Math.abs(prevFloor - nowFloor);
		// console.log({ previous: dial.previous, current: dial.values.absolute, numPassed });
		return numPassed;
	}
}

export class Reader {
	constructor(public path: string) {}

	getInstructions() {
		const fr = new FileReader(import.meta.url);
		const data = fr.readFile(this.path);
		return data;
	}
}

type Direction = { d: "L" | "R"; amount: number };

export class Instructor {
	directions: Direction[] = [];
	numTimesAtZero = 0;
	numTimesPassedZero = 0;
	constructor(path?: string) {
		const r = new Reader(path ?? "input.txt");
		const d = r.getInstructions();
		d.forEach((row) => {
			const d = row[0] as "L" | "R";
			const amount = Number.parseInt(row.slice(1));
			this.directions.push({ d, amount });
		});
		// console.log(this.directions.length);
	}
	doNextDirection(dial: Dial) {
		if (this.directions.length === 0) {
			console.log(`no directions left`);
			return "done";
		}
		const [next] = this.directions.splice(0, 1);
		// console.log(next);
		dial.move(next);
		const atZero = new ZeroDialReader().atZero(dial);
		if (atZero) this.numTimesAtZero++;

		const passedZero = new ZeroDialReader().passedZero(dial);
		if (passedZero > 0) {
			this.numTimesPassedZero += passedZero;
			console.log({
				previous: dial.previous,
				amount: `${next.d === "L" ? "+" : "-"}${next.amount}`,
				current: dial.values.absolute,
				passedZero,
				totalPassedZero: this.numTimesPassedZero,
			});
		}
	}
}
