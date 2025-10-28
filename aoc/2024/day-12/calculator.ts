type Coords = { x: number; y: number };
type Region = Set<Coords>;

const addToSet = <T>(set: Set<unknown>, value: T) => {
	set.add(JSON.stringify(value));
};

const setHas = <T>(set: Set<unknown>, value: T) => {
	return set.has(JSON.stringify(value));
};

const setParse = <T>(set: Set<unknown>) => {
	return [...set].map((s) => JSON.parse(s as string)) as T;
};

const isTouching = (regions: Region, point: Coords): boolean => {
	return (
		setHas(regions, { x: point.x + 1, y: point.y }) ||
		setHas(regions, { x: point.x - 1, y: point.y }) ||
		setHas(regions, { x: point.x, y: point.y + 1 }) ||
		setHas(regions, { x: point.x, y: point.y - 1 })
	);
};

const numInternalCorners = (region: Region, point: Coords): number => {
	// NE
	const NE =
		setHas(region, { x: point.x + 1, y: point.y }) && // right
		setHas(region, { x: point.x, y: point.y + 1 }) && // up
		!setHas(region, { x: point.x + 1, y: point.y + 1 }); // not NE
	// NE
	const NW =
		setHas(region, { x: point.x - 1, y: point.y }) && // left
		setHas(region, { x: point.x, y: point.y + 1 }) && // up
		!setHas(region, { x: point.x - 1, y: point.y + 1 }); // not NW
	// NE
	const SE =
		setHas(region, { x: point.x + 1, y: point.y }) && // right
		setHas(region, { x: point.x, y: point.y - 1 }) && // down
		!setHas(region, { x: point.x + 1, y: point.y - 1 }); // not SE
	// NE
	const SW =
		setHas(region, { x: point.x - 1, y: point.y }) && // left
		setHas(region, { x: point.x, y: point.y - 1 }) && // down
		!setHas(region, { x: point.x - 1, y: point.y - 1 }); // not SW

	return Number(NE) + Number(NW) + Number(SE) + Number(SW);
};

const numExternalCorners = (regions: Region, point: Coords): number => {
	const NE =
		!setHas(regions, { x: point.x + 1, y: point.y + 0 }) &&
		!setHas(regions, { x: point.x, y: point.y + 1 });
	const SE =
		!setHas(regions, { x: point.x + 1, y: point.y + 0 }) &&
		!setHas(regions, { x: point.x, y: point.y - 1 });
	const NW =
		!setHas(regions, { x: point.x - 1, y: point.y + 0 }) &&
		!setHas(regions, { x: point.x, y: point.y + 1 });
	const SW =
		!setHas(regions, { x: point.x - 1, y: point.y + 0 }) &&
		!setHas(regions, { x: point.x, y: point.y - 1 });
	console.log({ point, NE, SE, NW, SW });
	return Number(NE) + Number(SE) + Number(NW) + Number(SW);
};

const numSides = (region: Region) => {
	const internalCorners = [...region]
		.map((point) => numInternalCorners(region, JSON.parse(point)))
		.reduce((a, b) => a + b);
	const externalCorners = [...region]
		.map((point) => numExternalCorners(region, JSON.parse(point)))
		.reduce((a, b) => a + b);
	return internalCorners + externalCorners;
};

export class Calculator {
	findRegions(graph: string[]): { regions: Region[] } {
		const regions: Region[] = [];
		const numRows = graph.length;
		for (let row = 0; row < numRows; row++) {
			for (let column = 0; column < graph[row].length; column++) {
				const point: Coords = { x: column, y: row };
				const val = graph[row][column] != ".";
				if (val) {
					// is a letter
					if (
						regions.length === 0 || // no regions
						regions.every((region) => !isTouching(region, point)) // not touching any regions
					) {
						const r: Region = new Set<Coords>();
						// console.log(`adding ${JSON.stringify(point)} to new set`);
						addToSet(r, point);
						regions.push(r); // establish a region with the point
						console.log(column, row);
						continue;
					}
					const thisRegion = regions.filter((region) => isTouching(region, point));
					// console.log(
					// 	`point ${JSON.stringify(point)} is touching ${thisRegion.length} regions`
					// );
					if (!thisRegion) {
						throw new Error("should be in at least one region but couldn't find one");
					}
					if (thisRegion.length === 1) {
						addToSet(thisRegion[0], point);
						// console.log(`now it has ${thisRegion[0].size} squares`);
					} else {
						// the two sets are actually one
						console.log(
							`combining ${thisRegion.length} sets (${thisRegion.map((r) => [...r])})`
						);
						const points = thisRegion.reduce((a, b) => new Set([...a, ...b]));
						// regions.splice
						console.log(`original length of regions: ${regions.length}`);
						const old1 = regions.indexOf(thisRegion[0]);
						regions.splice(old1, 1);
						const old2 = regions.indexOf(thisRegion[1]);
						regions.splice(old2, 1);
						console.log(`middle length of regions: ${regions.length}`);
						regions.push(points);
						console.log(`final length of regions: ${regions.length}`);
						addToSet(points, point);
						console.log(`now it has ${thisRegion[0].size} squares`);
					}
				}
			}
		}
		return { regions };
	}
	findOnePerimeter(region: Region): number {
		let perimeter = 0;

		const points = setParse<Region>(region);
		console.log(`finding perimeter`);
		points.forEach((point) => {
			let i = 0;
			if (!setHas(region, { x: point.x + 1, y: point.y })) {
				// console.log(`region doesnt have ${JSON.stringify({ x: point.x + 1, y: point.y })}`);
				perimeter++;
				i++;
			}
			if (!setHas(region, { x: point.x - 1, y: point.y })) {
				// console.log(`region doesnt have ${JSON.stringify({ x: point.x + 1, y: point.y })}`);
				perimeter++;
				i++;
			}
			if (!setHas(region, { x: point.x, y: point.y + 1 })) {
				// console.log(`region doesnt have ${JSON.stringify({ x: point.x + 1, y: point.y })}`);
				perimeter++;
				i++;
			}
			if (!setHas(region, { x: point.x, y: point.y - 1 })) {
				// console.log(`region doesnt have ${JSON.stringify({ x: point.x + 1, y: point.y })}`);
				perimeter++;
				i++;
			}
			// console.log(`For point ${JSON.stringify(point)}, has ${i} fences`);
		});
		return perimeter;
	}
	findNumberOfSides(region: Region): number {
		return numSides(region);
	}
	findSidesGraph(graph: string[]): number {
		const { regions } = this.findRegions(graph);
		console.log(`${regions.length} regions`);
		const res = regions.map((r) => this.findNumberOfSides(r));
		console.log({ res });
		return res[0];
	}
	findArea(region: Region): number {
		return region.size;
	}
	findCost(graph: string[]) {
		const { regions } = this.findRegions(graph);
		console.log(`${regions.length} regions`);
		const values = regions.map((region) => {
			const area = this.findArea(region);
			const perim = this.findOnePerimeter(region);
			const sides = this.findNumberOfSides(region);
			console.log({ area, perim, sides });
			return { part1: area * perim, part2: area * sides };
		});
		console.log(`Indiviadual values: ${JSON.stringify(values)}`);
		const sum = values.reduce(
			(a, b) => {
				return {
					part1: a.part1 + b.part1,
					part2: a.part2 + b.part2,
				};
			},
			{ part1: 0, part2: 0 }
		);
		console.log(sum);
		return sum;
	}
	findTotalCost(graph: string[]): number {
		return 0;
	}
}
