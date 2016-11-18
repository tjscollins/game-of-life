var React = require('react');

var Grid = React.createClass({
  render: function() {
    var {board, cells} = this.props;
    var createRow = function(board, j) {
      var re = new RegExp(/^\d+/);
      var cols = board.match(re);
      var row = [];
      for (var i = 0; i < cols; i++) {
        if (cells[i][j] === 1) {
          row.push(
            <div key={i + 'x' + j} className="square-alive"></div>
          );
        } else if (cells[i][j] === 2) {
          row.push(
            <div key={i + 'x' + j} className="square-alive2"></div>
          );
        } else {
          row.push(
            <div key={i + 'x' + j} className="square"></div>
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
