import { describe, test, expect } from "vitest";
import { fileURLToPath, pathToFileURL } from "node:url";
import { FileReader } from "./fileReader";

describe("can read file", () => {
	test("can get lines and values", () => {
		const fr = new FileReader(import.meta.url);
		const filename = "testFile.txt";
		const lines = fr.readFile(filename);
		expect(lines.length).toEqual(5);
		expect(lines[0]).toEqual("A");
	});
});
