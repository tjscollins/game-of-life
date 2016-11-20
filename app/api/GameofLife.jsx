var bruteForce = (cols, rows, cells, newCells, livingCells) {
  //This Algorithm checks the neighbors of every cell in the grid once.
  //Might be improved by storing counts and changed flags so they can be
  //rechecked quickly.
  for(var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      var count = 0;
      for (var k = Math.max(0, i - 1); k <= Math.min(cols - 1, i + 1); k++) {
        for (var l = Math.max(0, j - 1); l <= Math.min(rows - 1, j + 1); l++) {
          if (k != i || l != j) {
            if (cells[k][l] === 1 || cells[k][l] === 2) {
              count++;
            }
          }
        }
      }
      if (cells[i][j] && (count === 2 || count === 3)) {
        newCells[i][j] = 2;
        livingCells[i + 'x' + j] = 2;
      } else if (cells[i][j]) {
        newCells[i][j] = 0;
        delete livingCells[i + 'x' + j];
      } else if (!cells[i][j] && count === 3) {
        newCells[i][j] = 1;
        livingCells[i + 'x' + j] = 1;
      }
    }
  }
}

var checkNeighborsOfLiving = () {}

module.exports = {
  bruteForce: bruteForce
}
