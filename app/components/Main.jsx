var React = require('react');

var Title = require('Title');
var Info = require('Info');
var Controls = require('Controls');
var Grid = require('Grid');

var Main = React.createClass({
  render: function() {
    return (
      <div className="container">
        <h1>Main.jsx</h1>
        <Title/>
        <Grid/>
        <Controls/>
        <Info/>
      </div>
    );
  }
});

module.exports = Main;
