import { Component } from '@angular/core';
import { from, distinctUntilChanged, distinctUntilKeyChanged } from 'rxjs';

@Component({
  selector: 'app-distinct-until-changed',
  imports: [],
  templateUrl: './distinct-until-changed.html',
  styleUrl: './distinct-until-changed.scss',
})
export class DistinctUntilChanged {
  example1() {
    console.log('Distinct Until Changed Example:');
    const source$ = from([1, 1, 2, 2, 3, 3]);
    source$.pipe(distinctUntilChanged()).subscribe(console.log);
  }

  example2() {
    console.log('Distinct Until Changed with Objects Example:');
    const sampleObject = { name: 'Test' };
    const source2$ = from([sampleObject, sampleObject, sampleObject]);
    source2$.pipe(distinctUntilChanged()).subscribe(console.log);
  }

  example3() {
    console.log('Distinct Until Changed with Different Object References Example:');
    const source3$ = from([{ name: 'Test' }, { name: 'Test' }, { name: 'Test' }]);
    source3$.pipe(distinctUntilChanged()).subscribe(console.log);
  }

  example4() {
    console.log('Distinct Until Changed with Custom Comparator Example:');
    const source4$ = from([
      { name: 'Brian' },
      { name: 'Joe' },
      { name: 'Joe' },
      { name: 'Sue' },
    ]);
    source4$
      .pipe(distinctUntilChanged((prev, curr) => prev.name === curr.name))
      .subscribe(console.log);
  }

  example5() {
    console.log('Distinct Until Key Changed Example:');
    const source3$ = from([{ name: 'Test' }, { name: 'Test' }, { name: 'Test' }]);
    source3$.pipe(distinctUntilKeyChanged('name')).subscribe(console.log);

    console.log('Distinct Until Key Changed Example with Different Object References:');
    const source4$ = from([
      { name: 'Brian' },
      { name: 'Joe' },
      { name: 'Joe' },
      { name: 'Sue' },
    ]);
    source4$.pipe(distinctUntilKeyChanged('name')).subscribe(console.log);
  }
}
