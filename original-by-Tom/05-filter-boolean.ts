import { from, filter, distinctUntilChanged } from "rxjs";

// show filter
console.log("Filter Even Numbers Example:");
const source = from([1, 2, 3, 4, 5]);
const example = source.pipe(filter((num) => num % 2 === 0));
example.subscribe((val) => console.log("Even number", val));

// show filter on boolean values
console.log("Filter Boolean Example:");
const source$ = from([true, false, true, false, true]);
source$.pipe(filter((value) => value)).subscribe(console.log);

// show filter with distinct until changed to filter out consecutive duplicates
console.log("Filter with Distinct Until Changed Example:");
const source2$ = from([true, true, false, false, true, true, false]);
source2$
  .pipe(
    filter((value) => value),
    distinctUntilChanged(),
  )
  .subscribe(console.log);

// emit only when it changes to true (after false or first emission)
console.log("Emit When Changes to True Example:");
const source3$ = from([
  true,
  true,
  false,
  false,
  true,
  true,
  false,
  true,
  false,
  false,
  true,
]);
source3$
  .pipe(
    distinctUntilChanged(),
    filter((value) => value),
  )
  .subscribe(console.log);
