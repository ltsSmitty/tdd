import { FileReader } from "../../infra/fileReader";
import { Button } from "./machine";

export class Reader {
	constructor(public path: string) {}

	getMachines() {
		const fr = new FileReader(import.meta.url);
		const data = fr.readFile(this.path);
		const setups: { aButton: Button; bButton: Button; prize: Button; prize2: Button }[] = [];
		for (let i = 0; i < data.length; i += 4) {
			const aRow = data[i];
			if (aRow === undefined) {
				console.log(`No more rows`, i);
				break;
			}
			const [ax, ay] = aRow
				.split(":")[1]
				.split(",")
				.map((s) => s.split("+")[1]);
			const bRow = data[i + 1];
			const [bx, by] = bRow
				.split(":")[1]
				.split(",")
				.map((s) => s.split("+")[1]);
			const prizeRow = data[i + 2];
			const [prizex, prizey] = prizeRow
				.split(":")[1]
				.split(",")
				.map((s) => s.split("=")[1]);
			const setup = {
				aButton: { x: Number(ax), y: Number(ay) },
				bButton: { x: Number(bx), y: Number(by) },
				prize: { x: Number(prizex), y: Number(prizey) },
				prize2: { x: Number(prizex) + 10000000000000, y: Number(prizey) + 10000000000000 },
			};
			setups.push(setup);
		}
		return setups;
	}
}
