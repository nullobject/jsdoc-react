/** @jsx React.DOM */

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
        <h4>Returns</h4>
        <dl className="dl-horizontal">
          <dt>{F.surround('{', '}', returns.type.names.join('|'))}</dt>,
          <dd dangerouslySetInnerHTML={{__html: returns.description}} />
        </dl>
      </section>
      /* jshint ignore:end */
    ) : null;
  }
});
