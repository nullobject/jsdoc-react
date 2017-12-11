const React = require('react')
const createClass = require('create-react-class')

/**
 * Represents a code example.
 *
 * @class ExampleComponent
 */
module.exports = createClass({
  render: function() {
    return (
      /* jshint ignore:start */
      <section className="example">
        <h4>Example</h4>
        <pre><code className="lang-js">{this.props.example}</code></pre>
      </section>
      /* jshint ignore:end */
    );
  },
});
