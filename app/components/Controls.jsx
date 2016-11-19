var React = require('react');

var Controls = React.createClass({
  handleStart: function() {
    var {started, onButtonClick} = this.props;
    if (!started) {
      onButtonClick('start');
    }
  },
  handleIncrement: function() {
    var {started, onButtonClick} = this.props;
    if (!started) {
      onButtonClick('increment');
    }
  },
  handleStop: function() {
    var {started, onButtonClick} = this.props;
    if (started) {
      onButtonClick('stop');
    }
  },
  handleClear: function() {
    var {onButtonClick} = this.props;
    onButtonClick('clear');
  },
  render: function() {
    return (
      <div className="row">
        <div className="controls-box col-xs-10 col-xs-push-1">
          <button onClick={this.handleStart} className="btn btn-primary btn-start">Start</button>
          <button onClick={this.handleIncrement} className="btn btn-info btn-once">Increment</button>
          <button onClick={this.handleStop} className="btn btn-danger btn-stop">Stop</button>
          <button onClick={this.handleClear} className="btn btn-warning btn-clear">Clear</button>
        </div>
      </div>
    );
  }
});

module.exports = Controls;;
