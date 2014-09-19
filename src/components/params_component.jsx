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
  displayName: 'ParamsComponent',

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

  renderParams: F.concatMap(function(param, i) {
    return [
      /* jshint ignore:start */
      <dt key={'term-' + i}><code>{param.name}</code> {F.surround('{', '}', param.type.names.join('|'))}</dt>,
      <dd key={'description-' + i} dangerouslySetInnerHTML={{__html: param.description}} />
      /* jshint ignore:end */
    ];
  }),
});
