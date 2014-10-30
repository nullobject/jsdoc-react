'use strict';

var F     = require('fkit'),
    React = require('react');

var ClassComponent  = require('./class_component'),
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
          <h1>{this.props.title}</h1>
          <ul>{this.renderIndex()}</ul>
        </section>
        {this.renderModules(this.props.modules)}
        {this.renderClasses(this.props.classes)}
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
