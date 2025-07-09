import { describe, expect, test, beforeEach } from "bun:test";
import { Doors } from "./doors";

describe("doors", () => {
	let doors: Doors;
	beforeEach(() => (doors = new Doors(100)));

	test("there should be 100 doors", () => {
		expect(doors.total).toBe(100);
	});

	test("a door should know its status", () => {
		expect(doors.value(2)).toBe(false);
	});

	test("visiting a closed door should toggle it open", () => {
		expect(doors.value(2)).toBe(false);
		doors.visit(2);
		expect(doors.value(2)).toBe(true);
	});

	test("visiting an open door should toggle it to closed", () => {
		doors.visit(2);
		expect(doors.value(2)).toBe(true);
		doors.visit(2);
		expect(doors.value(2)).toBe(false);
	});
});
