'use strict';

require('node-jsx').install({extension: '.jsx'})

var fs     = require('fs'),
    path   = require('path'),
    wrench = require('wrench'),
    F      = require('fkit'),
    React  = require('react');

var ModuleComponent = require('./components/module_component'),
    PageComponent   = require('./components/page_component');

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

function compareByName(a, b) { return F.compare(a.name, b.name); }

function run(query, p) {
  return query(function() {
    return p(this);
  });
}

// Returns the modules which are mixed into a module.
var moduleMixins = F.curry(function(db, module) {
  var p = mixedInto(module);
  return run(db, p);
});

// Returns functions which are members of a module.
var moduleFunctions = F.curry(function(db, module) {
  var p = F.whereAll([kind('function'), memberOf(module.longname)]);
  return run(db, p).get();
});

function buildModules(db) {
  var modules = run(db, F.whereAll([isPublic, kind('module')])).order('name');

  return modules.map(function(module) {
    var mixins = moduleMixins(db, module).get();

    var functions = F
      .concatMap(moduleFunctions(db), F.concat(module, mixins))
      .sort(compareByName);

    // Merge the functions into the module object.
    return F.copy({
      functions: functions,
      key:       'module-' + module.name
    }, module);
  });
}

/**
 * The render function.
 */
exports.publish = function(db, opts) {
  db({undocumented: true}).remove();

  var srcDir   = path.join(__dirname, '..', 'build'),
      destDir  = path.resolve(opts.destination),
      filename = path.join(destDir, 'index.html'),
      modules  = buildModules(db),
      doctype  = '<!DOCTYPE html>',
      html     = renderComponent(PageComponent, modules.map(ModuleComponent));

  wrench.copyDirSyncRecursive(srcDir, destDir, {
    forceDelete:        true,
    preserveTimestamps: true
  });

  fs.writeFileSync(filename, doctype + html);
};
