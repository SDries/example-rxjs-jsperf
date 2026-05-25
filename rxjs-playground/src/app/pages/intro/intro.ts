import { Component } from '@angular/core';
import { filter, from, interval, map, of, take, tap } from 'rxjs';

@Component({
  selector: 'app-intro',
  imports: [],
  templateUrl: './intro.html',
  styleUrl: './intro.scss',
})
export class Intro {
  example1() {
    console.log("Basic RxJS example of([1, 2, 3, 4, 5]):");
    of([1, 2, 3, 4, 5]).subscribe(console.log);
  }

  example2() {
    console.log("Basic RxJS example from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]):");
    from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).subscribe(console.log);
  }

  example3() {
    console.log("map + 2 and filter > 5:");
    from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
      .pipe(
        map((x) => x + 2),
        tap((x) => console.log("Mapped value:", x)),
        filter((x) => x > 5),
      )
      .subscribe(console.log);
  }

  example4() {
    console.log("Interval value each 100ms and 150ms:");
    interval(100)
      .pipe(take(10))
      .subscribe((x) => console.log("100ms", x));
    console.log("Interval value each 150ms:");
    interval(150)
      .pipe(take(10))
      .subscribe((x) => console.log("150ms", x));
  }
}
