const F = require('fkit')
const React = require('react')
const createClass = require('create-react-class')

const FunctionsComponent = require('./functions_component')
const HeaderComponent = require('./header_component')

/**
 * Represents a class definition.
 *
 * @class ClassComponent
 */
module.exports = createClass({
  displayName: 'ClassComponent',

  render: function() {
    return (
      /* jshint ignore:start */
      <section className="class">
        <HeaderComponent name={this.props.name} summary={this.props.summary} description={this.props.description} />
        <FunctionsComponent showStaticFunctions="true" functions={this.props.functions} />
      </section>
      /* jshint ignore:end */
    );
  },
});
