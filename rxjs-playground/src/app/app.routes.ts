import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'intro', pathMatch: 'full' },
  {
    path: 'intro',
    loadComponent: () => import('./pages/intro/intro').then(m => m.Intro),
  },
  {
    path: 'distinct-until-changed',
    loadComponent: () =>
      import('./pages/distinct-until-changed/distinct-until-changed').then(
        m => m.DistinctUntilChanged
      ),
  },
  {
    path: 'share-replay',
    loadComponent: () =>
      import('./pages/share-replay/share-replay').then(m => m.ShareReplay),
  },
  {
    path: 'chain-vs-next',
    loadComponent: () =>
      import('./pages/chain-vs-next/chain-vs-next').then(m => m.ChainVsNext),
  },
  {
    path: 'cleanup',
    loadComponent: () =>
      import('./pages/cleanup/cleanup').then(m => m.Cleanup),
  },
  {
    path: 'filter-boolean',
    loadComponent: () =>
      import('./pages/filter-boolean/filter-boolean').then(m => m.FilterBoolean),
  },
  {
    path: 'from-defer',
    loadComponent: () =>
      import('./pages/from-defer/from-defer').then(m => m.FromDefer),
  },
  {
    path: 'map-vs-array',
    loadComponent: () =>
      import('./pages/map-vs-array/map-vs-array').then(m => m.MapVsArray),
  },
  {
    path: 'switch-map',
    loadComponent: () =>
      import('./pages/switch-map/switch-map').then(m => m.SwitchMap),
  },
  {
    path: 'time-operators',
    loadComponent: () =>
      import('./pages/time-operators/time-operators').then(m => m.TimeOperators),
  },
];
