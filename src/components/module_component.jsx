const F = require('fkit')
const React = require('react')
const createClass = require('create-react-class')

const FunctionsComponent = require('./functions_component')
const HeaderComponent = require('./header_component')

/**
 * Represents a module definition.
 *
 * @class ModuleComponent
 */
module.exports = createClass({
  displayName: 'ModuleComponent',

  render: function() {
    return (
      /* jshint ignore:start */
      <section className="module">
        <HeaderComponent name={this.props.name} summary={this.props.summary} description={this.props.description} />
        <FunctionsComponent showStaticFunctions="false" functions={this.props.functions} />
      </section>
      /* jshint ignore:end */
    );
  },
});
