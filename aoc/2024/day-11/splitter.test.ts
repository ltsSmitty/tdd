import { describe, test, expect } from "vitest";
import { Splitter, stone } from "./splitter";

const splitter = new Splitter();
describe("splitter tests", () => {
	test("should turn stone with a value of 0 into 1", () => {
		const val = stone(0);
		const n = splitter.categorize(val);
		expect(n).toEqual([{ value: 1, lapRemoved: 1 }]);
	});
	test("length is even should split into two", () => {
		const n1 = splitter.categorize(stone(1000));
		expect(n1).toEqual([stone(10), stone(0)]);
		const n2 = splitter.categorize(stone(2024));
		expect(n2).toEqual([20, 24].map(stone));
	});
	test("otherwise *2024", () => {
		const n1 = splitter.categorize(stone(1));
		expect(n1).toEqual([stone(2024)]);
		const hh = splitter.categorize(stone(111));
		expect(hh).toEqual([111 * 2024].map(stone));
	});
	test("it can process multiple rocks", () => {
		const vals = [stone(125), stone(17)];
		const round1 = splitter.process(vals);
		expect(round1).toEqual([stone(253000), stone(1), stone(7)]);
		const round2 = splitter.process(round1);
		expect(round2).toEqual([stone(253), stone(0), { value: 1, lapRemoved: -1 }, stone(14168)]);
	});
	test("process many works", () => {
		const vals = [125, 17].map(stone);
		const finalLen = splitter.processMany(vals, 6);
		expect(finalLen).toEqual(22);
		const real = splitter.processMany(vals, 25);
		expect(real).toEqual(55312);
	});
});
