import {
  interval,
  take,
  Subject,
  takeUntil,
  finalize,
  startWith,
  shareReplay,
  Observable,
  tap,
  of,
  delay,
} from "rxjs";
import { waitForInput } from "./helper-utils.ts";

console.log("Example 1: Basic unsubscribe()");
const subscription = interval(200).subscribe((x) =>
  console.log("Interval value:", x),
);

await waitForInput(1000);
console.log("Unsubscribing...");
subscription.unsubscribe();
console.log("Unsubscribed!");

await waitForInput();

console.log("\nExample 2: Using take() for automatic cleanup");
interval(300)
  .pipe(take(5))
  .subscribe({
    next: (x) => console.log("Value:", x),
    error: (error) => console.error("Error:", error),
    complete: () => console.log("Completed (auto unsubscribed)"),
  });

await waitForInput(2500);

console.log("\nExample 3: Using takeUntil() with Subject");
const destroy$ = new Subject<void>();

interval(200)
  .pipe(takeUntil(destroy$))
  .subscribe({
    next: (x) => console.log("Observable value:", x),
    error: (error) => console.error("Error:", error),
    complete: () => console.log("Completed"),
  });

await waitForInput(1200);
console.log("Triggering destroy signal...");
destroy$.next();
destroy$.complete();
console.log("Unsubscribed!");

await waitForInput();

console.log("\nExample 4: Using finalize() to run action on unsubscribe");
const sub4 = interval(200)
  .pipe(
    finalize(() => {
      console.log("Finalize: Cleanup executed on unsubscribe!");
    }),
  )
  .subscribe({
    next: (x) => console.log("Value:", x),
    complete: () => console.log("Completed"),
  });

setTimeout(() => {
  sub4.unsubscribe(); // finalize() will be called here
}, 1000);

await waitForInput(1500);

console.log("\nExample 5: takeUntil first vs last");

let destroySubject = new Subject<void>();

of(1)
  .pipe(takeUntil(destroySubject), delay(2000))
  .subscribe((x) => console.log("received ", x));

setTimeout(() => {
  console.log("Emitting destroy to trigger takeUntil");
  destroySubject.next();
  destroySubject.complete();
}, 1000);

await waitForInput(2500);

destroySubject = new Subject<void>();

of(1)
  .pipe(delay(2000), takeUntil(destroySubject))
  .subscribe((x) => console.log("received ", x));

setTimeout(() => {
  console.log("Emitting destroy to trigger takeUntil");
  destroySubject.next();
  destroySubject.complete();
}, 1000);

await waitForInput(2500);

console.log(
  "\nExample 6: Using shareReplay(1) - Proper subscription management",
);

// Create the observable with shareReplay(1) - this shares and caches the value
const memoryCache = new Map<number, Observable<number>>();

function getCounterFromMemory(id: number): Observable<number> {
  if (!memoryCache.has(id)) {
    const obs$ = interval(200).pipe(
      startWith(-1),
      tap((c) => console.log("counting for :", id, c)),
      shareReplay(1),
    );
    //memoryCache.set(id, obs$);
    return obs$;
  }
  return memoryCache.get(id)!;
}

const sub = getCounterFromMemory(1).subscribe((value) => {
  console.log("Subscription 1 received:", value);
});

await new Promise((resolve) => setTimeout(resolve, 500));
sub.unsubscribe();

const sub2 = getCounterFromMemory(2).subscribe((value) => {
  console.log("Subscription 2 received:", value);
});

await new Promise((resolve) => setTimeout(resolve, 500));
sub2.unsubscribe();

const sub3 = getCounterFromMemory(1).subscribe((value) => {
  console.log("Subscription 3 received:", value);
});

await new Promise((resolve) => setTimeout(resolve, 500));
sub3.unsubscribe();

await waitForInput(1500);
