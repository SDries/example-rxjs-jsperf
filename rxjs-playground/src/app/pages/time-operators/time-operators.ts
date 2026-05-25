import { Component } from '@angular/core';
import { interval, take, auditTime, debounceTime, throttleTime, sampleTime } from 'rxjs';

@Component({
  selector: 'app-time-operators',
  imports: [],
  templateUrl: './time-operators.html',
  styleUrl: './time-operators.scss',
})
export class TimeOperators {
  private createTimeTracker(operatorName: string) {
    console.log(`\n=== ${operatorName} (300ms) ===`);
    const startTime = performance.now();

    return {
      onNext: (v: number) => {
        const elapsed = performance.now() - startTime;
        console.log(`${operatorName}: ${elapsed.toFixed(2)}ms, value: ${v}`);
      },
      onComplete: () => {
        const totalTime = performance.now() - startTime;
        console.log(`${operatorName} completed. Total time: ${totalTime.toFixed(2)}ms`);
      }
    };
  }

  noOperatorExample() {
    const tracker = this.createTimeTracker('No Operator (Raw Stream)');
    interval(100)
      .pipe(take(10))
      .subscribe({
        next: tracker.onNext,
        complete: () => tracker.onComplete()
      });
  }

  // behaves in a similar way to the trailing throttleTime, but note that it won't emit a value from the last time window if the source has completed
  auditTimeExample() {
    const tracker = this.createTimeTracker('auditTime');
    interval(100)
      .pipe(
        take(10),
        auditTime(300)
      )
      .subscribe({
        next: tracker.onNext,
        complete: () => tracker.onComplete()
      });
  }

  // will emit a value from the source stream only if a given time has passed without source producing more values
  debounceTimeExample() {
    const tracker = this.createTimeTracker('debounceTime');
    interval(100)
      .pipe(
        take(10),
        debounceTime(300)
      )
      .subscribe({
        next: tracker.onNext,
        complete: () => tracker.onComplete()
      });
  }

  // will start a timer when the source emits. It can be set to emit the first and/or the last value in the given time window. Then it repeats this procedure
  throttleTimeExample() {
    const tracker = this.createTimeTracker('throttleTime');
    interval(100)
      .pipe(
        take(10),
        throttleTime(300)
      )
      .subscribe({
        next: tracker.onNext,
        complete: () => tracker.onComplete()
      });
  }

  // simply emits a value from the source in a given time window if the source actually emitted
  sampleTimeExample() {
    const tracker = this.createTimeTracker('sampleTime');
    interval(100)
      .pipe(
        take(10),
        sampleTime(300)
      )
      .subscribe({
        next: tracker.onNext,
        complete: () => tracker.onComplete()
      });
  }
}
