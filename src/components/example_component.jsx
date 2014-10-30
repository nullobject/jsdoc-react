'use strict';

var React = require('react');

/**
 * Represents a code example.
 *
 * @class ExampleComponent
 */
module.exports = React.createClass({
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
