const F = require('fkit')
const React = require('react')
const createClass = require('create-react-class')

const FunctionComponent = React.createFactory(require('./function_component'))

/**
 * Represents a list of functions.
 *
 * @class FunctionsComponent
 */
module.exports = createClass({
  displayName: 'FunctionsComponent',

  render: function() {
    return this.props.functions ? (
      /* jshint ignore:start */
      <section className="functions">
        {this.renderFunctions(this.props.functions)}
      </section>
      /* jshint ignore:end */
    ) : null;
  },

  // Transfers the prop to the component.
  transfer: function(prop, component) {
    return F.compose(component, F.set(prop, this.props[prop]));
  },

  renderFunctions: function(as) {
    return F.map(this.transfer('showStaticFunctions', FunctionComponent), as);
  },
});
