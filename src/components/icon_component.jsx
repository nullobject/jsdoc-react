const React = require('react')
const createClass = require('create-react-class')

/**
 * Represents an icon.
 *
 * @class IconComponent
 */
module.exports = createClass({
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
