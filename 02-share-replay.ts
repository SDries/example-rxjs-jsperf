import { Subject, map, shareReplay, Observable } from "rxjs";
import type { MonoTypeOperatorFunction } from "rxjs";
import { waitForInput } from "./helper-utils.ts";

function runExample(name: string, operator?: MonoTypeOperatorFunction<string>) {
  console.log("\n" + "=".repeat(60));
  console.log(`Example: ${name}`);
  console.log("=".repeat(60));

  const subject = new Subject<string>();

  console.log("\n--- Before any subscription ---");
  console.log('  subject.next("a")');
  subject.next("a");
  console.log('  subject.next("b")');
  subject.next("b");

  let data$: Observable<string> = subject.asObservable().pipe(map((x) => x));
  if (operator) {
    data$ = data$.pipe(operator);
  }

  console.log('  subject.next("c")');
  subject.next("c");
  console.log('  subject.next("d")');
  subject.next("d");

  console.log("\n--- First subscriber joins ---");
  const sub1 = data$.subscribe((c) => console.log(`  [sub1] received: "${c}"`));

  console.log('  subject.next("e")');
  subject.next("e");
  console.log('  subject.next("f")');
  subject.next("f");

  console.log("\n--- Second subscriber joins (late) ---");
  const sub2 = data$.subscribe((c) => console.log(`  [sub2] received: "${c}"`));

  console.log('  subject.next("g")');
  subject.next("g");
  console.log('  subject.next("h")');
  subject.next("h");

  console.log("\n--- First subscriber unsubscribes ---");
  sub1.unsubscribe();

  console.log('  subject.next("i")');
  subject.next("i");

  console.log("\n--- Second subscriber unsubscribes ---");
  sub2.unsubscribe();

  console.log("\n--- Third subscriber joins after all unsubscribed ---");
  const sub3 = data$.subscribe((c) => console.log(`  [sub3] received: "${c}"`));

  console.log('  subject.next("j")');
  subject.next("j");

  sub3.unsubscribe();
  subject.complete();
}

// Example 1: No sharing - plain observable
runExample("No operator (plain observable)");
await waitForInput();

// Example 2: shareReplay() - replay all values to late subscribers
runExample("shareReplay()", shareReplay());
await waitForInput();

// Example 3: shareReplay(1) - replay last 1 value, refCount: true by default
runExample("shareReplay(1)", shareReplay(1));
await waitForInput();

// Example 4: shareReplay({ bufferSize: 1, refCount: true }) - same as above, explicit
runExample(
  "shareReplay({ bufferSize: 1, refCount: true })",
  shareReplay({ bufferSize: 1, refCount: true }),
);
await waitForInput();

// Example 5: shareReplay({ bufferSize: 1, refCount: false }) - keeps buffer even when no subscribers
runExample(
  "shareReplay({ bufferSize: 1, refCount: false })",
  shareReplay({ bufferSize: 1, refCount: false }),
);
await waitForInput();

// Example 6: shareReplay(3) - replay last 3 values
runExample("shareReplay(3)", shareReplay(3));
