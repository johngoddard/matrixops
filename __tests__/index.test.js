const operator = require('../src/index.js');

test('#add adds a matrix to a scalar', () => {
  expect(operator.add([[1,2],[3,4]], 5)).toEqual([[6,7],[8,9]]);
});

test('#add adds a matrix to a scalar', () => {
  expect(operator.add(5, [[1,2],[3,4]])).toEqual([[6,7],[8,9]]);
});

test('#add adds matrices', () => {
  expect(operator.add([[1,2],[3,4]], [[1,2],[3,4]])).toEqual([[2,4],[6,8]]);
});

test('#add adds vectors', () => {
  expect(operator.add([1,2],[3,4])).toEqual([4, 6]);
});

test('#multiply multiplies a matrix and scalar', () => {
  expect(operator.multiply([[1,2],[3,4]], 2)).toEqual([[2,4],[6,8]]);
});

test('#multiply multiplies matrices', () => {
  expect(operator.multiply([[1,2,3],[4,5,6]], [[1,2],[3,4],[5,6]])).toEqual([[22,28],[49,64]]);
});

test('#multiply multiplies a matrix and a vector', () => {
  expect(operator.multiply([[1,2,3],[4,5,6]], [[1],[2],[3]])).toEqual([[14], [32]]);
});

test('#multiply multiplies a vector and a matrix', () => {
  expect(operator.multiply([1,2], [[1,2],[3,4]])).toEqual([7, 10]);
});

test('#multiply multiplies vectors', () => {
  expect(operator.multiply([1,2,3], [[1],[2],[3]])).toEqual([14]);
});

test('#elementTransform pointwise multiplication matrix', () => {
  expect(operator.elementTransform([[1,2],[3,4]], el => el * 2)).toEqual([[2,4],[6,8]]);
});

test('#elementTransform pointwise multiplication matrix - with indexes', () => {
  expect(operator.elementTransform([[1,2],[3,4]], (el, row, col) => (el * 2 + col + row))).toEqual([[2,5],[7,10]]);
});

test('#elementTransform pointwise multiplication vector', () => {
  expect(operator.elementTransform([1,2,3], el => el * 2)).toEqual([2,4,6]);
});

test('#elementTransform pointwise multiplication vector - with index', () => {
  expect(operator.elementTransform([1,2,3], (el, idx) => el * 2 + idx)).toEqual([2,5,8]);
});

test('#elementTransform pointwise raising matrix', () => {
  expect(operator.elementTransform([[1,2],[3,4]], el => Math.pow(el, 2))).toEqual([[1,4],[9,16]]);
});

test('#elementTransform pointwise raising matrix', () => {
  expect(operator.elementTransform([[1,2],[3,4]], el => Math.pow(el, 2))).toEqual([[1,4],[9,16]]);
});

test('#matrixElementCalc (deprecated) 2 matrix pointwise multiplication', () => {
  expect(operator.matrixElementCalc([[1,2],[3,4]], [[1,2],[3,4]], (el1, el2) => el1 * el2)).toEqual([[1,4],[9,16]]);
});

test('#matrixElementCalc (deprecated) 2 matrix pointwise multiplication - with index', () => {
  expect(operator.matrixElementCalc([[1,2],[3,4]], [[1,2],[3,4]], (el1, el2, row, col) => el1 * el2 + row + col)).toEqual([[1,5],[10,18]]);
});

test('#matrixElementCalc (deprecated) 2 vector pointwise multiplication', () => {
  expect(operator.matrixElementCalc([1,2,3], [1,2,3], (el1, el2) => el1 * el2)).toEqual([1,4,9]);
});

test('#matrixElementCalc (deprecated) 2 vector pointwise multiplication - with index', () => {
  expect(operator.matrixElementCalc([1,2,3], [1,2,3], (el1, el2, idx) => el1 * el2 + idx)).toEqual([1,5,11]);
});

test('#elByElCalc 2 matrix pointwise multiplication', () => {
  expect(operator.elByElCalc([[1,2],[3,4]], [[1,2],[3,4]], (el1, el2) => el1 * el2)).toEqual([[1,4],[9,16]]);
});

test('#elByElCalc 2 matrix pointwise multiplication - with index', () => {
  expect(operator.elByElCalc([[1,2],[3,4]], [[1,2],[3,4]], (el1, el2, row, col) => el1 * el2 + row + col)).toEqual([[1,5],[10,18]]);
});

test('#elByElCalc 2 vector pointwise multiplication', () => {
  expect(operator.elByElCalc([1,2,3], [1,2,3], (el1, el2) => el1 * el2)).toEqual([1,4,9]);
});

test('#elByElCalc 2 vector pointwise multiplication - with index', () => {
  expect(operator.elByElCalc([1,2,3], [1,2,3], (el1, el2, idx) => el1 * el2 + idx)).toEqual([1,5,11]);
});

test('#subtract subtracts a scalar from a matrix', () => {
  expect(operator.subtract([[1,2],[3,4]], 5)).toEqual([[-4,-3],[-2, -1]]);
});

test('#subtract subtracts matrices', () => {
  expect(operator.subtract([[1,2],[3,4]], [[1,2],[3,4]])).toEqual([[0,0],[0,0]]);
});

test('#subtract subtracts vectors', () => {
  expect(operator.subtract([3,4],[1,2])).toEqual([2, 2]);
});

test('#subtract subtracts column vectors', () => {
  expect(operator.subtract([[3],[7]], [[5],[12]])).toEqual([[-2], [-5]]);
});

test('#transpose transpose vector', () => {
  expect(operator.transpose([1,2,3])).toEqual([[1],[2],[3]]);
});

test('#transpose transpose matrix', () => {
  expect(operator.transpose([[1,2],[3,4],[5,6]])).toEqual([[1,3,5],[2,4,6]]);
});

test('#zeroes create zeroes matrix', () => {
  expect(operator.zeroes(2, 3)).toEqual([[0,0,0],[0,0,0]]);
});

test('#zeroes create zeroes matrix, 1 arg', () => {
  expect(operator.zeroes(2)).toEqual([[0],[0]]);
});

test('#ones create ones matrix', () => {
  expect(operator.ones(2, 3)).toEqual([[1,1,1],[1,1,1]]);
});

test('#ones create ones matrix, 1 arg', () => {
  expect(operator.ones(2)).toEqual([[1],[1]]);
});

test('#indentity creates identityMatrix matrix with 1 row', () => {
  expect(operator.identity(1)).toEqual([[1]]);
});

test('#indentity creates identityMatrix matrix with multiple rows', () => {
  expect(operator.identity(3)).toEqual([[1,0,0],[0,1,0],[0,0,1]]);
});

test('#equals returns true for equal vectors', () => {
  expect(operator.equals([1,2,3], [1,2,3])).toBe(true);
});

test('#equals returns false for non equal vectors', () => {
  expect(operator.equals([1,2,4], [1,2,3])).toBe(false);
});

test('#equals returns true for equal matrices', () => {
  expect(operator.equals([[1,2,3], [4,5,6]], [[1,2,3], [4,5,6]])).toBe(true);
});

test('#equals returns false for non equal matrices', () => {
  expect(operator.equals([[1,2,4], [4,5,6]], [[1,2,3], [4,5,6]])).toBe(false);
});

test('#rowMeans returns the means of the rows of a matrix', () => {
  expect(operator.rowMeans([[1,2,3], [1,2,3], [1,2,3]])).toEqual([2,2,2]);
});

test('#colMeans returns the means of the columns of a matrix', () => {
  expect(operator.colMeans([[1,2,3], [1,2,3], [1,2,3]])).toEqual([1,2,3]);
});

test('#rowStdDevs returns the means of the rows of a matrix', () => {
  expect(operator.rowStdDevs([[1,5], [9,13]])).toEqual([2,2]);
});

test('#colStdDevs returns the means of the columns of a matrix', () => {
  expect(operator.colStdDevs([[1,9], [7,15]])).toEqual([3,3]);
});
