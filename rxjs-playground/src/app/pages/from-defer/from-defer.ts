import { Component } from '@angular/core';
import { defer, from, shareReplay } from 'rxjs';

@Component({
  selector: 'app-from-defer',
  imports: [],
  templateUrl: './from-defer.html',
  styleUrl: './from-defer.scss',
})
export class FromDefer {
  private apiCallCount = 0;

  private fetchUserData(): Promise<{
    id: number;
    name: string;
    timestamp: string;
  }> {
    this.apiCallCount++;
    const callNumber = this.apiCallCount;
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

  example1() {
    console.log('\n' + '='.repeat(60));
    console.log('Example 1: Promise is Called Immediately with from()');
    console.log('='.repeat(60));

    console.log('\nCreating observable with from(Promise):');
    const fromPromise = from(this.fetchUserData());

    setTimeout(() => {
      console.log('Subscribing to observable the first time:');
      fromPromise.subscribe((data) => console.log(`  ✅ Received:`, data));
    }, 600);

    setTimeout(() => {
      console.log('\nSubscribing the second time (data already cached):');
      fromPromise.subscribe((data) => console.log(`  ✅ Received:`, data));
    }, 700);
  }

  example2() {
    console.log('\n' + '='.repeat(60));
    console.log('Example 2: Promise is Called Per Subscription with defer()');
    console.log('='.repeat(60));

    console.log('\nCreating observable with defer(() => from(Promise)):');
    const deferPromise = defer(() => from(this.fetchUserData()));

    setTimeout(() => {
      console.log('Subscribing to observable the first time:');
      deferPromise.subscribe((data) => console.log(`  ✅ Received:`, data));
    }, 100);

    setTimeout(() => {
      console.log('\nSubscribing the second time (new API call made):');
      deferPromise.subscribe((data) => console.log(`  ✅ Received:`, data));
    }, 700);
  }

  example3() {
    console.log('\n' + '='.repeat(60));
    console.log('Example 3: defer() with shareReplay');
    console.log('='.repeat(60));

    console.log(
      '\nCreating observable with defer(() => from(Promise)).shareReplay(1):',
    );
    const deferedPromise2 = defer(() => from(this.fetchUserData())).pipe(
      shareReplay(1),
    );

    setTimeout(() => {
      console.log('Subscribing to observable the first time:');
      deferedPromise2.subscribe((data) => console.log(`  ✅ Received:`, data));
    }, 100);

    setTimeout(() => {
      console.log('\nSubscribing the second time (value replayed):');
      deferedPromise2.subscribe((data) => console.log(`  ✅ Received:`, data));
    }, 200);
  }

  // example2 & example4 achieve the same result (a new API call on each subscription),
  // but they wrap things in different orders.
  // Example 2 is more idiomatic RxJS style, while Example 4 demonstrates the flexibility of positioning operators differently.
  example4() {
    console.log('\n' + '='.repeat(60));
    console.log(
      'Example 4: from(defer(() => Promise)) - Wrapping defer in from',
    );
    console.log('='.repeat(60));

    console.log('\nCreating observable with from(defer(() => fetchUserData())):');
    const fromDeferPromise = from(defer(() => this.fetchUserData()));

    setTimeout(() => {
      console.log('Now subscribing to from(defer()) observable (1st subscription):');
      fromDeferPromise.subscribe((data) => console.log(`  ✅ Received:`, data));
    }, 100);

    setTimeout(() => {
      console.log('\nSubscribing the second time (new promise created):');
      fromDeferPromise.subscribe((data) => console.log(`  ✅ Received:`, data));
    }, 700);
  }
}
