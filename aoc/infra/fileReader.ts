import fs from "node:fs";

export class FileReader {
	readFile(path: string) {
		try {
			const p = `${__dirname}/${path}`;
			const file = fs.readFileSync(p, { encoding: "utf8" });
			const values = file.split("\n");
			return values;
		} catch (e) {
			console.error(`Error reading file`, e);
			return [];
		}
	}
}
