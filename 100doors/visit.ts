import { Doors } from "./doors";
import { Traveler } from "./traveler";

export const visit = (doors: Doors, mod: number, length: number) => {
	const doorsToVisit = new Traveler().getDoorsToVisit(mod, length);
	doorsToVisit.forEach((doorNumber) => doors.visit(doorNumber));
	return doors;
};

const main = () => {
	const doors = new Doors(100);
	for (let i = 1; i <= 100; i++) {
		visit(doors, i, 100);
	}
	console.log(doors.getStatus().map((v, i) => (v === true ? `${i + 1}` : undefined)));
};

main();
