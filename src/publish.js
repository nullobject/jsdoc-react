'use strict';

require('node-jsx').install({extension: '.jsx'});

var data   = require('./data'),
    fs     = require('fs'),
    path   = require('path'),
    wrench = require('wrench'),
    F      = require('fkit'),
    React  = require('react');

var DocumentComponent = require('./components/document_component');

function copyFunction(a) {
  return F.copy({
    key: 'function-' + a.name
  }, a);
}

function copyModule(a, bs) {
  return F.copy({
    key: 'module-' + a.name,
    functions: bs
  }, a);
}

function copyClass(a, bs) {
  return F.copy({
    key: 'class-' + a.name,
    functions: bs
  }, a);
}

/**
 * Builds the modules from the database object `db`.
 */
function buildModules(db) {
  var modules = data.findModules(db).order('name');

  return modules.map(function(module) {
    var mixins = data.findModuleMixins(db, module).get(),
        searchModules = F.append(module, mixins);

    var functions = data
      .findChildFunctions(db, searchModules)
      .order('name')
      .map(copyFunction);

    return copyModule(module, functions);
  });
}

/**
 * Builds the classes from the database object `db`.
 */
function buildClasses(db) {
  var classes = data.findClasses(db).order('name');

  return classes.map(function(klass) {
    var functions = data
      .findChildFunctions(db, [klass])
      .order('name')
      .map(copyFunction);

    return copyClass(klass, functions);
  });
}

/**
 * The publish function.
 *
 * @author Josh Bassett
 */
exports.publish = function(db, options) {
  db({undocumented: true}).remove();

  var srcDir   = path.join(__dirname, '..', 'build'),
      destDir  = path.resolve(options.destination),
      filename = path.join(destDir, 'index.html'),
      doctype  = '<!DOCTYPE html>',
      doc      = DocumentComponent({classes: buildClasses(db), modules: buildModules(db), readme: options.readme}),
      html     = React.renderComponentToStaticMarkup(doc);

  wrench.copyDirSyncRecursive(srcDir, destDir, {
    forceDelete:        true,
    preserveTimestamps: true
  });

  fs.writeFileSync(filename, doctype + html);
};
