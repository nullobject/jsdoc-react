'use strict';

var fs       = require('fs'),
    path     = require('path'),
    template = require('./build/template'),
    wrench   = require('wrench');

/**
 * The publish function.
 */
exports.publish = function(db, opts) {
  var srcDir   = path.join(__dirname, 'build'),
      destDir  = path.resolve(opts.destination),
      html     = template.render(db, opts),
      filename = path.join(destDir, 'index.html');

  wrench.copyDirSyncRecursive(srcDir, destDir, {
    forceDelete:        true,
    preserveTimestamps: true,
    exclude:            'template.js'
  });

  fs.writeFileSync(filename, html);
};
