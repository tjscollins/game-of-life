var React = require('react');

var Title = require('Title');
var Info = require('Info');
var Controls = require('Controls');
var Grid = require('Grid');
var GameofLife = require('GameofLife');

var Main = React.createClass({
  getInitialState: function() {
    var cols = 45;
    var rows = 27;
    return {
      started: false,
      board: cols + 'x' + rows,
      cells: this.createArray(cols, rows),
      livingCells: {},
      timeout: undefined
    }
  },
  createArray: function(length) {
    var arr = new Array(length || 0),
      i = length;
    for (var j = 0; j < length; j++) {
      arr[j] = 0;
    }
    if (arguments.length > 1) {
      var args = Array.prototype.slice.call(arguments, 1);
      while (i--)
        arr[length - 1 - i] = this.createArray.apply(this, args);
      }
    return arr;
  },
  handleGridClick: function(xcoord, ycoord, cond) {
    var {cells, livingCells} = this.state;
    cells[xcoord][ycoord] = cond;
    if (cond) {
      livingCells[xcoord + 'x' + ycoord] = cond;
    } else {
      delete livingCells[xcoord + 'x' + ycoord];
    }
    this.setState({cells: cells, livingCells: livingCells});
  },
  handleButtonClick: function(button) {
    if (button === 'start') {
      this.setState({
        started: true
      }, this.incrementGame);
    } else if (button === 'increment') {
      this.incrementGame();
    } else if (button === 'stop') {
      clearTimeout(this.state.timeout);
      this.setState({started: false, timeout: undefined});
    } else if (button === 'clear') {
      clearTimeout(this.state.timeout);
      var {board} = this.state;
      var cols = board.match(/^\d+/)[0];
      var rows = board.match(/\d+$/)[0];
      this.setState({
        started: false,
        board: board,
        cells: this.createArray(cols, rows),
        timeout: undefined,
        livingCells: {}
      });
    }
  },
  incrementGame: function() {
    var {started, cells, board, timeout, livingCells} = this.state;
    var that = this;
    var newArray = (array) => {
      return array.map((arr) => {
        return [...arr];
      })
    };
    var newLivingCells = $.extend(true, {}, livingCells);
    var newCells = newArray(cells);
    var cols = board.match(/^\d+/)[0];
    var rows = board.match(/\d+$/)[0];

    //Algorithm that tracks living cells and checks only squares around them.
    //Currently too inefficient because it repeatedly checks cells for each livingCells
    //neighbor.  Need a way to only check each cell once.

    /*    for (var square in livingCells) {
      var x = parseInt(square.match(/^\d+/)[0]);
      var y = parseInt(square.match(/\d+$/)[0]);

      for (var k = Math.max(0, x - 1); k <= Math.min(cols - 1, x + 1); k++) {
        for (var l = Math.max(0, y - 1); l <= Math.min(rows - 1, y + 1); l++) {
          newCells[k][l] = checkNeighbors(k, l, this.state.cells);
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
    }*/

    //This Algorithm checks the neighbors of every cell once.  Might be improved by storing counts and changed flags so they can be rechecked quickly.
    GameofLife.bruteForce(cols, rows, cells, newCells, livingCells);

    this.setState({cells: newCells, livingCells: newLivingCells});
    if (this.state.started) {
      timeout = setTimeout(that.incrementGame, 125);
      this.setState({timeout: timeout});
    }
  },
  render: function() {
    var {board, cells, started} = this.state;
    return (
      <div className="container">
        <Title/>
        <Grid board={board} cells={cells} onGridClick={this.handleGridClick}/>
        <Controls started={started} onButtonClick={this.handleButtonClick}/>
        <Info/>
      </div>
    );
  }
});

module.exports = Main;
