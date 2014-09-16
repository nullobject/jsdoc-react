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
  render: function() {
    return this.props.returns ? (
      /* jshint ignore:start */
      <section className="returns">
        <h4>Returns</h4>
        <dl className="dl-horizontal">{this.renderReturns(this.props.returns)}</dl>
      </section>
      /* jshint ignore:end */
    ) : null;
  },

  renderReturns: F.concatMap(function(param) {
    return [
      /* jshint ignore:start */
      <dt>{F.surround('{', '}', param.type.names.join('|'))}</dt>,
      <dd dangerouslySetInnerHTML={{__html: param.description}} />
      /* jshint ignore:end */
    ];
  }),
});
