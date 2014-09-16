var F     = require('fkit');
var React = require('react');

var HeaderComponent = React.createClass({
  render: function() {
    return React.DOM.header({},
      React.DOM.p({}, this.props.name),
      React.DOM.div({dangerouslySetInnerHTML: {__html: this.props.description}})
    );
  }
});

var ParamComponent = React.createClass({
  render: function() {
    return React.DOM.li({},
      React.DOM.p({}, this.props.name),
      React.DOM.div({dangerouslySetInnerHTML: {__html: this.props.description}})
    );
  }
});

var FunctionComponent = React.createClass({
  render: function() {
    return React.DOM.div({},
      HeaderComponent(this.props),
      React.DOM.p({}, this.props.memberof),
      React.DOM.ul({}, F.map(ParamComponent, this.props.params))
    );
  }
});

var ModuleComponent = React.createClass({
  render: function() {
    return React.DOM.div({}, HeaderComponent(this.props));
  }
});

var renderComponent = F.curry(function(f, a) {
  return React.renderComponentToStaticMarkup(f(a));
});

var kind = function(a) { return F.compose(F.eql(a), F.get('kind')); };

exports.publish = function(db, opts) {
  db({undocumented: true}).remove();

  var data = db().get();

  var modules   = F.filter(kind('module'), data),
      functions = F.filter(kind('function'), data);

  // console.log(F.map(renderComponent(ModuleComponent), modules));
  console.log(F.map(renderComponent(FunctionComponent), functions));
};
