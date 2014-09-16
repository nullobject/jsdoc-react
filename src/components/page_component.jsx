/** @jsx React.DOM */

'use strict';

var React = require('react');

require('../style.less');

/**
 * Represents a HTML page.
 *
 * @class ModuleComponent
 */
module.exports = React.createClass({
  render: function() {
    return (
      /* jshint ignore:start */
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>JSDoc React</title>
          <link rel="stylesheet" href="http://cdnjs.cloudflare.com/ajax/libs/highlight.js/8.2/styles/github.min.css" />
          <script src="http://cdnjs.cloudflare.com/ajax/libs/highlight.js/8.2/highlight.min.js" />
          <link rel="stylesheet" href="style.css" />
          <script src="http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min.js" />
          <script>hljs.initHighlightingOnLoad();</script>
        </head>
        <body>
          <div className="container">{this.props.children}</div>
        </body>
      </html>
      /* jshint ignore:end */
    );
  },
});
