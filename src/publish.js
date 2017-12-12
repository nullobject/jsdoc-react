/* global env */

require('node-jsx').install({extension: '.jsx'})

const F = require('fkit')
const React = require('react')
const ReactDOMServer = require('react-dom/server')
const data = require('./data')
const fs = require('fs-extra')
const path = require('path')

const APIComponent = React.createFactory(require('./components/api_component'))
const PageComponent = React.createFactory(require('./components/page_component'))

const DOCTYPE = '<!DOCTYPE html>'

function copyFunction (fn) {
  return F.copy({
    key: 'function-' + fn.name
  }, fn)
}

function copyModule (module, fns) {
  return F.copy({}, module, {
    key: 'module-' + module.name,
    name: F.replace(/\//g, '.', module.name),
    functions: fns
  })
}

function copyClass (klass, fns) {
  return F.copy({}, klass, {
    key: 'class-' + klass.name,
    name: F.replace(/\//g, '.', klass.name),
    functions: fns
  })
}

/**
 * Builds the modules from the database object `db`.
 */
function buildModules (db) {
  const modules = data.findModules(db).order('name')

  return modules.map(function (module) {
    const mixins = data.findModuleMixins(db, module).get()
    const searchModules = F.append(module, mixins)

    const fns = data
      .findChildFunctions(db, searchModules)
      .order('name')
      .map(copyFunction)

    return copyModule(module, fns)
  })
}

/**
 * Builds the classes from the database object `db`.
 */
function buildClasses (db) {
  const classes = data.findClasses(db).order('name')

  return classes.map(function (klass) {
    const fns = data
      .findChildFunctions(db, [klass])
      .order('name')
      .map(copyFunction)

    return copyClass(klass, fns)
  })
}

function renderPage (title, component) {
  return DOCTYPE + ReactDOMServer.renderToStaticMarkup(PageComponent({title: title}, component))
}

function renderPageToFile (filename, title, component) {
  fs.writeFileSync(filename, renderPage(title, component))
}

function publishReadme (filename, title, readme) {
  renderPageToFile(
    filename,
    title,
    React.createElement('div', {dangerouslySetInnerHTML: {__html: readme}})
  )
}

function publishAPI (filename, title, db) {
  const classes = buildClasses(db)
  const modules = buildModules(db)

  renderPageToFile(
    filename,
    title,
    APIComponent({title: title, classes: classes, modules: modules})
  )
}

/**
 * The publish function.
 *
 * @author Josh Bassett
 */
exports.publish = function (db, options) {
  db({undocumented: true}).remove()

  const title = env.conf.templates.title || 'JSDoc React'
  const srcDir = path.join(__dirname, '..', 'build')
  const destDir = path.resolve(options.destination)

  fs.copySync(srcDir, destDir, {
    forceDelete: true,
    preserveTimestamps: true
  })

  if (options.readme) {
    publishReadme(path.join(destDir, 'index.html'), title, options.readme)
  }

  publishAPI(path.join(destDir, 'api.html'), title + ' API', db)
}
