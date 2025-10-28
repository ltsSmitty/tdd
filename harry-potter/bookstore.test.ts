import { beforeEach, describe, expect, test } from "vitest";
import { Store } from "./bookstore";

describe("harry potter bookstore", () => {
	let store: Store;
	beforeEach(() => {
		store = new Store();
	});

	test("the store should start with no bundles", () => {
		expect(store.bundles).toEqual([]);
	});

	test("adding one book to bundles should put it in the first bundle", () => {
		store.addToBundles(1);
		expect(store.bundles).toEqual([[1]]);
	});

	test("adding a second book should put it in the first bundle", () => {
		store.addToBundles(1);
		store.addToBundles(2);
		expect(store.bundles).toEqual([[1, 2]]);
	});

	test("add the same book twice should put it in a new bundle", () => {
		store.addToBundles(1);
		store.addToBundles(1);
		expect(store.bundles).toEqual([[1], [1]]);
	});
});
