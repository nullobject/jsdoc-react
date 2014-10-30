'use strict';

var F     = require('fkit'),
    React = require('react');

var FunctionsComponent = require('./functions_component'),
    HeaderComponent    = require('./header_component');

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
        <FunctionsComponent showStaticFunctions="false" functions={this.props.functions} />
      </section>
      /* jshint ignore:end */
    );
  },
});
