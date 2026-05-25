import { filter, from, interval, map, of, take, tap } from "rxjs";
import { waitForInput } from "./helper-utils.ts";

console.log("Basic RxJS example of([1, 2, 3, 4, 5]):");
of([1, 2, 3, 4, 5]).subscribe(console.log);

await waitForInput();

console.log("\nBasic RxJS example from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]):");
from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).subscribe(console.log);

await waitForInput();

console.log("\nmap + 2 and filter > 5:");
from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  .pipe(
    map((x) => x + 2),
    tap((x) => console.log("Mapped value:", x)),
    filter((x) => x > 5),
  )
  .subscribe(console.log);

await waitForInput();

// show both are in parallel
console.log("\nInterval value each 100ms:");
interval(100)
  .pipe(take(10))
  .subscribe((x) => console.log("100ms", x));
console.log("\nInterval value each 150ms:");
interval(150)
  .pipe(take(10))
  .subscribe((x) => console.log("150ms", x));
