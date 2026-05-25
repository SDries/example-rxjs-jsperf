import { Component } from '@angular/core';
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
} from 'rxjs';

@Component({
  selector: 'app-cleanup',
  imports: [],
  templateUrl: './cleanup.html',
  styleUrl: './cleanup.scss',
})
export class Cleanup {
  example1() {
    console.log('\n' + '='.repeat(60));
    console.log('Example 1: Basic unsubscribe()');
    console.log('='.repeat(60));
    const subscription = interval(200).subscribe((x) =>
      console.log('  Interval value:', x),
    );

    setTimeout(() => {
      console.log('  Unsubscribing...');
      subscription.unsubscribe();
      console.log('  Unsubscribed!');
    }, 1000);
  }

  example2() {
    console.log('\n' + '='.repeat(60));
    console.log('Example 2: Using take() for automatic cleanup');
    console.log('='.repeat(60));
    interval(300)
      .pipe(take(5))
      .subscribe({
        next: (x) => console.log('  Value:', x),
        error: (error) => console.error('  Error:', error),
        complete: () => console.log('  Completed (auto unsubscribed)'),
      });
  }

  example3() {
    console.log('\n' + '='.repeat(60));
    console.log('Example 3: Using takeUntil() with Subject');
    console.log('='.repeat(60));
    const destroy$ = new Subject<void>();

    interval(200)
      .pipe(takeUntil(destroy$))
      .subscribe({
        next: (x) => console.log('  Observable value:', x),
        error: (error) => console.error('  Error:', error),
        complete: () => console.log('  Completed'),
      });

    setTimeout(() => {
      console.log('  Triggering destroy signal...');
      destroy$.next();
      destroy$.complete();
      console.log('  Unsubscribed!');
    }, 1200);
  }

  example4() {
    console.log('\n' + '='.repeat(60));
    console.log('Example 4: Using finalize() to run action on unsubscribe');
    console.log('='.repeat(60));
    const sub4 = interval(200)
      .pipe(
        finalize(() => {
          console.log('  Finalize: Cleanup executed on unsubscribe!');
        }),
      )
      .subscribe({
        next: (x) => console.log('  Value:', x),
        complete: () => console.log('  Completed'),
      });

    setTimeout(() => {
      sub4.unsubscribe(); // finalize() will be called here
    }, 1000);
  }

  example5() {
    console.log('\n' + '='.repeat(60));
    console.log('Example 5: takeUntil first vs last');
    console.log('='.repeat(60));

    let destroySubject = new Subject<void>();

    of(1)
      .pipe(takeUntil(destroySubject), delay(2000))
      .subscribe({
        next: (x) => console.log('takeUntil first ', x),
        complete: () => console.log(' takeUntil first complete')
      });
    of(1)
      .pipe(delay(2000), takeUntil(destroySubject))
      .subscribe({
        next: (x) => console.log('takeUntil last ', x),
        complete: () => console.log('takeUntil last complete')
      });

    setTimeout(() => {
      console.log('  Emitting destroy to trigger takeUntil');
      destroySubject.next();
      destroySubject.complete();
    }, 1000);
  }

  example6() {
    console.log('\n' + '='.repeat(60));
    console.log('Example 6: Using shareReplay(1) - Proper subscription management');
    console.log('='.repeat(60));

    // Create the observable with shareReplay(1) - this shares and caches the value
    const memoryCache = new Map<number, Observable<number>>();

    function getCounterFromMemory(id: number): Observable<number> {
      if (!memoryCache.has(id)) {
        const obs$ = interval(200).pipe(
          startWith(-1),
          tap((c) => console.log('  counting for :', id, c)),
          shareReplay(1),
        );
        memoryCache.set(id, obs$);
        return obs$;
      }
      return memoryCache.get(id)!;
    }

    const sub = getCounterFromMemory(1).subscribe((value) => {
      console.log('  Subscription 1 received:', value);
    });

    setTimeout(() => {
      sub.unsubscribe();

      const sub2 = getCounterFromMemory(2).subscribe((value) => {
        console.log('  Subscription 2 received:', value);
      });

      setTimeout(() => {
        sub2.unsubscribe();

        const sub3 = getCounterFromMemory(1).subscribe((value) => {
          console.log('  Subscription 3 received:', value);
        });

        setTimeout(() => {
          sub3.unsubscribe();
        }, 500);
      }, 500);
    }, 500);
  }
}
