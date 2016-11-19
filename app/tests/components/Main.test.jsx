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
    var testMainIncrement = (state, expectedCells) => {
      main.setState(state);
      main.incrementGame();
      expect(main.state.cells).toEqual(expectedCells)
    }
    testMainIncrement({
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
    }, [
      [
        2, 2, 0
      ],
      [
        2, 2, 0
      ],
      [0, 0, 0]
    ]);
    testMainIncrement({
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
    }, [
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
    ]);
    testMainIncrement({
      started: false,
      board: '4x4',
      cells: [
        [
          0, 0, 0, 0
        ],
        [
          0, 1, 2, 0
        ],
        [
          0, 1, 2, 0
        ],
        [0, 0, 0, 0]
      ]
    }, [
      [
        0, 0, 0, 0
      ],
      [
        0, 2, 2, 0
      ],
      [
        0, 2, 2, 0
      ],
      [0, 0, 0, 0]
    ]);
    testMainIncrement({
      started: false,
      board: '4x4',
      cells: [
        [
          0, 0, 0, 0
        ],
        [
          1, 0, 0, 0
        ],
        [
          0, 1, 2, 1
        ],
        [0, 0, 0, 0]
      ]
    }, [
      [
        0, 0, 0, 0
      ],
      [
        0, 1, 1, 0
      ],
      [
        0, 2, 2, 0
      ],
      [0, 0, 1, 0]
    ]);
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
