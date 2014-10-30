'use strict';

var React = require('react');

/**
 * Represents a label.
 *
 * @class LabelComponent
 */
module.exports = React.createClass({
  displayName: 'LabelComponent',

  render: function() {
    var s = [this.props.className, 'label', this.props.type].join(' ');
    return (
      /* jshint ignore:start */
      <span className={s}>{this.props.text}</span>
      /* jshint ignore:end */
    );
  },
});
