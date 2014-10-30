'use strict';

var F     = require('fkit'),
    React = require('react');

/**
 * Represents a return value.
 *
 * @class ReturnsComponent
 */
module.exports = React.createClass({
  displayName: 'ReturnsComponent',

  render: function() {
    var returns = this.props.returns;
    return this.props.returns ? (
      /* jshint ignore:start */
      <section className="returns">
        <h4>Return Value</h4>
        <div dangerouslySetInnerHTML={{__html: returns.description}} />
      </section>
      /* jshint ignore:end */
    ) : null;
  }
});
