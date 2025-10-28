export class Separator {
	getLetters(rows: string[]) {
		const l = new Set<string>();
		rows.forEach((row) => {
			row.split("").map((r) => {
				console.log(`adding ${r}`);
				l.add(r);
			});
		});
		const a = [...l];
		return a;
	}
	separateLetters(rows: string[]): Record<string, string[]> {
		const letters = this.getLetters(rows);
		const rec: Record<string, string[]> = {};
		letters.forEach((letter) => {
			const separated = rows.map((row) => {
				return this.replaceLetter(row, letter);
			});
			rec[letter] = separated;
		});
		return rec;
	}
	replaceLetter(originalRow: string, letterToKeep: string) {
		const replacementChar = "."; // The character to replace everything else with

		// Create a regular expression that matches any character *except* the one you want to keep
		// The 'g' flag ensures all occurrences are replaced.
		const regex = new RegExp(`[^${letterToKeep}]`, "g");

		return originalRow.replace(regex, replacementChar);
	}
}
