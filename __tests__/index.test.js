const operator = require('../src/index.js');

test('adds a matrix to a scalar', () => {
  expect(operator.add([[1,2],[3,4]], 5)).toEqual([[6,7],[8,9]]);
});

test('adds a matrix to a scalar', () => {
  expect(operator.add(5, [[1,2],[3,4]])).toEqual([[6,7],[8,9]]);
});

test('adds matrices', () => {
  expect(operator.add([[1,2],[3,4]], [[1,2],[3,4]])).toEqual([[2,4],[6,8]]);
});

test('adds vectors', () => {
  expect(operator.add([1,2],[3,4])).toEqual([4, 6]);
});

test('multiplies a matrix and scalar', () => {
  expect(operator.multiply([[1,2],[3,4]], 2)).toEqual([[2,4],[6,8]]);
});

test('multiplies matrices', () => {
  expect(operator.multiply([[1,2,3],[4,5,6]], [[1,2],[3,4],[5,6]])).toEqual([[22,28],[49,64]]);
});

test('multiplies a matrix and a vector', () => {
  expect(operator.multiply([[1,2,3],[4,5,6]], [[1],[2],[3]])).toEqual([[14], [32]]);
});

test('multiplies a vector and a matrix', () => {
  expect(operator.multiply([1,2], [[1,2],[3,4]])).toEqual([7, 10]);
});

test('multiplies vectors', () => {
  expect(operator.multiply([1,2,3], [[1],[2],[3]])).toEqual([14]);
});

test('pointwise multiplication matrix', () => {
  expect(operator.elementTransform([[1,2],[3,4]], el => el * 2)).toEqual([[2,4],[6,8]]);
});

test('pointwise multiplication matrix - with indexes', () => {
  expect(operator.elementTransform([[1,2],[3,4]], (el, row, col) => (el * 2 + col + row))).toEqual([[2,5],[7,10]]);
});

test('pointwise multiplication vector', () => {
  expect(operator.elementTransform([1,2,3], el => el * 2)).toEqual([2,4,6]);
});

test('pointwise multiplication vector - with index', () => {
  expect(operator.elementTransform([1,2,3], (el, idx) => el * 2 + idx)).toEqual([2,5,8]);
});

test('pointwise raising matrix', () => {
  expect(operator.elementTransform([[1,2],[3,4]], el => Math.pow(el, 2))).toEqual([[1,4],[9,16]]);
});

test('2 matrix pointwise multiplication', () => {
  expect(operator.matrixElementCalc([[1,2],[3,4]], [[1,2],[3,4]], (el1, el2) => el1 * el2)).toEqual([[1,4],[9,16]]);
});

test('2 matrix pointwise multiplication - with index', () => {
  expect(operator.matrixElementCalc([[1,2],[3,4]], [[1,2],[3,4]], (el1, el2, row, col) => el1 * el2 + row + col)).toEqual([[1,5],[10,18]]);
});

test('2 vector pointwise multiplication', () => {
  expect(operator.matrixElementCalc([1,2,3], [1,2,3], (el1, el2) => el1 * el2)).toEqual([1,4,9]);
});

test('2 vector pointwise multiplication - with index', () => {
  expect(operator.matrixElementCalc([1,2,3], [1,2,3], (el1, el2, idx) => el1 * el2 + idx)).toEqual([1,5,11]);
});

test('pointwise raising matrix', () => {
  expect(operator.elementTransform([[1,2],[3,4]], el => Math.pow(el, 2))).toEqual([[1,4],[9,16]]);
});


test('subtracts a scalar from a matrix', () => {
  expect(operator.subtract([[1,2],[3,4]], 5)).toEqual([[-4,-3],[-2, -1]]);
});

test('subtracts matrices', () => {
  expect(operator.subtract([[1,2],[3,4]], [[1,2],[3,4]])).toEqual([[0,0],[0,0]]);
});

test('subtracts vectors', () => {
  expect(operator.subtract([3,4],[1,2])).toEqual([2, 2]);
});

test('subtracts column vectors', () => {
  expect(operator.subtract([[3],[7]], [[5],[12]])).toEqual([[-2], [-5]]);
});

test('transpose vector', () => {
  expect(operator.transpose([1,2,3])).toEqual([[1],[2],[3]]);
});

test('transpose matrix', () => {
  expect(operator.transpose([[1,2],[3,4],[5,6]])).toEqual([[1,3,5],[2,4,6]]);
});

test('create zeroes matrix', () => {
  expect(operator.zeroes(2, 3)).toEqual([[0,0,0],[0,0,0]]);
});

test('create zeroes matrix, 1 arg', () => {
  expect(operator.zeroes(2)).toEqual([[0],[0]]);
});

test('create ones matrix', () => {
  expect(operator.ones(2, 3)).toEqual([[1,1,1],[1,1,1]]);
});

test('create ones matrix, 1 arg', () => {
  expect(operator.ones(2)).toEqual([[1],[1]]);
});

test('creates identityMatrix matrix with 1 row', () => {
  expect(operator.identity(1)).toEqual([[1]]);
});

test('creates identityMatrix matrix with multiple rows', () => {
  expect(operator.identity(3)).toEqual([[1,0,0],[0,1,0],[0,0,1]]);
});
