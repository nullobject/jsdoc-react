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
          <link rel="stylesheet" href="style.css" />
          <script src="app.js" />
        </head>
        <body>
          <div className="container">{this.props.children}</div>
        </body>
      </html>
      /* jshint ignore:end */
    );
  },
});
