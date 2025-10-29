import { describe, test, expect } from "vitest";
import { Machine } from "./machine";
import { Human } from "./human";
import { Reader } from "./reader";
import { Human2 } from "./human2";
import { sumToTarget, sumToTargetWeighted } from "./linear-algebra";
describe("machine basic test", () => {
	test("can press a button", () => {
		const m = new Machine({ x: 1, y: 1 }, { x: 2, y: 2 }, { x: 10, y: 10 });
		expect(m.current).toEqual({ x: 0, y: 0 });

		const v1 = m.pressA();
		expect(v1).toEqual({ x: 1, y: 1 });
		expect(v1).toEqual(m.current);

		const v2 = m.pressB();
		expect(v2).toEqual({ x: 3, y: 3 });
	});
	test("can divide", () => {
		const m = new Machine({ x: 3, y: 3 }, { x: 2, y: 2 }, { x: 10, y: 10 });
		m.pressA();
		const { dividesA, dividesB } = m.dividesRemaining("x");
		expect(dividesA).toBe(false);
		expect(dividesB).toBe(false);

		const v2 = m.pressA();
		const divides2 = m.dividesRemaining("x");
		const remaining = m.getRemaining();
		console.log(divides2);
		expect({ dividesA: divides2.dividesA, dividesB: divides2.dividesB }).toEqual({
			dividesA: false,
			dividesB: true,
		});
	});

	test("can get solutions", () => {
		const m = new Machine({ x: 3, y: 3 }, { x: 2, y: 2 }, { x: 7, y: 7 });
		const h = new Human(m);
		h.press100As();
		console.log(h.solutions);
		expect(h.solutions).toEqual([{ numA: 1, numB: 2 }]);
	});
	test("can do example", () => {
		const m = new Machine({ x: 94, y: 34 }, { x: 22, y: 67 }, { x: 8400, y: 5400 });
		const h = new Human(m);
		h.press100As();
		console.log(h.solutions);
		expect(h.solutions).toEqual([{ numA: 80, numB: 40 }]);
	});
	test("can do third example", () => {
		const m = new Machine({ x: 17, y: 86 }, { x: 84, y: 37 }, { x: 7870, y: 6450 });
		const h = new Human(m);
		h.press100As();
		console.log(h.solutions);
		expect(h.solutions).toEqual([{ numA: 38, numB: 86 }]);
		expect(h.bestSolution()).toEqual({ numA: 38, numB: 86 });
		expect(h.cost()).toEqual(200);
	});

	test("can read an input", () => {
		const reader = new Reader("test-input.txt");
		const chunks = reader.getMachines();
		expect(chunks.length).toBe(4);
		const { aButton, bButton, prize, prize2 } = chunks[0];
		expect({ aButton, bButton, prize, prize2 }).toEqual({
			aButton: { x: 94, y: 34 },
			bButton: { x: 22, y: 67 },
			prize: { x: 8400, y: 5400 },
			prize2: { x: 10000000008400, y: 10000000005400 },
		});
	});
	test("whole test problem", () => {
		const reader = new Reader("test-input.txt");
		const chunks = reader.getMachines();
		expect(chunks.length).toBe(4);

		const totalCost = chunks.map((chunk) => {
			const m = new Machine(chunk.aButton, chunk.bButton, chunk.prize);
			const h = new Human(m);
			h.press100As();
			return h.cost();
		});
		const sum = totalCost.reduce((a, b) => a + b);
		expect(sum).toEqual(480);
	});
	test("real part 1 problem", () => {
		const reader = new Reader("real-input.txt");
		const chunks = reader.getMachines();
		expect(chunks.length).toBe(320);
		const c1 = chunks[0];
		const { aButton, bButton, prize } = c1;
		expect({ aButton, bButton, prize }).toEqual({
			aButton: { x: 24, y: 90 },
			bButton: { x: 85, y: 62 },
			prize: { x: 6844, y: 6152 },
		});
		const totalCost = chunks.map((chunk) => {
			const m = new Machine(chunk.aButton, chunk.bButton, chunk.prize);
			const h = new Human(m);
			h.press100As();
			if (h.solutions.length > 1) {
				console.log(
					`There were multiple solutions:`,
					h.solutions,
					"Best?:",
					h.bestSolution()
				);
			}
			return h.cost();
		});
		const sum = totalCost.reduce((a, b) => a + b);
		expect(sum).toEqual(31065);
	});
});

describe.skip("human 2", () => {
	test("works with example", () => {
		const m = new Machine(
			{ x: 26, y: 66 },
			{ x: 67, y: 21 },
			{ x: 10000000012748, y: 10000000012176 }
		);
		const h = new Human2(m);
		h.pressAs();
		expect(h.cost()).toBe(100);
		// if (h.solutions.length > 1) {
		// 	console.log(`There were multiple solutions:`, h.solutions, "Best?:", h.bestSolution());
		// }
		// expect(h.bestSolution()).toEqual({ numA: 1, numB: 1 });
	});
});

describe("lin alg", () => {
	test("right from gpt", () => {
		const res = sumToTargetWeighted(
			{ x: 17, y: 86 },
			{ x: 84, y: 37 },
			{ x: 7870, y: 6450 },
			{ weights: { w1: 3, w2: 1 } }
		);
		console.log(JSON.stringify(res));
		expect(res.counts).toEqual({ x: 38, y: 86 });
	});
});
