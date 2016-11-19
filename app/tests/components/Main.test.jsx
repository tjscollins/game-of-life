var expect = require('expect');
var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var $ = require('jquery');

var Main = require('Main');

describe('Main', () => {
  it('should exist', () => {
    expect(Main).toExist();
  });

  it('should properly increment the game each time incrementGame is called', () => {
    var main = TestUtils.renderIntoDocument(<Main/>);
    main.setState({
      started: false,
      board: '3x3',
      cells: [
        [
          1, 1, 0
        ],
        [
          1, 1, 0
        ],
        [0, 0, 0]
      ]
    })
    main.incrementGame();
    var expectedCells = [
      [
        2, 2, 0
      ],
      [
        2, 2, 0
      ],
      [0, 0, 0]
    ];
    expect(main.state.cells).toEqual(expectedCells);
    main.setState({
      started: false,
      board: '4x4',
      cells: [
        [
          1, 1, 0, 0
        ],
        [
          1, 0, 1, 0
        ],
        [
          0, 1, 0, 0
        ],
        [0, 0, 0, 0]
      ]
    })
    main.incrementGame();
    var expectedCells = [
      [
        2, 2, 0, 0
      ],
      [
        2, 0, 2, 0
      ],
      [
        0, 2, 0, 0
      ],
      [0, 0, 0, 0]
    ];
    expect(main.state.cells).toEqual(expectedCells);
  });
})
