"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

module.exports = {
  verifyDimensions: function verifyDimensions(matrix1, matrix2) {
    if (!(matrix1 instanceof Array && matrix2 instanceof Array)) {
      return false; 
    } 
    else if (matrix1.every(el=> el instanceof Array)) {   //  If matrix 1 is an array
      var _ret =  () => {
        var rows = matrix1.length;
        var cols = matrix1[0].length;

        if (matrix2.every(el=> el instanceof Array) && 
              matrix2.every(el=> el.length === cols) && 
                matrix2.length === rows) {
          return {  v: true };
        } 
        else return { v: false  };
      }();

      if ((typeof _ret === "undefined" ? "undefined" : _typeof(_ret)) === "object") 
          return _ret.v;
    } 
    else   // If both are scalars
      return (matrix1.length === matrix2.length) ? true : false
    
  },
  multDimMatch: (matrix1, matrix2) =>
    matrix1.every(el=> el instanceof Array) ? matrix1[0].length : matrix1.length === matrix2.length,
  
  multRowCol: (row, col) => row.reduce((accum, el)=> accum += el * col[idx] ,0)
  }
};