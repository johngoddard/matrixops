const util = require('./util.js');

const matrixElementCalc = (matrix1, matrix2, callback) => {
  let dimMatch = util.verifyDimensions(matrix1, matrix2);

  if(dimMatch && matrix1.every(el => el instanceof Array)){
    let result = [];
    matrix1.forEach((row, rowIdx) => {
      let newRow = row.map((el, colIdx) => {
        return callback(el, matrix2[rowIdx][colIdx], rowIdx, colIdx);
      });
      result.push(newRow);
    });
    return result;
  }else if (dimMatch){
    return matrix1.map((el, idx) => callback(el, matrix2[idx], idx));
  } else{
    throw 'can not peform arithmetic on matrices';
  }
};

const elementTransform = (matrix, callback) => {
  if(matrix.every(el => el instanceof Array)){
    let result = [];
    matrix.forEach((row, rowIdx) => {
      let newRow = row.map((el, colIdx) => callback(el, rowIdx, colIdx));
      result.push(newRow);
    });

    return result;
  } else{
    return matrix.map((el, idx) => callback(el, idx));
  }
};

const add = (arg1, arg2) => {
  if(arg1 instanceof Array && arg2 instanceof Array){
    let dimMatch = util.verifyDimensions(arg1, arg2);

    if(dimMatch && arg1.every(el => el instanceof Array)){
      return matrixElementCalc(arg1, arg2, (el1, el2) => el1 + el2);
    } else if (dimMatch){
      return arg1.map((el, idx) => el + arg2[idx]);
    }
    else{
      throw 'matrices must have matching dimensions';
    }
  } else if (arg1 instanceof Array){
    return elementTransform(arg1, (el1) => el1 + arg2);
  } else if (arg2 instanceof Array) {
    return elementTransform(arg2, (el1) => el1 + arg1);
  } else {
    return arg1 + arg2;
  }
};

const multiply = (arg1, arg2) => {
  if(arg1 instanceof Array && arg2 instanceof Array){
    let dimMatch = util.multDimMatch(arg1, arg2);
    if(dimMatch && arg1.every(el => el instanceof Array) && arg2.every(el => el instanceof Array)){
      let result = [];
      for (let i = 0; i < arg1.length; i++) {
        let resRow = [];
        for(let j = 0; j < arg2[0].length; j++){
          let col = [];
          arg2.forEach(row => {
            col.push(row[j]);
          });
          resRow.push(util.multRowCol(arg1[i], col));
        }
        result.push(resRow);
      }

      return result;
    } else if (dimMatch && arg1.every(el => el instanceof Array)){
      let result = [];

      arg1.forEach(row => {
        result.push([util.multRowCol(row, arg2)]);
      });

      return result;
    } else if (dimMatch && arg2.every(el => el instanceof Array)){
      let result = [];

      for (let i = 0; i < arg2[0].length; i++) {
        let col = [];
        arg2.forEach(row => {
          col.push(row[i]);
        });
        result.push(util.multRowCol(arg1, col));
      }

      return result;
    } else if (dimMatch){
      return util.multRowCol(arg1, arg2);
    } else {
      throw 'matrices can not be multiplied';
    }
  } else if (arg1 instanceof Array){
    return elementTransform(arg1, (el1) => el1 * arg2);
  } else if (arg2 instanceof Array) {
    return elementTransform(arg2, (el1) => el1 * arg1);
  } else if (typeof arg1 === 'number' && typeof arg2 === 'number') {
    return arg1 * arg2;
  } else {
    throw "Arguments cannot be multiplied";
  }
};

const subtract = (arg1, arg2) => {
  let toSubtract;

  if(!(arg1 instanceof Array) && arg2 instanceof Array){
    throw 'cannot not subtract matrix from scalar';
  } else if(arg2 instanceof Array && arg2.every(el => el instanceof Array)){

    toSubtract = elementTransform(arg2, el => -el);
  } else if (arg2 instanceof Array) {
    toSubtract = arg2.map(el => -el);
  } else{
    toSubtract = -arg2;
  }

  return add(arg1, toSubtract);
};

const transpose = matrix => {
  let isMatrix = matrix.every(el => el instanceof Array);

  if(isMatrix){
    let result = [];
    for(let col = 0; col < matrix[0].length; col++){

      let newRow = [];
      for(let row = 0; row < matrix.length; row++){
        newRow.push(matrix[row][col]);
      }
      result.push(newRow);
    }
    return result;
  } else{
    return matrix.map(el => [el]);
  }

};


const valMatrix = (rows, cols, val) => {

  let result = [];

  for(let i = 0; i < rows; i++){
    let newRow = [];
    for(let j = 0; j < cols; j++){
      newRow.push(val);
    }
    result.push(newRow);
  }

  return result;
};

const zeroes = (rows, cols) => {
  const columns = cols || 1;
  return valMatrix(rows, columns, 0);
};

const ones = (rows, cols) => {
  const columns = cols || 1;
  return valMatrix(rows, columns, 1);
};

const identity = num => {
  let identityMatrix = [];
  for(let row = 0; row < num; row++){
    let newRow = [];
    for(let col = 0; col < num; col++){
      let toPush = col === row ? 1 : 0;
      newRow.push(toPush);
    }

    identityMatrix.push(newRow);
  }

  return identityMatrix;
};

const equals = (matrix1, matrix2) => {
  if(!(util.verifyDimensions(matrix1, matrix2))){
    return false;
  }

  let equal = true;

  if(matrix1.every(el => el instanceof Array)){
    matrix1.forEach((row, rowIdx) => {
      row.forEach((el, colIdx) => {
        if(el !== matrix2[rowIdx][colIdx]){
          equal = false;
        }
      });
    });
  } else {
    matrix1.forEach((el, idx) => {
      if(el !== matrix2[idx]){
        equal = false;
      }
    });
  }

  return equal;
};

const rowMeans = matrix => {
  return _getMeans(matrix);
};

const colMeans = matrix => {
  return _getMeans(transpose(matrix));
};

const _getMeans = matrix => {
  const means = [];
  matrix.forEach(row => {
    if(!(row instanceof Array)){
      throw 'can only calculate means for matrices';
    }
    means.push(row.reduce((pre, curr) => pre + curr, 0) / row.length);
  });

  return means;
};

const rowStdDevs = matrix => {
  return _getStdDevs(matrix);
};

const colStdDevs = matrix => {
  return _getStdDevs(transpose(matrix));
};

const _getStdDevs = matrix => {
  const stdDevs = [];
  const means = rowMeans(matrix);

  matrix.forEach((row, idx) => {
    if(!(row instanceof Array)){
      throw 'can only calculate means for matrices';
    }
    const diffs = subtract(row, means[idx]);
    const squareDiffs = elementTransform(diffs, el => Math.pow(el, 2));
    const squareDiffSum = squareDiffs.reduce((pre, curr) => pre + curr, 0);


    stdDevs.push(Math.sqrt(squareDiffSum / row.length));
  });

  return stdDevs;
};


module.exports = {
  add,
  elementTransform,
  matrixElementCalc,
  multiply,
  subtract,
  transpose,
  zeroes,
  ones,
  identity,
  equals,
  rowMeans,
  colMeans,
  rowStdDevs,
  colStdDevs
};
