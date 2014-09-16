/** @jsx React.DOM */

'use strict';

var F                 = require('fkit'),
    FunctionComponent = require('./function_component.jsx'),
    React             = require('react');

var HeaderComponent = React.createClass({
  render: function() {
    return (
      /* jshint ignore:start */
      <header>
        <h1 className="page-header">{this.name(this.props.name)}</h1>
        <section className="description" dangerouslySetInnerHTML={{__html: this.props.description}} />
      </header>
      /* jshint ignore:end */
    );
  },

  name: F.replace('/', '.'),
});

var FunctionsComponent = React.createClass({
  render: function() {
    return this.props.functions ? (
      /* jshint ignore:start */
      <section className="functions">
        {this.renderFunctions(this.props.functions)}
      </section>
      /* jshint ignore:end */
    ) : null;
  },

  renderFunctions: F.map(FunctionComponent),
});

/**
 * Represents a module definition.
 *
 * @class ModuleComponent
 */
module.exports = React.createClass({
  render: function() {
    return (
      /* jshint ignore:start */
      <section className="module">
        <HeaderComponent name={this.props.name} description={this.props.description} />
        <FunctionsComponent functions={this.props.functions} />
      </section>
      /* jshint ignore:end */
    );
  },
});
