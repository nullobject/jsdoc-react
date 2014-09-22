/** @jsx React.DOM */

'use strict';

var F     = require('fkit'),
    React = require('react');

var ClassComponent  = require('./module_component'),
    ModuleComponent = require('./module_component');

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
          <link href="style.css" rel="stylesheet" />
          <script src="app.js" />
        </head>
        <body>
          <div className="container">
            <section className="readme" dangerouslySetInnerHTML={{__html: this.props.readme}} />
            <section className="modules">
              <h1 className="page-header">Modules</h1>
              {this.renderModules(this.props.modules)}
            </section>
            <section className="classes">
              <h1 className="page-header">Classes</h1>
              {this.renderClasses(this.props.classes)}
            </section>
          </div>
        </body>
      </html>
      /* jshint ignore:end */
    );
  },

  renderClasses: F.map(ClassComponent),
  renderModules: F.map(ModuleComponent),
});
