# gulp-flatten-json
A gulp plugin for transforming json files to flattened version

## example
src/sample.json
```json
{
  "a": 1,
  "b": {
    "c": {
      "d": 2
    }
  }
}
```
```js
const gulp = require('gulp');
const gulpFlattenJson = require('gulp-flatten-json');
gulp.src('src/sample.json')
    .pipe(gulpFlattenJson())
    .pipe(gulp.dest('out'))
```
out/sample.json
```json
{
  "a": 1,
  "b.c.d": 2
}
```
