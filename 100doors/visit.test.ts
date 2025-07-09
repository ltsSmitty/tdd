import { describe, expect, test, beforeEach } from "vitest";
import { Doors } from "./doors";
import { Traveler } from "./traveler";
import { visit } from "./visit";

describe("visit", () => {
	let traveler: Traveler;
	let doors: Doors;
	beforeEach(() => {
		traveler = new Traveler();
		doors = new Doors(5);
	});
	test("the traveler should touch all 5 doors", () => {
		expect(visit(doors, 1, 5).getStatus()).toEqual([true, true, true, true, true]);
	});
	test("the traveler should touch every other on the second pass", () => {
		expect(visit(doors, 1, 5).getStatus()).toEqual([true, true, true, true, true]);
		expect(visit(doors, 2, 5).getStatus()).toEqual([true, false, true, false, true]);
	});
});
