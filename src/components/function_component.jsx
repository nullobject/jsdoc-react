'use strict';

var F     = require('fkit'),
    React = require('react');

var ExampleComponent = require('./example_component'),
    IconComponent    = require('./icon_component'),
    LabelComponent   = require('./label_component'),
    ParamsComponent  = require('./params_component'),
    ReturnsComponent = require('./returns_component');

var HeaderComponent = React.createClass({
  labels: ['curried', 'deprecated', 'static'],

  render: function() {
    return (
      /* jshint ignore:start */
      <header id={this.props.name}>
        <h3>
          <a href={'#' + this.props.name}><code>{this.renderDefinition(this.props.name, this.props.params)}</code></a>
          {this.renderLabels()}
        </h3>
      </header>
      /* jshint ignore:end */
    );
  },

  renderLabels: function() {
    var self = this;

    var as = this.labels.reduce(function(a, b) {
      return (self.props[b] === true) ? F.append(self.renderLabel(b), a) : a;
    }, []);

    return F.concatMap(F.prepend(' '), as);
  },

  renderLabel: function(a) {
    return LabelComponent({key: a, text: a, type: a});
  },

  renderDefinition: function(name, params) {
    return params ? F.concat(name, this.renderParams(params)) : name;
  },

  renderParams: F.compose(
    F.surround('(', ')'),
    F.intersperse(', '),
    F.map(F.get('name'))
  ),
});

/**
 * Represents a function definition.
 *
 * @class FunctionComponent
 */
module.exports = React.createClass({
  displayName: 'FunctionComponent',

  render: function() {
    return (
      /* jshint ignore:start */
      <section className="function">
        <HeaderComponent
          name={this.props.name}
          params={this.props.params}
          static={this.static()}
          deprecated={this.deprecated()}
          curried={this.hasTag('curried')} />
        <p className="summary">{this.props.summary}</p>
        {this.renderDescription(this.props.description)}
        <ParamsComponent params={this.props.params} />
        {this.renderReturns(this.props.returns)}
        {this.renderExamples(this.props.examples || [])}
      </section>
      /* jshint ignore:end */
    );
  },

  renderDescription: function(description) {
    return description ? (
      /* jshint ignore:start */
      <section className="description">
        <h4>Discussion</h4>
        <div dangerouslySetInnerHTML={{__html: description}} />
      </section>
      /* jshint ignore:end */
    ) : null;
  },

  renderReturns: function(returns) {
    return returns ? ReturnsComponent({returns: returns[0]}) : null;
  },

  renderExamples: F.map(function(example, i) {
    return ExampleComponent({example: example, key: 'example-' + i})
  }),

  // Returns true if this is a deprecated function.
  deprecated: function() {
    return this.props.deprecated === true;
  },

  // Returns true if this is a static function.
  static: function() {
    return this.props.showStaticFunctions === 'true' && this.props.scope === 'static';
  },

  // Returns true if the function has the tag `t`.
  hasTag: function(t) {
    var title = function(a) { return F.compose(F.eq(a), F.get('title')); };
    return F.any(title(t), this.props.tags || []);
  },
});
