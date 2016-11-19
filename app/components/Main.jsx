var React = require('react');

var Title = require('Title');
var Info = require('Info');
var Controls = require('Controls');
var Grid = require('Grid');

var Main = React.createClass({
  getInitialState: function() {
    return {
      started: false,
      board: '4x3',
      cells: [
        [
          0, 1, 0
        ],
        [
          0, 0, 1
        ],
        [
          2, 0, 0
        ],
        [1, 1, 1]
      ]
    }
  },
  handleGridClick: function(xcoord, ycoord, cond) {
    var {cells} = this.state;
    cells[xcoord][ycoord] = cond;
    this.setState({cells: cells});
  },
  handleButtonClick: function(button) {
    if (button === 'start') {} else if (button === 'increment') {
      this.incrementGame();
    } else if (button === 'stop') {}
  },
  incrementGame: function() {
    var {started, cells, board} = this.state;
    var newCells = cells;
    var cols = board.match(/^\d+/);
    var rows = board.match(/\d$/);
    for (var i = 0; i < cols; i++) {
      for (var j = 0; j < rows; j++) {
        var count = 0;
        for (var k = Math.max(0, i - 1); k <= Math.min(cols - 1, i + 1); k++) {
          for (var l = Math.max(0, j - 1); l <= Math.min(rows - 1, j + 1); l++) {
            if (k != 0 || l != 0) {
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
