import { from, distinctUntilChanged, distinctUntilKeyChanged } from "rxjs";
import { waitForInput } from "./helper-utils.ts";

// only output distinct values, based on the last emitted value
console.log("Distinct Until Changed Example:");
const source$ = from([1, 1, 2, 2, 3, 3]);
source$.pipe(distinctUntilChanged()).subscribe(console.log);

await waitForInput();

//Objects must be same reference
console.log("Distinct Until Changed with Objects Example:");
const sampleObject = { name: "Test" };
const source2$ = from([sampleObject, sampleObject, sampleObject]);
source2$.pipe(distinctUntilChanged()).subscribe(console.log);

await waitForInput();
// Different object references with same content are considered different
console.log("Distinct Until Changed with Different Object References Example:");
const source3$ = from([{ name: "Test" }, { name: "Test" }, { name: "Test" }]);
source3$.pipe(distinctUntilChanged()).subscribe(console.log);

await waitForInput();
// only output distinct values, based on the last emitted value
console.log("Distinct Until Changed with Custom Comparator Example:");
const source4$ = from([
  { name: "Brian" },
  { name: "Joe" },
  { name: "Joe" },
  { name: "Sue" },
]);

source4$
  .pipe(distinctUntilChanged((prev, curr) => prev.name === curr.name))
  .subscribe(console.log);

await waitForInput();
// only output distinct values, based on the 'name' key
console.log("Distinct Until Key Changed Example:");
source3$.pipe(distinctUntilKeyChanged("name")).subscribe(console.log);
console.log(
  "Distinct Until Key Changed Example with Different Object References:",
);
source4$.pipe(distinctUntilKeyChanged("name")).subscribe(console.log);
