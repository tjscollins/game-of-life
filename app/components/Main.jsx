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
  handleGridClick: function(xcoord, ycoord, cond) {
    var {cells} = this.state;
    cells[xcoord][ycoord] = cond;
    this.setState({cells: cells});
  },
  handleButtonClick: function(button) {
    if (button === 'start') {} else if (button === 'incrememt') {} else if (button === 'stop') {}
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
