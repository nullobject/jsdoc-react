'use strict';

require('node-jsx').install({extension: '.jsx'})

var data   = require('./data'),
    fs     = require('fs'),
    path   = require('path'),
    wrench = require('wrench'),
    F      = require('fkit'),
    React  = require('react');

var ModuleComponent = require('./components/module_component'),
    PageComponent   = require('./components/page_component');

var renderComponent = F.curry(function(component, child) {
  return React.renderComponentToStaticMarkup(component(null, child));
});

// Builds the module objects.
function buildModules(db) {
  var modules = data.findModules(db).order('name');

  return modules.map(function(module) {
    var mixins        = data.findModuleMixins(db, module).get(),
        searchModules = F.append(module, mixins),
        functions     = data.findModuleFunctions(db, searchModules).order('name');

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
