/** @jsx React.DOM */

'use strict';

var F     = require('fkit'),
    React = require('react');

var ModuleComponent = require('./module_component');

/**
 * Represents a HTML page.
 *
 * @class PageComponent
 */
module.exports = React.createClass({
  displayName: 'PageComponent',

  propTypes: {
    classes: React.PropTypes.array.isRequired,
    modules: React.PropTypes.array.isRequired,
  },

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
          <div className="container">
            <section className="readme" dangerouslySetInnerHTML={{__html: this.props.readme}} />
            {this.renderClasses(this.props.classes)}
            {this.renderModules(this.props.modules)}
          </div>
        </body>
      </html>
      /* jshint ignore:end */
    );
  },

  renderClasses: F.map(ModuleComponent),
  renderModules: F.map(ModuleComponent),
});
