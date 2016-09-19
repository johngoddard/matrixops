const util = require('./util.js');


const add = (arg1, arg2) => {
  if(arg1 instanceof Array && arg2 instanceof Array){
    let dimMatch = util.verifyDimensions(arg1, arg2);

    if(dimMatch && arg1[0] instanceof Array){
      let result = [];
      arg1.forEach((row, rowIdx) => {
        let newRow = [];
        row.forEach((el, colIdx) => {
          newRow.push(el + arg2[rowIdx][colIdx]);
        });

        result.push(newRow);
      });
      return result;
    } else if (dimMatch){
      return arg1.map((el, idx) => el + arg2[idx]);
    }
    else{
      throw 'matrices must have matching dimensions';
    }
  } else if (arg1 instanceof Array && typeof arg2 === 'number'){
    if(arg1[0] instanceof Array){
      let newArr = [];
      arg1.forEach(row => {
        newArr.push(row.map(el => el + arg2));
      });
      return newArr;
    } else{
      return arg1.map(el => el + arg2);
    }
  } else if (typeof arg1 === 'number' && arg2 instanceof Array) {
    if(arg2[0] instanceof Array){
      let newArr = [];
      arg2.forEach(row => {
        newArr.push(row.map(el => el + arg1));
      });
      return newArr;
    } else{
      return arg2.map(el => el + arg1);
    }
  } else if (typeof arg1 === 'number' && typeof arg2 === 'number') {
    return arg1 + arg2;
  } else {
    throw "args must be numbers and matrices or matrices of matching size";
  }
}

const multiply = (arg1, arg2) => {
  if(arg1 instanceof Array && arg2 instanceof Array){
    let dimMatch = util.multDimMatch(arg1, arg2);
    if(dimMatch && arg1[0] instanceof Array && arg2[0] instanceof Array){
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
    } else if (dimMatch && arg1[0] instanceof Array){
      let result = [];

      arg1.forEach(row => {
        result.push([util.multRowCol(row, arg2)]);
      });

      return result;
    } else if (dimMatch && arg2[0] instanceof Array){
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
  } else if (arg1 instanceof Array && typeof arg2 === 'number'){
    if(arg1[0] instanceof Array){
      let result = [];
      arg1.forEach(row => {
        let newRow = row.map(el => el * arg2);
        result.push(newRow);
      });
      return result;
    } else{
      return arg1.map(el => el * arg2);
    }
  } else if (typeof arg1 === 'number' && arg2 instanceof Array) {
    if(arg2[0] instanceof Array){
      let result = [];
      arg2.forEach(row => {
        let newRow = row.map(el => el * arg1);
        result.push(newRow);
      });
      return result;
    } else{
      return arg2.map(el => el * arg1);
    }
  } else if (typeof arg1 === 'number' && typeof arg2 === 'number') {
    return arg1 * arg2;
  } else {
    throw "args must be compatible";
  }
}

const elementTransform = (matrix, callback) => {
  if(matrix[0] instanceof Array){
    let result = [];
    matrix.forEach(row => {
      let newRow = row.map(el => callback(el));
      result.push(newRow);
    });

    return result;
  } else{
    return matrix.map(el => callback(el));
  }
};

const matrixElementCalc = (matrix1, matrix2, callback) => {
  let dimMatch = util.verifyDimensions(matrix1, matrix2);

  if(dimMatch && matrix1[0] instanceof Array){
    let result = [];
    matrix1.forEach((row, rowIdx) => {
      let newRow = row.map((el, idx) => {
        return callback(el, matrix2[rowIdx][idx]);
      });
      result.push(newRow);
    });
    return result;
  }else if (dimMatch){
    return matrix1.map((el, idx) => callback(el, matrix2[idx]));
  } else{
    throw 'can not peform arithmetic on matrices';
  }
};

const subtract = (arg1, arg2) => {
  let toSubtract;

  if(!(arg1 instanceof Array) && arg2 instanceof Array){
    throw 'cannot not subtract matrix from scalar';
  } else if(arg2 instanceof Array && arg2[0] instanceof Array){
    toSubtract = elementTransform(arg1, el => -el);
  } else if (arg2 instanceof Array) {
    toSubtract = arg2.map(el => -el);
  } else{
    toSubtract = -arg2;
  }

  console.log(arg1);
  console.log(toSubtract);
  return add(arg1, toSubtract);
};


module.exports = {
  add: add,
  elementTransform: elementTransform,
  matrixElementCalc: matrixElementCalc,
  multiply: multiply,
  subtract: subtract
};
