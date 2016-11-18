var expect = require('expect');
var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var $ = require('jquery');

var Controls = require('Controls');

describe('Controls', () => {
  it('should exist', () => {
    expect(Controls).toExist();
  })

  it('should call to start game when start is clicked', () => {
    var spy = expect.createSpy();
    var controls = TestUtils.renderIntoDocument(<Controls started={false} onButtonClick={spy}/>)
    var $el = $(ReactDOM.findDOMNode(controls));
    TestUtils.Simulate.click($el.find('.btn-start')[0]);
    expect(spy).toHaveBeenCalledWith('start');
  });

  it('should call to increment game when increment is clicked', () => {
    var spy = expect.createSpy();
    var controls = TestUtils.renderIntoDocument(<Controls started={false} onButtonClick={spy}/>)
    var $el = $(ReactDOM.findDOMNode(controls));
    TestUtils.Simulate.click($el.find('.btn-once')[0]);
    expect(spy).toHaveBeenCalledWith('increment');
  });

  it('should call to stop game when stop is clicked', () => {
    var spy = expect.createSpy();
    var controls = TestUtils.renderIntoDocument(<Controls started={true} onButtonClick={spy}/>)
    var $el = $(ReactDOM.findDOMNode(controls));
    TestUtils.Simulate.click($el.find('.btn-stop')[0]);
    expect(spy).toHaveBeenCalledWith('stop');
  });
});
