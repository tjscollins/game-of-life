var expect = require('expect');
var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var $ = require('jquery');

var Grid = require('Grid');

describe('Grid', () => {
  it('should exist', () => {
    expect(Grid).toExist();
  });

  it('should generate square divs based on board dimensions', () => {
    var state = {
      started: false,
      board: '3x3',
      cells: [
        [
          0, 0, 0
        ],
        [
          0, 0, 0
        ],
        [0, 0, 0]
      ]
    };
    var grid = TestUtils.renderIntoDocument(<Grid board={state.board} cells={state.cells}/>);
    var $el = $(ReactDOM.findDOMNode(grid));
    var divs = $el.find('.square').length;
    expect(divs).toBe(9);
  });

  it('should assign appropriate classes to cells based on alive/dead criteria', () => {
    var state = {
      started: false,
      board: '3x3',
      cells: [
        [
          0, 1, 0
        ],
        [
          2, 1, 2
        ],
        [0, 0, 2]
      ]
    };
    var grid = TestUtils.renderIntoDocument(<Grid board={state.board} cells={state.cells}/>);
    var $el = $(ReactDOM.findDOMNode(grid));
    expect($el.find('.square').length).toBe(4);
    expect($el.find('.square-alive').length).toBe(2);
    expect($el.find('.square-alive2').length).toBe(3);
  });
})
