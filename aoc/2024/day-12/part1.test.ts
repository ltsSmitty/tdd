import { describe, test, expect } from "vitest";
import { FileReader } from "../../infra/fileReader";
import { Separator } from "./separator";
import { Calculator } from "./calculator";

const fr = new FileReader(import.meta.url);
const data = fr.readFile("test-input.txt");
const sep = new Separator();
const calc = new Calculator();

describe("separator", () => {
	test("file reads", () => {
		expect(data.length).toEqual(4);
		expect(data[0]).toEqual("AAAA");
	});
	test("separates out A's", () => {
		const r = sep.separateLetters(data);
		expect(r["A"]).toEqual(["AAAA", "....", "....", "...."]);
		expect(r["B"]).toEqual(["....", "BB..", "BB..", "...."]);
	});
	test("get letters", () => {
		const r = sep.getLetters(data);
		expect(r).toEqual(["A", "B", "C", "D", "E"]);
	});
	test("replaces letters", () => {
		const r1 = sep.replaceLetter("AAAABBBB", "A");
		expect(r1).toEqual("AAAA....");
		const r2 = sep.replaceLetter("AAAABBBB", "B");
		expect(r2).toEqual("....BBBB");
	});
});
describe("calculator", () => {
	const parsed = sep.separateLetters(data);
	const { regions } = calc.findRegions(parsed["A"]);
	const aArea = calc.findArea(regions[0]);
	const aPerim = calc.findOnePerimeter(regions[0]);
	// const bArea = calc.findArea(parsed["B"]);
	// const dArea = calc.findArea(parsed["D"]);

	// const aPerim = calc.findPerimeter(parsed["A"]);
	// const bPerim = calc.findPerimeter(parsed["B"]);
	// const dPerim = calc.findPerimeter(parsed["D"]);

	// const aCost = calc.findCost(parsed["A"]);
	test("calculates area", () => {
		expect(aArea).toEqual(4);
		// expect(bArea).toEqual(4);
		// expect(dArea).toEqual(1);
	});
	test("calculates perimeter", () => {
		expect(aPerim).toEqual(10);
		// expect(bPerim).toEqual(8);
		// expect(dPerim).toEqual(4);
	});
	test("calculates cost", () => {
		// expect(aCost).toEqual(40);
	});
});
describe("bigger example", () => {
	const bigData = fr.readFile("big-example.txt");
	const bigRows = sep.separateLetters(bigData);
	test("all costs", () => {
		const allCosts = Object.entries(bigRows).map(([k, v]) => {
			console.log(k);
			return calc.findCost(v);
		});
		console.log(allCosts);
		const sum = allCosts.reduce((a, b) => a + b);
		console.log(sum);
		expect(sum).toEqual(1930);
	});
});
describe("actual puzzle", () => {
	const bigData = fr.readFile("input.txt");
	const bigRows = sep.separateLetters(bigData);
	test("all costs", () => {
		const allCosts = Object.entries(bigRows).map(([k, v]) => {
			console.log(k);
			return calc.findCost(v);
		});
		console.log(allCosts);
		const sum = allCosts.reduce((a, b) => {
			return { part1: a?.part1 + b?.part1, part2: a?.part2 + b?.part2 };
		});
		console.log(sum);
		expect(sum).toEqual(1533644);
	});
});
describe("big e test", () => {
	const eData = fr.readFile("big-e.txt");
	const eRows = sep.separateLetters(eData);
	const eGraph = eRows["E"];
	test("all corners", () => {
		const corners = calc.findSidesGraph(eGraph);
		expect(corners).toEqual(12);
	});
});
