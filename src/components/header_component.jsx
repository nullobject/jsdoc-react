const F = require('fkit')
const React = require('react')
const createClass = require('create-react-class')

/**
 * Represents a header.
 *
 * @class HeaderComponent
 */
module.exports = createClass({
  displayName: 'HeaderComponent',

  render: function() {
    return (
      /* jshint ignore:start */
      <header>
        <h2 id={this.props.name}>{this.props.name}</h2>
        <section className="summary" dangerouslySetInnerHTML={{__html: this.props.summary}} />
        <section className="description" dangerouslySetInnerHTML={{__html: this.props.description}} />
      </header>
      /* jshint ignore:end */
    );
  },
});
