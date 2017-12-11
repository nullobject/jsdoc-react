const F = require('fkit')
const React = require('react')
const createClass = require('create-react-class')

/**
 * Represents a HTML page.
 *
 * @class ModuleComponent
 */
module.exports = createClass({
  displayName: 'PageComponent',

  render: function() {
    return (
      /* jshint ignore:start */
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>{this.props.title}</title>
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
