var React = require('react');

var Status = (props) => {
  var {generations, speed} = props;
  return (
    <div className="status-box">
      <h2>Simulation Status</h2>
      <p>
        Generations: {generations}
      </p>
      <p>
        Speed: {speed}ms per iteration
      </p>
    </div>
  );
};
module.exports = Status;
