var React = require('react');

var Grid = React.createClass({
  handleClick: function(i, j, cond, e) {
    var {onGridClick} = this.props;
    e.preventDefault();
    onGridClick(i, j, cond);
  },
  render: function() {
    var {board, cells} = this.props;
    var handleClick = this.handleClick;
    var createRow = function(board, j) {
      var re = new RegExp(/^\d+/);
      var cols = board.match(re);
      var row = [];
      for (var i = 0; i < cols; i++) {
        if (cells[i][j] === 1) {
          row.push(
            <div key={i + 'x' + j} onClick={handleClick.bind(this, i, j, 2)} className="square-alive"></div>
          );
        } else if (cells[i][j] === 2) {
          row.push(
            <div key={i + 'x' + j} onClick={handleClick.bind(this, i, j, 0)} className="square-alive2"></div>
          );
        } else {
          row.push(
            <div key={i + 'x' + j} onClick={handleClick.bind(this, i, j, 1)} className="square"></div>
          );
        }
      }
      return row;
    };
    var createGrid = function(board) {
      var re = new RegExp(/\d+$/);
      var rows = board.match(re);
      var grid = []
      for (var i = 0; i < rows; i++) {
        grid.push(
          <div key={'row' + i} className="board-row row">{createRow(board, i)}</div>
        );
      }
      return grid;
    }
    return (
      <div className="board container">
        <h1>Grid.jsx</h1>
        {createGrid(board)}
      </div>
    );
  }
});

module.exports = Grid;
