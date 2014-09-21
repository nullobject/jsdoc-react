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

// Returns true if module `b` is of the kind `a`.
var kind = F.curry(function(a, b) {
  return b.kind === a;
});

// Returns true if the module `a` is a member of the list of modules `as`.
var memberOf = F.curry(function(as, a) {
  return a.memberof ? F.elem(a.memberof, as.map(F.get('longname'))) : false;
});

// Returns true if the module `a` mixes module `b`.
var mixedInto = F.curry(function(a, b) {
  return a.mixes ? F.elem(b.longname, a.mixes) : false;
});

// Returns true if the module is public.
var isPublic = function(a) {
  return a.access ? a.access !== 'private' : true;
};

// Runs the predicate `p` on the database `db`.
function run(db, p) {
  return db(function() {
    return p(this);
  });
}

// Finds all modules.
function findModules(db) {
  return run(db, F.whereAll([isPublic, kind('module')]));
}

// Finds the modules which are mixed into a module.
function findModuleMixins(db, module) {
  var p = mixedInto(module);
  return run(db, p);
}

// Finds the functions which belong to any module in the list of modules.
function findModuleFunctions(db, modules) {
  var p = F.whereAll([kind('function'), memberOf(modules)]);
  return run(db, p);
}

// Builds the module objects.
function buildModules(db) {
  var modules = findModules(db).order('name');

  return modules.map(function(module) {
    var mixins        = findModuleMixins(db, module).get(),
        searchModules = F.append(module, mixins),
        functions     = findModuleFunctions(db, searchModules).order('name');

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
