import { interval, map, shareReplay, Subject } from "rxjs";
import { waitForInput, delay } from "./helper-utils.ts";

console.log("Approach 1: Observable (each subscription is independent)");
console.log("========================================================\n");

const observable$ = interval(300).pipe(map((x) => x + 10));

console.log("Creating subscription 1...");
const sub1 = observable$.subscribe((x) => console.log("    Sub 1 got:", x));

await delay(1000);

console.log("\nCreating subscription 2...");
const sub2 = observable$.subscribe((x) => console.log("    Sub 2 got:", x));

await delay(3000);

console.log("\nCleaning up...");
sub1.unsubscribe();
sub2.unsubscribe();

await waitForInput();

console.log("\n\nApproach 2: Subject (all subscriptions share same sequence)");
console.log("==========================================================\n");

const subject$ = new Subject<number>();

const intervalSource = interval(300)
  .pipe(map((x) => x + 10))
  .subscribe((x) => {
    subject$.next(x);
  });

console.log("Creating subscription 1 to subject...");
const sub3 = subject$.subscribe((x) => console.log("    Sub 1 got:", x));

await delay(1000);

console.log("\nCreating subscription 2 to subject...");
const sub4 = subject$.subscribe((x) => console.log("    Sub 2 got:", x));

await delay(3000);

console.log("\nCleaning up...");
intervalSource.unsubscribe();
sub3.unsubscribe();
sub4.unsubscribe();

await waitForInput();

// Approach 3: shareReplay example
console.log("\n\nApproach 3: shareReplay(1)");
console.log("==========================================\n");

const shared$ = interval(300).pipe(
  map((x) => x + 10),
  shareReplay(1),
);

console.log("Subscribing A to shared$");
const sA = shared$.subscribe((v) => console.log("    A got:", v));
await delay(1000);

console.log("Subscribing B to shared$");
const sB = shared$.subscribe((v) => console.log("    B got:", v));

await delay(2000);

console.log("Unsubscribe A (source still active because B subscribed)");
sA.unsubscribe();

await delay(1000);

console.log("Unsubscribe B (no subscribers -> source will stop)");
sB.unsubscribe();

await waitForInput();
