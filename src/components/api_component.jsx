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
      <section className="api">
        <section className="index">
          <h1 className="page-header">API</h1>
          <ul>{this.renderIndex()}</ul>
        </section>
        <section className="modules">
          <h2 className="page-header">Modules</h2>
          {this.renderModules(this.props.modules)}
        </section>
        <section className="classes">
          <h2 className="page-header">Classes</h2>
          {this.renderClasses(this.props.classes)}
        </section>
      </section>
      /* jshint ignore:end */
    );
  },

  renderIndex: function() {
    return F.map(this.renderAnchor, F.concat(this.props.modules, this.props.classes));
  },

  renderAnchor: function(item) {
    return (
      /* jshint ignore:start */
      <li key={item.key}><a href={'#' + item.name}>{item.name} &mdash; {item.summary}</a></li>
      /* jshint ignore:end */
    );
  },


  renderClasses: F.map(ClassComponent),
  renderModules: F.map(ModuleComponent),
});
