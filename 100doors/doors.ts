export class Doors {
	private status: Array<boolean>;

	constructor(length: number) {
		this.status = new Array(length).fill(false);
	}

	value(index: number) {
		return this.status[index - 1];
	}

	get total() {
		return this.status.length;
	}

	visit(index: number) {
		this.status[index - 1] = !this.status[index - 1];
	}

	getStatus() {
		return this.status;
	}
}
