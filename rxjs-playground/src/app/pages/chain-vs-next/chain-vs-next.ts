import { Component } from '@angular/core';
import { interval, map, shareReplay, Subject } from 'rxjs';

@Component({
  selector: 'app-chain-vs-next',
  imports: [],
  templateUrl: './chain-vs-next.html',
  styleUrl: './chain-vs-next.scss',
})
export class ChainVsNext {
  example1() {
    console.log("\n" + "=".repeat(60));
    console.log("Approach 1: Observable (each subscription is independent)");
    console.log("=".repeat(60));

    const observable$ = interval(300).pipe(map((x) => x + 10));

    console.log("\nCreating subscription 1...");
    const sub1 = observable$.subscribe((x) => console.log("    Sub 1 got:", x));

    setTimeout(() => {
      console.log("\nCreating subscription 2...");
      const sub2 = observable$.subscribe((x) => console.log("    Sub 2 got:", x));

      setTimeout(() => {
        console.log("\nCleaning up...");
        sub1.unsubscribe();
        sub2.unsubscribe();
        console.log("Done!");
      }, 3000);
    }, 1000);
  }

  example2() {
    console.log("\n" + "=".repeat(60));
    console.log("Approach 2: Subject (all subscriptions share same sequence)");
    console.log("=".repeat(60));

    const subject$ = new Subject<number>();

    const intervalSource = interval(300)
      .pipe(map((x) => x + 10))
      .subscribe((x) => {
        subject$.next(x);
      });

    console.log("\nCreating subscription 1 to subject...");
    const sub1 = subject$.subscribe((x) => console.log("    Sub 1 got:", x));

    setTimeout(() => {
      console.log("\nCreating subscription 2 to subject...");
      const sub2 = subject$.subscribe((x) => console.log("    Sub 2 got:", x));

      setTimeout(() => {
        console.log("\nCleaning up...");
        intervalSource.unsubscribe();
        sub1.unsubscribe();
        sub2.unsubscribe();
        console.log("Done!");
      }, 3000);
    }, 1000);
  }

  example3() {
    console.log("\n" + "=".repeat(60));
    console.log("Approach 3: shareReplay(1)");
    console.log("=".repeat(60));

    const shared$ = interval(300).pipe(
      map((x) => x + 10),
      shareReplay(1),
    );

    console.log("\nSubscribing A to shared$");
    const sA = shared$.subscribe((v) => console.log("    A got:", v));

    setTimeout(() => {
      console.log("\nSubscribing B to shared$");
      const sB = shared$.subscribe((v) => console.log("    B got:", v));

      setTimeout(() => {
        console.log("\nUnsubscribe A (source still active because B subscribed)");
        sA.unsubscribe();

        setTimeout(() => {
          console.log("\nUnsubscribe B (no subscribers -> source will stop)");
          sB.unsubscribe();
          console.log("Done!");
        }, 1000);
      }, 2000);
    }, 1000);
  }
}
