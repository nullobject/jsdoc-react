'use strict';

var F     = require('fkit'),
    React = require('react');

var FunctionComponent = require('./function_component');

/**
 * Represents a list of functions.
 *
 * @class FunctionsComponent
 */
module.exports = React.createClass({
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

  // Transfers the prop to the component.
  transfer: function(prop, component) {
    return F.compose(component, F.set(prop, this.props[prop]));
  },

  renderFunctions: function(as) {
    return F.map(this.transfer('showStaticFunctions', FunctionComponent), as);
  },
});
