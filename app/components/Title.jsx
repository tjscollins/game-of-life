var React = require('react');

var Title = (props) => {
  return (
    <div className="row">
      <div className="title-box col-xs-10 col-xs-push-1">
        <h1 className="page-title">Conway's Game of Life</h1>
      </div>
    </div>
  );
};

module.exports = Title;
