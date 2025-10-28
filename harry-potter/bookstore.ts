export class Store {
	bundles: number[][] = [];

	addToBundles(book: number) {
		if (!this.bundles[0]) this.bundles[0] = [];
		this.bundles.forEach((bundle) => {
			if (!bundle.includes(book)) {
				bundle.push(book);
				return;
			}
			this.bundles.push([book]);
		});
	}
}
