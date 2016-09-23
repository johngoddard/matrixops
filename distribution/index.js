'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var util = require('./util.js');

var matrixElementCalc = function matrixElementCalc(matrix1, matrix2, callback) {
  var dimMatch = util.verifyDimensions(matrix1, matrix2);

  if (dimMatch && matrix1[0] instanceof Array) {
    var _ret = function () {
      var result = [];
      matrix1.forEach(function (row, rowIdx) {
        var newRow = row.map(function (el, colIdx) {
          return callback(el, matrix2[rowIdx][colIdx], rowIdx, colIdx);
        });
        result.push(newRow);
      });
      return {
        v: result
      };
    }();

    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
  } else if (dimMatch) {
    return matrix1.map(function (el, idx) {
      return callback(el, matrix2[idx], idx);
    });
  } else {
    throw 'can not peform arithmetic on matrices';
  }
};

var elementTransform = function elementTransform(matrix, callback) {
  if (matrix[0] instanceof Array) {
    var _ret2 = function () {
      var result = [];
      matrix.forEach(function (row, rowIdx) {
        var newRow = row.map(function (el, colIdx) {
          return callback(el, rowIdx, colIdx);
        });
        result.push(newRow);
      });

      return {
        v: result
      };
    }();

    if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object") return _ret2.v;
  } else {
    return matrix.map(function (el, idx) {
      return callback(el, idx);
    });
  }
};

var add = function add(arg1, arg2) {
  if (arg1 instanceof Array && arg2 instanceof Array) {
    var dimMatch = util.verifyDimensions(arg1, arg2);

    if (dimMatch && arg1[0] instanceof Array) {
      return matrixElementCalc(arg1, arg2, function (el1, el2) {
        return el1 + el2;
      });
    } else if (dimMatch) {
      return arg1.map(function (el, idx) {
        return el + arg2[idx];
      });
    } else {
      throw 'matrices must have matching dimensions';
    }
  } else if (arg1 instanceof Array) {
    return elementTransform(arg1, function (el1) {
      return el1 + arg2;
    });
  } else if (arg2 instanceof Array) {
    return elementTransform(arg2, function (el1) {
      return el1 + arg1;
    });
  } else {
    return arg1 + arg2;
  }
};

var multiply = function multiply(arg1, arg2) {
  if (arg1 instanceof Array && arg2 instanceof Array) {
    var dimMatch = util.multDimMatch(arg1, arg2);
    if (dimMatch && arg1[0] instanceof Array && arg2[0] instanceof Array) {
      var result = [];
      for (var i = 0; i < arg1.length; i++) {
        var resRow = [];

        var _loop = function _loop(j) {
          var col = [];
          arg2.forEach(function (row) {
            col.push(row[j]);
          });
          resRow.push(util.multRowCol(arg1[i], col));
        };

        for (var j = 0; j < arg2[0].length; j++) {
          _loop(j);
        }
        result.push(resRow);
      }

      return result;
    } else if (dimMatch && arg1[0] instanceof Array) {
      var _ret4 = function () {
        var result = [];

        arg1.forEach(function (row) {
          result.push([util.multRowCol(row, arg2)]);
        });

        return {
          v: result
        };
      }();

      if ((typeof _ret4 === 'undefined' ? 'undefined' : _typeof(_ret4)) === "object") return _ret4.v;
    } else if (dimMatch && arg2[0] instanceof Array) {
      var _result = [];

      var _loop2 = function _loop2(_i) {
        var col = [];
        arg2.forEach(function (row) {
          col.push(row[_i]);
        });
        _result.push(util.multRowCol(arg1, col));
      };

      for (var _i = 0; _i < arg2[0].length; _i++) {
        _loop2(_i);
      }

      return _result;
    } else if (dimMatch) {
      return util.multRowCol(arg1, arg2);
    } else {
      throw 'matrices can not be multiplied';
    }
  } else if (arg1 instanceof Array) {
    return elementTransform(arg1, function (el1) {
      return el1 * arg2;
    });
  } else if (arg2 instanceof Array) {
    return elementTransform(arg2, function (el1) {
      return el1 * arg1;
    });
  } else if (typeof arg1 === 'number' && typeof arg2 === 'number') {
    return arg1 * arg2;
  } else {
    throw "Arguments cannot be multiplied";
  }
};

var subtract = function subtract(arg1, arg2) {
  var toSubtract = void 0;

  if (!(arg1 instanceof Array) && arg2 instanceof Array) {
    throw 'cannot not subtract matrix from scalar';
  } else if (arg2 instanceof Array && arg2[0] instanceof Array) {

    toSubtract = elementTransform(arg2, function (el) {
      return -el;
    });
  } else if (arg2 instanceof Array) {
    toSubtract = arg2.map(function (el) {
      return -el;
    });
  } else {
    toSubtract = -arg2;
  }

  return add(arg1, toSubtract);
};

var transpose = function transpose(matrix) {
  var isMatrix = matrix[0] instanceof Array;

  if (isMatrix) {
    var result = [];
    for (var _col = 0; _col < matrix[0].length; _col++) {

      var newRow = [];
      for (var row = 0; row < matrix.length; row++) {
        newRow.push(matrix[row][_col]);
      }
      result.push(newRow);
    }
    return result;
  } else {
    return matrix.map(function (el) {
      return [el];
    });
  }
};

var valMatrix = function valMatrix(rows, cols, val) {

  var result = [];

  for (var i = 0; i < rows; i++) {
    var newRow = [];
    for (var j = 0; j < cols; j++) {
      newRow.push(val);
    }
    result.push(newRow);
  }

  return result;
};

var zeroes = function zeroes(rows, cols) {
  var columns = cols || 1;
  return valMatrix(rows, columns, 0);
};

var ones = function ones(rows, cols) {
  var columns = cols || 1;
  return valMatrix(rows, columns, 1);
};

var identity = function identity(num) {
  var identityMatrix = [];
  for (var row = 0; row < num; row++) {
    var newRow = [];
    for (var _col2 = 0; _col2 < num; _col2++) {
      var toPush = _col2 === row ? 1 : 0;
      newRow.push(toPush);
    }

    identityMatrix.push(newRow);
  }

  return identityMatrix;
};

module.exports = {
  add: add,
  elementTransform: elementTransform,
  matrixElementCalc: matrixElementCalc,
  multiply: multiply,
  subtract: subtract,
  transpose: transpose,
  zeroes: zeroes,
  ones: ones,
  identity: identity
};