/** @jsx React.DOM */

'use strict';

var F     = require('fkit'),
    React = require('react');

var ExampleComponent = require('./example_component'),
    IconComponent    = require('./icon_component'),
    LabelComponent   = require('./label_component'),
    ParamsComponent  = require('./params_component'),
    ReturnsComponent = require('./returns_component');

var HeaderComponent = React.createClass({
  render: function() {
    return (
      /* jshint ignore:start */
      <header>
        <h3 id={this.props.name}>
          {this.renderAnchor(this.props.name)}
          {this.renderDefinition(this.props.name, this.props.params)}
          &nbsp;
          {this.renderCurriedLabel(this.props.curried)}
        </h3>
      </header>
      /* jshint ignore:end */
    );
  },

  renderAnchor: function(name) {
    return (
      /* jshint ignore:start */
      <a href={'#' + name}><IconComponent className="anchor" name="link" /></a>
      /* jshint ignore:end */
    );
  },

  renderCurriedLabel: function(curried) {
    return curried ? (
      /* jshint ignore:start */
      <LabelComponent text="curried" type="primary" />
      /* jshint ignore:end */
    ) : null;
  },

  renderDefinition: function(name, params) {
    return F.concat(
      name,
      this.renderParams(params)
    );
  },

  renderParams: F.compose(
    F.surround('(', ')'),
    F.intersperse(', '),
    F.map(F.get('name'))
  ),
});

/**
 * Represents a function definition.
 *
 * @class FunctionComponent
 */
module.exports = React.createClass({
  displayName: 'FunctionComponent',

  render: function() {
    return (
      /* jshint ignore:start */
      <section className="function">
        <HeaderComponent
          name={this.props.name}
          params={this.props.params}
          curried={this.curried()}
        />
        <section className="description" dangerouslySetInnerHTML={{__html: this.props.description}} />
        <ParamsComponent params={this.props.params} />
        <ReturnsComponent returns={this.props.returns[0]} />
        {this.renderExamples(this.props.examples || [])}
      </section>
      /* jshint ignore:end */
    );
  },

  renderExamples: F.map(function(example, i) {
    return ExampleComponent({example: example, key: 'example-' + i})
  }),

  // Returns true if this is a curried function.
  curried: function() {
    var title = function(a) { return F.compose(F.eql(a), F.get('title')); };
    return F.any(title('curried'), this.props.tags || []);
  },
});
