var React = require('react');

var Title = require('Title');
var Info = require('Info');
var Controls = require('Controls');
var Grid = require('Grid');
var GameofLife = require('GameofLife');

var Main = React.createClass({
  getInitialState: function () {
    var cols = 45;
    var rows = 27;
    return {
      started: false,
      board: cols + 'x' + rows,
      cells: this.createArray(cols, rows),
      livingCells: {},
      timeout: undefined,
      speed: 50
    }
  },
  createArray: function (length) {
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
  handleGridClick: function (xcoord, ycoord, cond) {
    var {cells, livingCells} = this.state;
    cells[xcoord][ycoord] = cond;
    if (cond) {
      livingCells[xcoord + 'x' + ycoord] = cond;
    } else {
      delete livingCells[xcoord + 'x' + ycoord];
    }
    this.setState({cells: cells, livingCells: livingCells});
  },
  handleButtonClick: function (button) {
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
  incrementGame: function () {
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

    GameofLife.bruteForce(cols, rows, cells, newCells, livingCells);

    this.setState({cells: newCells, livingCells});
    if (this.state.started) {
      timeout = setTimeout(that.incrementGame, that.state.speed);
      this.setState({timeout});
    }
  },
  render: function () {
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
