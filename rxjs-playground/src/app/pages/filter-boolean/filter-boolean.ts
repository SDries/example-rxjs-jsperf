import { Component } from '@angular/core';
import { from, filter, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-filter-boolean',
  imports: [],
  templateUrl: './filter-boolean.html',
  styleUrl: './filter-boolean.scss',
})
export class FilterBoolean {
  private booleans = [true,
    true,
    false,
    false,
    true,
    true,
    false,
    true,
    false,
    false,
    true];

  example1() {
    console.log('\n' + '='.repeat(60));
    console.log('Example 1: Filter Even Numbers');
    console.log('='.repeat(60));
    const source = from([1, 2, 3, 4, 5]);
    const example = source.pipe(filter((num) => num % 2 === 0));
    example.subscribe((val) => console.log('  Even number:', val));
  }

  example2() {
    console.log('\n' + '='.repeat(60));
    console.log('Example 2: Filter Boolean Values');
    console.log('='.repeat(60));
    const source$ = from(this.booleans);
    source$
      .pipe(filter((value) => value))
      .subscribe((val) => console.log('  Filtered true:', val));
  }

  // order of filter & distinctUntilChanged is important (ex 3 & 4) >> likely not what you want
  example3() {
    console.log('\n' + '='.repeat(60));
    console.log('Example 3: Filter with Distinct Until Changed');
    console.log('='.repeat(60));
    const source2$ = from(this.booleans);
    source2$
      .pipe(
        filter((value) => value),
        distinctUntilChanged(),
      )
      .subscribe((val) => console.log('  Filtered and distinct:', val));
  }

  example4() {
    console.log('\n' + '='.repeat(60));
    console.log('Example 4: Emit When Changes to True');
    console.log('='.repeat(60));
    const source3$ = from(this.booleans);
    source3$
      .pipe(
        distinctUntilChanged(),
        filter((value) => value),
      )
      .subscribe((val) => console.log('  Changed to true:', val));
  }
}
