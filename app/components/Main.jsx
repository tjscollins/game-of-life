var React = require('react');

var Title = require('Title');
var Info = require('Info');
var Controls = require('Controls');
var Grid = require('Grid');

var Main = React.createClass({
  getInitialState: function() {
    return {
      started: false,
      board: '3x3',
      cells: [
        [
          0, 1, 0
        ],
        [
          0, 0, 1
        ],
        [2, 0, 0]
      ]
    }
  },
  render: function() {
    var {board, cells} = this.state;
    return (
      <div className="container">
        <Title/>
        <Grid board={board} cells={cells}/>
        <Controls/>
        <Info/>
      </div>
    );
  }
});

module.exports = Main;
