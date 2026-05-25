import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  readonly navLinks = [
    { path: 'intro', label: 'Intro' },
    { path: 'distinct-until-changed', label: 'distinctUntilChanged' },
    { path: 'share-replay', label: 'shareReplay' },
    { path: 'chain-vs-next', label: 'Chain vs Next' },
    { path: 'cleanup', label: 'Cleanup' },
    { path: 'filter-boolean', label: 'Filter Boolean' },
    { path: 'from-defer', label: 'fromDefer' },
    { path: 'map-vs-array', label: 'Map vs Array' },
    { path: 'switch-map', label: 'switchMap' },
    { path: 'time-operators', label: 'Time Operators' },
  ];
}
