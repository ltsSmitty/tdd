type Coords = { x: number; y: number };
type Region = Set<Coords>;

const addToSet = <T>(set: Set<unknown>, value: T) => {
	set.add(JSON.stringify(value));
};

const setHas = <T>(set: Set<unknown>, value: T) => {
	return set.has(JSON.stringify(value));
};

const setParse = <T>(set: Set<unknown>) => {
	return [...set].map((s) => JSON.parse(s as string));
};

const isTouching = (regions: Region, point: Coords): boolean => {
	return (
		setHas(regions, { x: point.x + 1, y: point.y }) ||
		setHas(regions, { x: point.x - 1, y: point.y }) ||
		setHas(regions, { x: point.x, y: point.y + 1 }) ||
		setHas(regions, { x: point.x, y: point.y - 1 })
	);
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
						addToSet(r, point);
						regions.push(r); // establish a region with the point
						continue;
					}
					const thisRegion = regions.find((region) => isTouching(region, point));
					if (!thisRegion) {
						throw new Error("should be in a region but couldn't find one");
					}
					addToSet(thisRegion, point);
				}
			}
		}
		return { regions };
	}
	findOnePerimeter(region: Region): number {
		let perimeter = 0;
		const points = setParse(region);
		// console.log(points);
		points.forEach((point) => {
			if (!setHas(region, { x: point.x + 1, y: point.y })) {
				// console.log(`region doesnt have ${JSON.stringify({ x: point.x + 1, y: point.y })}`);
				perimeter++;
			}
			if (!setHas(region, { x: point.x - 1, y: point.y })) {
				// console.log(`region doesnt have ${JSON.stringify({ x: point.x + 1, y: point.y })}`);
				perimeter++;
			}
			if (!setHas(region, { x: point.x, y: point.y + 1 })) {
				// console.log(`region doesnt have ${JSON.stringify({ x: point.x + 1, y: point.y })}`);
				perimeter++;
			}
			if (!setHas(region, { x: point.x, y: point.y - 1 })) {
				// console.log(`region doesnt have ${JSON.stringify({ x: point.x + 1, y: point.y })}`);
				perimeter++;
			}
		});
		return perimeter;
	}
	findArea(graph: string[]): number {
		const { regions } = this.findRegions(graph);
		// console.log(regions);
		const points = regions.map((region) => setParse(region)).flatMap((r) => r);
		// console.log(points);
		return points.length;
	}
	findPerimeter(graph: string[]): number {
		const { regions } = this.findRegions(graph);
		const perimeters = regions.map(this.findOnePerimeter);
		return perimeters.reduce((a, b) => a + b, 0);
	}
	findCost(graph: string[]): number {
		const { regions } = this.findRegions(graph);
		const area = this.findArea(graph);
		const perim = this.findPerimeter(graph);
		return area * perim;
	}
	findTotalCost(graph: string[]): number {
		return 0;
	}
}
