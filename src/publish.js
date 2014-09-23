'use strict';

require('node-jsx').install({extension: '.jsx'});

var data   = require('./data'),
    fs     = require('fs'),
    path   = require('path'),
    wrench = require('wrench'),
    F      = require('fkit'),
    React  = require('react');

var APIComponent  = require('./components/api_component'),
    PageComponent = require('./components/page_component');

var DOCTYPE = '<!DOCTYPE html>';

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

// Renders the component `a` with the child component `b`.
function render(a, b) {
  return React.renderComponentToStaticMarkup(a(null, b));
}

function renderReadme(readme) {
  return DOCTYPE + render(PageComponent, React.DOM.div({dangerouslySetInnerHTML: {__html: readme}}));
}

function renderAPI(classes, modules) {
  var api = APIComponent({classes: classes, modules: modules});
  return DOCTYPE + render(PageComponent, api);
}

/**
 * The publish function.
 *
 * @author Josh Bassett
 */
exports.publish = function(db, options) {
  db({undocumented: true}).remove();

  var srcDir  = path.join(__dirname, '..', 'build'),
      destDir = path.resolve(options.destination);

  wrench.copyDirSyncRecursive(srcDir, destDir, {
    forceDelete:        true,
    preserveTimestamps: true
  });

  fs.writeFileSync(path.join(destDir, 'index.html'), renderReadme(options.readme));
  fs.writeFileSync(path.join(destDir, 'api.html'), renderAPI(buildClasses(db), buildModules(db)));
};
