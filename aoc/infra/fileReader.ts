import fs from "node:fs";
import { fileURLToPath } from "node:url";
import path from "path";

export function readRelative(callerUrl: string | URL, relativePath: string) {
	// Turn file: URL -> /absolute/path and use the directory of the caller file
	const callerDir = path.dirname(fileURLToPath(callerUrl));
	const abs = path.resolve(callerDir, relativePath);
	console.log({ callerDir, abs });
	return fs.readFileSync(abs, "utf8");
}

export class FileReader {
	constructor(private caller: string) {}
	readFile(path: string) {
		try {
			const file = readRelative(this.caller, path);
			const values = file.split("\n");
			return values;
		} catch (e) {
			console.error(`Error reading file`, e);
			return [];
		}
	}
}
