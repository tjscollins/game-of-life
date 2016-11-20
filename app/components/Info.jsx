var React = require('react');

var Info = (props) => {
  return (
    <div className="info-box">
      <h2>
        <a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life">About</a>
      </h2>
      <p>
        The Game of Life is a cellular automaton devised by the British mathematician John Horton Conway. It originated in Conway's attempt to simply John von Neumann's idea of a mathematical model of a machine that could build copies of itself. The Game is especially interesting because it is a universal Turing machine in its own right: anything that can be computed algorithmically can be computed within the game.
      </p>
    </div>
  );
};

module.exports = Info;
