"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

module.exports = {
  verifyDimensions: function verifyDimensions(matrix1, matrix2) {
    if (!(matrix1 instanceof Array && matrix2 instanceof Array)) {
      return false;
    } else if (matrix1.every(function (el) {
      return el instanceof Array;
    })) {
      var _ret = function () {
        var rows = matrix1.length;
        var cols = matrix1[0].length;

        if (matrix2.every(function (el) {
          return el instanceof Array;
        }) && matrix2.every(function (el) {
          return el.length === cols;
        }) && matrix2.length === rows) {
          return {
            v: true
          };
        } else {
          return {
            v: false
          };
        }
      }();

      if ((typeof _ret === "undefined" ? "undefined" : _typeof(_ret)) === "object") return _ret.v;
    } else {
      if (matrix1.length === matrix2.length) {
        return true;
      } else {
        return false;
      }
    }
  },
  multDimMatch: function multDimMatch(matrix1, matrix2) {
    var rows2 = matrix2.length;
    var cols1 = matrix1.every(function (el) {
      return el instanceof Array;
    }) ? matrix1[0].length : matrix1.length;

    return cols1 === rows2;
  },
  multRowCol: function multRowCol(row, col) {
    var sum = 0;
    row.forEach(function (el, idx) {
      sum += el * col[idx];
    });

    return sum;
  }
};