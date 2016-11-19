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

  it('should start the game when start is clicked', () => {
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
      ],
      timeout: undefined
    })
    var $el = $(ReactDOM.findDOMNode(main));
    TestUtils.Simulate.click($el.find('.btn-start')[0]);
    expect(main.state.started).toBe(true);
    expect(main.state.timeout).toExist();
  });

  it('should stop the game when stop is clicked', () => {
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
      ],
      timeout: undefined
    })
    var $el = $(ReactDOM.findDOMNode(main));
    TestUtils.Simulate.click($el.find('.btn-start')[0]);
    TestUtils.Simulate.click($el.find('.btn-stop')[0]);
    expect(main.state.started).toBe(false);
    expect(main.state.timeout).toBe(undefined);
  })
})
