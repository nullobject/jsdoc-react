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
        <table className="table table-bordered table-condensed">
          <tbody>{this.renderParams(this.props.params)}</tbody>
        </table>
      </section>
      /* jshint ignore:end */
    ) : null;
  },

  renderParams: F.map(function(param, i) {
    return (
      /* jshint ignore:start */
      <tr key={'term-' + i}>
        <td className="name"><code>{param.name}</code></td>
        <td className="description" dangerouslySetInnerHTML={{__html: param.description}}></td>
      </tr>
      /* jshint ignore:end */
    );
  }),
});
