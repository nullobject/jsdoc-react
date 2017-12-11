const React = require('react')
const createClass = require('create-react-class')

/**
 * Represents a label.
 *
 * @class LabelComponent
 */
module.exports = createClass({
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
