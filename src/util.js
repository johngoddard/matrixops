module.exports = {
  verifyDimensions: (matrix1, matrix2) => {
    if(!(matrix1 instanceof Array && matrix2 instanceof Array)){
      return false;
    } else if (matrix1[0] instanceof Array){
      let rows = matrix1.length;
      let cols = matrix1[0].length;

      if(matrix2[0] instanceof Array && matrix2[0].length === cols && matrix2.length === rows){
        return true;
      } else{
        return false;
      }
    } else{
      if(matrix1.length === matrix2.length){
        return true;
      } else{
        return false;
      }
    }
  },
  multDimMatch: (matrix1, matrix2) => {
    let rows2 = matrix2.length;
    let cols1 = matrix1[0] instanceof Array ? matrix1[0].length : matrix1.length;

    return cols1 === rows2;
  },
  multRowCol: (row, col) => {
    let sum = 0;
    row.forEach((el, idx) => {
      sum += el * col[idx];
    });

    return sum;
  }
};
