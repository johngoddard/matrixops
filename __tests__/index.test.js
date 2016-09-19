const operator = require('../src/index.js');

test('adds a matrix to a scalar', () => {
  expect(operator.add([[1,2],[3,4]], 5).toString()).toBe([[6,7],[8,9]].toString());
});

test('adds a matrix to a scalar', () => {
  expect(operator.add(5, [[1,2],[3,4]]).toString()).toBe([[6,7],[8,9]].toString());
});

test('adds matrices', () => {
  expect(operator.add([[1,2],[3,4]], [[1,2],[3,4]]).toString()).toBe([[2,4],[6,8]].toString());
});

test('adds vectors', () => {
  expect(operator.add([1,2],[3,4]).toString()).toBe([4, 6].toString());
});

test('multiplies a matrix and scalar', () => {
  expect(operator.multiply([[1,2],[3,4]], 2).toString()).toBe([[2,4],[6,8]].toString());
});

test('multiplies matrices', () => {
  expect(operator.multiply([[1,2,3],[4,5,6]], [[1,2],[3,4],[5,6]]).toString()).toBe([[22,28],[49,64]].toString());
});

test('multiplies a matrix and a vector', () => {
  expect(operator.multiply([[1,2,3],[4,5,6]], [1,2,3]).toString()).toBe([14, 32].toString());
});

test('multiplies a vector and a matrix', () => {
  expect(operator.multiply([1,2], [[1,2],[3,4]]).toString()).toBe([7, 10].toString());
});

test('multiplies vectors', () => {
  expect(operator.multiply([1,2,3], [[1],[2],[3]]).toString()).toBe([14].toString());
});

test('pointwise multiplication matrix', () => {
  expect(operator.elementTransform([[1,2],[3,4]], el => el * 2).toString()).toBe([[2,4],[6,8]].toString());
});

test('pointwise multiplication vector', () => {
  expect(operator.elementTransform([1,2,3], el => el * 2).toString()).toBe([2,4,6].toString());
});

test('pointwise raising matrix', () => {
  expect(operator.elementTransform([[1,2],[3,4]], el => Math.pow(el, 2)).toString()).toBe([[1,4],[9,16]].toString());
});

test('2 matrix pointwise multiplication', () => {
  expect(operator.matrixElementCalc([[1,2],[3,4]], [[1,2],[3,4]], (el1, el2) => el1 * el2).toString()).toBe([[1,4],[9,16]].toString());
});

test('2 vector pointwise multiplication', () => {
  expect(operator.matrixElementCalc([1,2,3], [1,2,3], (el1, el2) => el1 * el2).toString()).toBe([1,4,9].toString());
});


test('subtracts a scalar from a matrix', () => {
  expect(operator.subtract([[1,2],[3,4]], 5).toString()).toBe([[-4,-3],[-2, -1]].toString());
});

test('subtracts matrices', () => {
  expect(operator.subtract([[1,2],[3,4]], [[1,2],[3,4]]).toString()).toBe([[0,0],[0,0]].toString());
});

test('subtracts vectors', () => {
  expect(operator.subtract([3,4],[1,2]).toString()).toBe([2, 2].toString());
});
