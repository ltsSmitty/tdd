import { describe, expect, test, beforeEach } from "bun:test";
import { Traveler } from "./traveler";

describe("traveler", () => {
	const traveler: Traveler = new Traveler();
	const length = 10;

	test("the traveler can count how many doors to visit", () => {
		expect(traveler.count(2, length)).toBe(5);
	});

	test("the traveler should return the divisors up to a given number", () => {
		expect(traveler.getDoorsToVisit(2, length)).toEqual([2, 4, 6, 8, 10]);
		expect(traveler.getDoorsToVisit(3, length)).toEqual([3, 6, 9]);
		expect(traveler.getDoorsToVisit(10, length)).toEqual([10]);
	});
});
