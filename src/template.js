'use strict';

var F     = require('fkit'),
    React = require('react');

var ModuleComponent = require('./components/module_component.jsx'),
    PageComponent   = require('./components/page_component.jsx');

var renderComponent = F.curry(function(component, child) {
  return React.renderComponentToStaticMarkup(component(null, child));
});

var kind     = function(a) { return F.compose(F.eql(a), F.get('kind')); },
    memberOf = function(a) { return F.compose(F.eql(a), F.get('memberof')); };

var isPublic = function(a) {
  return a.access ? a.access !== 'private' : true;
};

var mixedInto = F.curry(function(a, b) {
  return a.mixes ? F.elem(b.longname, a.mixes) : false;
});

var moduleWithKey = function(m) {
  return F.copy({key: 'module-' + m.name}, m);
};

function compareByName(a, b) { return F.compare(a.name, b.name); }

// Returns functions which are members of a module.
var moduleFunctions = F.curry(function(data, module) {
  var p = F.whereAll([kind('function'), memberOf(module.longname)]);
  return data.filter(p);
});

// Returns the modules which are mixed into a module.
var moduleMixins = F.curry(function(data, module) {
  var p = mixedInto(module);
  return data.filter(p);
});

function buildModules(data) {
  var modules = F.filter(F.whereAll([isPublic, kind('module')]), data).sort(compareByName);

  return modules.map(function(module) {
    var mixins = moduleMixins(data, module);

    var functions = F
      .concatMap(moduleFunctions(data), F.concat(module, mixins))
      .sort(compareByName);

    // Merge the functions into the module object.
    return F.copy({functions: functions}, module);
  });
}

/**
 * The render function.
 */
exports.render = function(db, opts) {
  db({undocumented: true}).remove();

  var data     = db().get(),
      modules  = buildModules(data),
      html     = renderComponent(PageComponent, modules.map(F.compose(ModuleComponent, moduleWithKey))),
      doctype  = '<!DOCTYPE html>';

  return doctype + html;
};
