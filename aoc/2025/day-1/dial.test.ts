import { describe, test, expect } from "vitest";
import { Dial, Instructor } from "./dial";

describe("reader test", () => {
	test("reads lines", () => {
		const instructor = new Instructor();
		expect(instructor.directions[0]).toEqual({ d: "L", amount: 32 });
		expect(instructor.directions[1]).toEqual({ d: "L", amount: 15 });
	});
	test("reads arbitrary files", () => {
		const instructor = new Instructor("example1.txt");
		expect(instructor.directions[0]).toEqual({ d: "L", amount: 68 });
		expect(instructor.directions[1]).toEqual({ d: "L", amount: 30 });
	});
});

describe("instructor", () => {
	test("does it all", () => {
		const instructor = new Instructor();
		const dial = new Dial();
		while (instructor.doNextDirection(dial) !== "done") {}
		expect(instructor.numTimesAtZero).toEqual(1092);
	});
});

describe("passes zero", () => {
	test("test does it all", () => {
		const instructor = new Instructor("example1.txt");
		const dial = new Dial();
		while (instructor.doNextDirection(dial) !== "done") {
			// console.log(instructor.directions.length);
		}
		expect(instructor.numTimesPassedZero).toEqual(6);
	});
	test("real does it all", () => {
		const instructor = new Instructor();
		const dial = new Dial();
		while (instructor.doNextDirection(dial) !== "done") {
			// console.log(instructor.directions.length);
		}
		expect(instructor.numTimesPassedZero).toEqual(6);
	});
});
