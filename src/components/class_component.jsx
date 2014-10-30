'use strict';

var F     = require('fkit'),
    React = require('react');

var FunctionsComponent = require('./functions_component'),
    HeaderComponent    = require('./header_component');

/**
 * Represents a class definition.
 *
 * @class ClassComponent
 */
module.exports = React.createClass({
  displayName: 'ClassComponent',

  render: function() {
    return (
      /* jshint ignore:start */
      <section className="class">
        <HeaderComponent name={this.props.name} summary={this.props.summary} description={this.props.description} />
        <FunctionsComponent showStaticFunctions="true" functions={this.props.functions} />
      </section>
      /* jshint ignore:end */
    );
  },
});
