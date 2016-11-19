var React = require('react');

var Title = require('Title');
var Info = require('Info');
var Controls = require('Controls');
var Grid = require('Grid');

var Main = React.createClass({
  getInitialState: function() {
    var board = '50x30';
    var cols = board.match(/^\d+/);
    var rows = board.match(/\d+$/);
    function createArray(length) {
      var arr = new Array(length || 0),
        i = length;
      for (var j = 0; j < length; j++) {
        arr[j] = 0;
      }
      if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while (i--)
          arr[length - 1 - i] = createArray.apply(this, args);
        }
      return arr;
    }
    return {
      started: false,
      board: board,
      cells: createArray(cols, rows),
      timeout: undefined
    }
  },
  handleGridClick: function(xcoord, ycoord, cond) {
    var {cells} = this.state;
    cells[xcoord][ycoord] = cond;
    this.setState({cells: cells});
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
    }
  },
  incrementGame: function() {
    var {started, cells, board, timeout} = this.state;
    var that = this;
    var newArray = (array) => {
      return array.map((arr) => {
        return [...arr];
      })
    };
    var newCells = newArray(cells);
    var cols = board.match(/^\d+/);
    var rows = board.match(/\d+$/);
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
        } else if (cells[i][j]) {
          newCells[i][j] = 0;
        } else if (!cells[i][j] && count === 3) {
          newCells[i][j] = 1;
        }
      }
    }
    this.setState({cells: newCells});
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
