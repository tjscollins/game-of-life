var bruteForce = (cols, rows, cells, newCells, livingCells) => {
  // This Algorithm checks the neighbors of every cell in the grid once.
  // For an n x n grid this results in O(n^2) performance.  Specifically 8n^2 status checks
  // Not ideal. Might be improved by storing counts and changed flags so they can be
  // rechecked quickly.
  for (var i = 0; i < cols; i++) {
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

var checkAllNeighborsOfAllLiving = (cols, rows, cells, newCells, livingCells, newLivingCells) => {
  //This Algorithm uses a list of currently living cells and checks all neighbors of
  //those cell's neighbors.  As currently written this includes repeatedly checking
  //overlapping neighbors.  This results in something like O(64n^2) for an n x n
  //grid of all living cells, potentially worse than the bruteForce method.
  //Might be improved by keeping a checked/notChecked flag to prevent duplicate checking.
  //Theoretically more efficient than bruteForce for small numbers of living cells.

  for (var square in livingCells) {
    var x = parseInt(square.match(/^\d+/)[0]);
    var y = parseInt(square.match(/\d+$/)[0]);

    for (var k = Math.max(0, x - 1); k <= Math.min(cols - 1, x + 1); k++) {
      for (var l = Math.max(0, y - 1); l <= Math.min(rows - 1, y + 1); l++) {
        newCells[k][l] = checkNeighbors(k, l, cells);
        if (newCells[k][l]) {
          newLivingCells[k + 'x' + l] = newCells[k][l];
        } else {
          delete newLivingCells[k + 'x' + l];
        }
      }
    }
  }

  function checkNeighbors(x, y, cells) {
    var count = 0;
    for (var k = Math.max(0, x - 1); k <= Math.min(cols - 1, x + 1); k++) {
      for (var l = Math.max(0, y - 1); l <= Math.min(rows - 1, y + 1); l++) {
        if (k != x || l != y) {
          if (cells[k][l] === 1 || cells[k][l] === 2) {
            count++;
          }
        }
      }
    }
    if (cells[x][y] && (count === 2 || count === 3)) {
      return 2;
    } else if (!cells[x][y] && count === 3) {
      return 1;
    } else {
      return 0;
    }
  }

}

module.exports = {
  bruteForce,
  checkAllNeighborsOfAllLiving
}
