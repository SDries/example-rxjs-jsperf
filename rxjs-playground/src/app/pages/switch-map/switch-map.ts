import {Component, DestroyRef} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {interval, Subject, switchMap} from 'rxjs';
import {NgIf} from '@angular/common';


@Component({
  selector: 'app-test',
  template: '<button (click)="testSubject.next({})">start</button>',
  standalone: true,
})
export class TestComponent {
  public testSubject = new Subject();

  public constructor(private destroyRef: DestroyRef) {
    this.testSubject
      .pipe(
        switchMap((_) => interval(1000)),
        takeUntilDestroyed(destroyRef)
      )
      .subscribe((x) => console.log('no leak', x));
    this.testSubject
      .pipe(
        takeUntilDestroyed(destroyRef),
        switchMap((_) => interval(1000))
      )
      .subscribe((x) => console.log('leak', x));
  }
}

@Component({
  selector: 'app-switch-map',
  imports: [
    TestComponent,
    NgIf
  ],
  templateUrl: './switch-map.html',
  styleUrl: './switch-map.scss',
})
export class SwitchMap {
  show = true;
}

