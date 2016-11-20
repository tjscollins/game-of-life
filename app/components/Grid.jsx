var React = require('react');
var Status = require('Status');

var Grid = React.createClass({
  handleClick: function (i, j, cond, e) {
    var {onGridClick} = this.props;
    e.preventDefault();
    onGridClick(i, j, cond);
  },
  render: function () {
    var {board, cells, speed, generations} = this.props;
    var handleClick = this.handleClick;
    var createRow = function (board, j) {
      var re = new RegExp(/^\d+/);
      var cols = board.match(re);
      var row = [];
      for (var i = 0; i < cols; i++) {
        if (cells[i][j] === 1) {
          row.unshift(
            <div key={i + 'x' + j} id={i + 'x' + j} onClick={handleClick.bind(null, i, j, 2)} className="square-alive"></div>
          );
        } else if (cells[i][j] === 2) {
          row.unshift(
            <div key={i + 'x' + j} id={i + 'x' + j} onClick={handleClick.bind(null, i, j, 0)} className="square-alive2"></div>
          );
        } else {
          row.unshift(
            <div key={i + 'x' + j} id={i + 'x' + j} onClick={handleClick.bind(null, i, j, 1)} className="square"></div>
          );
        }
      }
      return row;
    };
    var createGrid = function (board) {
      var re = new RegExp(/\d+$/);
      var rows = board.match(re);
      var grid = []
      for (var i = 0; i < rows; i++) {
        grid.unshift(
          <div key={'row' + i} className="">
            <div className="board-row col-xs-10 col-xs-push-1">
              {createRow(board, i)}
            </div>
          </div>
        );
      }
      return grid;
    }
    return (
      <div className="board">
        <div className="status-box">
          <Status speed={speed} generations={generations}/>
        </div>
        {createGrid(board)}
      </div>
    );
  }
});

module.exports = Grid;
