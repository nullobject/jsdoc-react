/** @jsx React.DOM */

'use strict';

var F     = require('fkit'),
    React = require('react');

/**
 * Represents a list of parameters.
 *
 * @class ParamsComponent
 */
module.exports = React.createClass({
  render: function() {
    return this.props.params ? (
      /* jshint ignore:start */
      <section className="params">
        <h4>Parameters</h4>
        <dl className="dl-horizontal">{this.renderParams(this.props.params)}</dl>
      </section>
      /* jshint ignore:end */
    ) : null;
  },

  renderParams: F.concatMap(function(param) {
    return [
      /* jshint ignore:start */
      <dt><code>{param.name}</code> {F.surround('{', '}', param.type.names.join('|'))}</dt>,
      <dd dangerouslySetInnerHTML={{__html: param.description}} />
      /* jshint ignore:end */
    ];
  }),
});
