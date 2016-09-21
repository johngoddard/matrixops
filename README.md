#MatrixOps

MatrixOps is an npm package that makes performing matrix operations on 2 dimensional JavaScript arrays simple.

## Usage
### #add

Accepts 2-dimensional arrays, 1-dimensional arrays, and numbers, and adds them together, returning a new array.

```JavaScript
  const MatrixOps = require('matrixops');

  MatrixOps.add([[1,2],[3,4]], 5);
  // => [[6,7],[8,9]]

  MatrixOps.add([[1,2],[3,4]], [[1,2],[3,4]]);
  // => [[2,4],[6,8]]
```

### #subtract

Accepts 2-dimensional arrays, 1-dimensional arrays, and numbers, and subtracts the second argument from the first, returning a new array.

```JavaScript
  MatrixOps.subtract([[1,2],[3,4]], [[1,2],[3,4]]);
  // => [[0,0],[0,0]]

  MatrixOps.subtract([3,4],[1,2]);
  // => [2, 2]
```

### #multiply

2-dimensional arrays, 1-dimensional arrays, and numbers, and multiplies them together, returning a new array.

```JavaScript
  MatrixOps.multiply([[1,2,3],[4,5,6]], [[1,2],[3,4],[5,6]]);
  // => [[22, 28], [49,64]]

  MatrixOps.multiply([[1,2,3],[4,5,6]], [[1],[2],[3]]);
  // => [[14], [32]]

  MatrixOps.multiply([[1,2],[3,4]], 2);
  // => [[2,4],[6,8]]
```

### #transpose

Accepts a 1 or 2 dimensional array and returns the transpose.

```JavaScript
  MatrixOps.transpose([1,2,3]);
  // => [[1],[2],[3]]

  MatrixOps.transpose([[[1,2],[3,4],[5,6]]);
  // => [[1,3,5],[2,4,6]]
```

### #elementTransform

Accepts a 1 or multi-dimensional array and a callback function, and applies the callback to every element of the array. The callback function accepts up to 3 arguments: the element, the row index, and the column index.

```JavaScript
  MatrixOps.elementTransform([[1,2],[3,4]], el => el * 2);
  // => [[2,4],[6,8]]

  MatrixOps.elementTransform([[1,2],[3,4]], el => Math.pow(el, 2));
  // => [[1,4],[9,16]]

  MatrixOps.elementTransform([[1,2],[3,4]], (el, row, col) => {
    return el * 2 + col + row;
  });
  // => [[2,5],[7,10]]
```

### #matrixElementCalc

Accepts 2 arrays with the same dimensions and a callback, and applies the callback to pairs of elements at the same indices in the two arrays.The callback function accepts up to 4 arguments: the matrix 1 element at the position, the matrix 2 element at the position, the row index, and the column index.

```JavaScript
  MatrixOps.matrixElementCalc([[1,2],[3,4]], [[1,2],[3,4]], (el1, el2) => el1 * el2);
  // => [[1,4],[9,16]]

  MatrixOps.matrixElementCalc([1,2,3], [1,2,3], (el1, el2) => el1 * el2);
  // => [[1,4,9]

  MatrixOps.matrixElementCalc([[1,2],[3,4]], [[1,2],[3,4]], (el1, el2, row, col) => {
    return el1 * el2 + row + col;
  });
  // => [[1,5],[10,18]]
```

### #zeroes

Accepts 1 or 2 numbers and returns an array of zeroes with the specified dimensions

```JavaScript
  MatrixOps.zeroes(2, 3);
  // => [[0,0,0],[0,0,0]]

  MatrixOps.zeroes(2));
  // => [[0],[0]]
```

### #ones

Accepts 1 or 2 numbers and returns an array of ones with the specified dimensions

```JavaScript
  MatrixOps.ones(2, 3);
  // => [[1,1,1],[1,1,1]]

  MatrixOps.ones(2));
  // => [[1],[1]]
```

### #identity

Accepts a number n and returns an n x n identity matrix

```JavaScript
  MatrixOps.identity(3);
  // => [[1,0,0],[0,1,0],[0,0,1]]
```
