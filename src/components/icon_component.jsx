'use strict';

var React = require('react');

/**
 * Represents an icon.
 *
 * @class IconComponent
 */
module.exports = React.createClass({
  displayName: 'IconComponent',

  render: function() {
    var s = [this.props.className, 'glyphicon', 'glyphicon-' + this.props.name].join(' ');
    return (
      /* jshint ignore:start */
      <span className={s} />
      /* jshint ignore:end */
    );
  },
});
