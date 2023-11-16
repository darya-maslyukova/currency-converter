# Converter

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.12.


Header з курсом валют

У header-і необхідно відображати актуальний курс валют (USD, EUR) по відношенню до гривні (UAH)
Актуальний курс валют приходе публічного API

Компонент із конвертацією

Для однієї валюти є свій input і select.
окремий input+select для першої валюти, і окремий input+select для другої валюти
в input задається число, щоб вказати кількість одиниць для конвертування
у select є не менше трьох валют - UAH, USD, EUR.
конвертація відбувається в обох напрямках
при зміні значення у першій валюті, перераховуєтьсся значення у другій, і навпаки
при зміні валюти в кожному select-і конвертація обох валют перераховувається коректно

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

