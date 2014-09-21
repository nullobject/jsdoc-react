/** @jsx React.DOM */

'use strict';

var F                 = require('fkit'),
    FunctionComponent = require('./function_component.jsx'),
    React             = require('react');

var HeaderComponent = React.createClass({
  displayName: 'HeaderComponent',

  render: function() {
    return (
      /* jshint ignore:start */
      <header>
        <h1 className="page-header">{this.name(this.props.name)} &mdash; {this.props.summary}</h1>
        <section className="description" dangerouslySetInnerHTML={{__html: this.props.description}} />
      </header>
      /* jshint ignore:end */
    );
  },

  name: F.replace(/\//g, '.'),
});

var functionWithKey = function(f) {
  return F.copy({key: 'function-' + f.name}, f);
};

var FunctionsComponent = React.createClass({
  displayName: 'FunctionsComponent',

  render: function() {
    return this.props.functions ? (
      /* jshint ignore:start */
      <section className="functions">
        {this.renderFunctions(this.props.functions)}
      </section>
      /* jshint ignore:end */
    ) : null;
  },

  renderFunctions: F.map(F.compose(FunctionComponent, functionWithKey)),
});

/**
 * Represents a module definition.
 *
 * @class ModuleComponent
 */
module.exports = React.createClass({
  displayName: 'ModuleComponent',

  render: function() {
    return (
      /* jshint ignore:start */
      <section className="module">
        <HeaderComponent name={this.props.name} summary={this.props.summary} description={this.props.description} />
        <FunctionsComponent functions={this.props.functions} />
      </section>
      /* jshint ignore:end */
    );
  },
});
