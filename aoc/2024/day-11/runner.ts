import { Splitter } from "./splitter";
const splitter = new Splitter();

const input = [{ value: 2024 }];
const answer = splitter.processMany(input, 50);
console.log(answer);
