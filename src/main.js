'use strict';

var F               = require('fkit'),
    ModuleComponent = require('./components/module_component.jsx'),
    PageComponent   = require('./components/page_component.jsx'),
    React           = require('react');

var renderComponent = F.curry(function(component, child) {
  return React.renderComponentToStaticMarkup(component(null, child));
});

var kind     = function(a) { return F.compose(F.eql(a), F.get('kind')); },
    memberof = function(a) { return F.compose(F.eql(a), F.get('memberof')); };

function compareByName(a, b) {
  if (a.name > b.name) {
    return 1;
  } else if (a.name < b.name) {
    return -1;
  } else {
    return 0;
  }
}

function parseModules(data) {
  var modules = F.filter(kind('module'), data).sort(compareByName);

  return modules.map(function(module) {
    var p = F.whereAll([kind('function'), memberof(module.longname)]),
        functions = data.filter(p).sort(compareByName);

    // Merge the functions into the module.
    return F.copy({functions: functions}, module);
  });
}

/**
 * The main module.
 *
 * @module main
 */
module.exports = {
  render: function(db, opts) {
    db({undocumented: true}).remove();

    var data    = db().get(),
        modules = parseModules(data),
        html    = renderComponent(PageComponent, modules.map(ModuleComponent));

    return '<!DOCTYPE html>' + html;
  }
};
