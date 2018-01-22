module.exports = {
  verifyDimensions: (matrix1, matrix2) => {
    if(!(matrix1 instanceof Array && matrix2 instanceof Array))  // Both matrix 1 and 2 are not 2D arrays
      return false;
    else if (matrix1.every(el => el instanceof Array)){ //If at least matrix 1 is a 2-D array
      let cols = matrix1[0].length;
      // Every element in matrix 2 is an array and has same length as # columns of matrix 1 
      return (matrix2.every(el => el instanceof Array && el.length === cols) &&   // AND
        matrix2.length === matrix1.length) ?  //Matrices are of equal length
        true : false; 
    } //Else if both are scalars
    else return matrix1.length === matrix2.length;
  },
  multDimMatch: (matrix1, matrix2) =>    
  // if matrix 1 is a 2D Array, return length of first element, or if both are scalars,  check if the lengths match
    matrix1.every(el => el instanceof Array) ? matrix1[0].length : matrix1.length === matrix2.length,
  // For each element in the row, multiply each value in the column (For Matrix multiplication)
  multRowCol: (row, col) => row.reduce((accum, el,idx)=> accum += (el * col[idx]) ,0) 
};
