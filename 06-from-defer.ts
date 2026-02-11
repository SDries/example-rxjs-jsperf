import { defer, from, shareReplay } from "rxjs";
import { delay } from "./helper-utils.ts";

console.log("=".repeat(60));
console.log("RxJS: from(Promise) vs from(defer(() => from(Promise)))");
console.log("=".repeat(60));

// Simulated API call that returns a Promise
let apiCallCount = 0;

function fetchUserData(): Promise<{
  id: number;
  name: string;
  timestamp: string;
}> {
  apiCallCount++;
  const callNumber = apiCallCount;
  console.log(`  🌐 API Call #${callNumber} - Fetching user data...`);

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: callNumber,
        name: `User ${callNumber}`,
        timestamp: new Date().toJSON(),
      });
    }, 500);
  });
}

console.log("\n--- Example 1: Promise is Called Immediately with from() ---\n");

console.log("Creating observable with from(Promise):");
const fromPromise = from(fetchUserData());

await delay(600);
console.log("Subscribing to observable the first time:");

fromPromise.subscribe((data) => console.log(`  ✅ Received:`, data));

await delay(100);

fromPromise.subscribe((data) => console.log(`  ✅ Received:`, data));

await delay(500);

console.log(
  "\n--- Example 2: Promise is Called Per Subscription with defer() ---\n",
);

console.log("Creating observable with defer(() => from(Promise)):");
const deferPromise = defer(() => from(fetchUserData()));

await delay(100);

console.log("Subscribing to observable the first time:");
deferPromise.subscribe((data) => console.log(`  ✅ Received:`, data));

await delay(600);

deferPromise.subscribe((data) => console.log(`  ✅ Received:`, data));

await delay(600);

console.log("\n--- Example 3: defer() with shareReplay ---\n");

console.log(
  "Creating observable with defer(() => from(Promise)).shareReplay(1):",
);
const deferedPromise2 = defer(() => from(fetchUserData())).pipe(shareReplay(1));

await delay(100);

console.log("Subscribing to observable the first time:");
deferedPromise2.subscribe((data) => console.log(`  ✅ Received:`, data));

await delay(100);

deferedPromise2.subscribe((data) => console.log(`  ✅ Received:`, data));

await delay(600);

console.log(
  "\n--- Example 4: from(defer(() => Promise)) - Wrapping defer in from ---\n",
);

console.log("Creating observable with from(defer(() => fetchUserData())):");
const fromDeferPromise = from(defer(() => fetchUserData()));

await delay(100);

console.log("Now subscribing to from(defer()) observable (1st subscription):");
fromDeferPromise.subscribe((data) => console.log(`  ✅ Received:`, data));

await delay(600);

fromDeferPromise.subscribe((data) => console.log(`  ✅ Received:`, data));

await delay(600);
