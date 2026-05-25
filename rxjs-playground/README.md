# RxjsPlayground

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.1.4.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.


# Presentation notes/brain-dump

## intro
- of
- from
- interval
## cleanup + switch-map
- shareReplay skippen, aparte pagina
## filter + distinctUntilChanged + time operators + from defer
- zelf nog geen use case voor from-defer

## chain v next
- meh
## share replay
- publish
  - source will not emit values until connect() is called
- multicast
  - side effects will be executed once
  - source will not emit values until connect() is called
- share
  - geen caching (dus late subscribers krijgen niks)
  - side effects will be executed once
- shareReplay()
  - late subscribers get all of cache
- shareReplay(1)
  - late subscribers get last result
- shareReplay({ bufferSize: 1, refCount: true })
  - refCount: true zorgt ervoor dat de source alleen blijft subscriben zolang er subscribers zijn
- shareReplay({ bufferSize: 1, refCount: false })
## map v array
