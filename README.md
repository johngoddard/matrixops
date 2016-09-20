#MatrixOps

MatrixOps is an npm packgage that makes performing matrix operations on 2 dimensional JavaScript.

## Usage
### #add

Accepts 2-dimensional arrays, 1-dimensional arrays, and numbers, and adds them together, returning a new array.

```JavaScript
  const operator = require('matrixops');

  operator.add([[1,2],[3,4]], 5);
  // => [[6,7],[8,9]]

  operator.add([[1,2],[3,4]], [[1,2],[3,4]]);
  // => [[2,4],[6,8]]
```

### #subtract

Accepts 2-dimensional arrays, 1-dimensional arrays, and numbers, and subtracts the second argument from the first, returning a new array.

```JavaScript
  operator.subtract([[1,2],[3,4]], [[1,2],[3,4]]);
  // => [[0,0],[0,0]]

  operator.subtract([3,4],[1,2]);
  // => [2, 2]
```

### #multiply

2-dimensional arrays, 1-dimensional arrays, and numbers, and multiplies them together, returning a new array.

```JavaScript
  operator.multiply([[1,2,3],[4,5,6]], [[1,2],[3,4],[5,6]]);
  // => [[22, 28], [49,64]]

  operator.multiply([[1,2,3],[4,5,6]], [[1],[2],[3]]);
  // => [[14], [32]]

  operator.multiply([[1,2],[3,4]], 2);
  // => [[2,4],[6,8]]
```

### #transpose

Accepts a 1 or 2 dimensional array and returns the transpose.

```JavaScript
  operator.transpose([1,2,3]);
  // => [[1],[2],[3]]

  operator.transpose([[[1,2],[3,4],[5,6]]);
  // => [[1,3,5],[2,4,6]]
```

### #elementTransform

Accepts a 1 or dimensional array and a callback function, and applies the callback to every element of the array.

```JavaScript
  operator.elementTransform([[1,2],[3,4]], el => el * 2);
  // => [[2,4],[6,8]]

  operator.elementTransform([[1,2],[3,4]], el => Math.pow(el, 2));
  // => [[1,4],[9,16]]
```

### #matrixElementCalc

Accepts 2 arrays with the same dimensions and a callback, and applies the callback pairs of elements at the same indices in the two arrays.

```JavaScript
  operator.matrixElementCalc([[1,2],[3,4]], [[1,2],[3,4]], (el1, el2) => el1 * el2);
  // => [[1,4],[9,16]]

  operator.matrixElementCalc([1,2,3], [1,2,3], (el1, el2) => el1 * el2);
  // => [[1,4,9]
```

### #zeroes

Accepts 1 or 2 numbers and returns an array of zeroes with the specified dimensions

```JavaScript
  operator.zeroes(2, 3);
  // => [[0,0,0],[0,0,0]]

  operator.zeroes(2));
  // => [[0],[0]]
```
