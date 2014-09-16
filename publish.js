var fs   = require('fs'),
    main = require('./build/main'),
    path = require('path');

exports.publish = function(db, opts) {
  var html     = main.render(db, opts);
      filename = path.join(opts.destination, 'test.html');

  fs.writeFileSync(filename, html);
};
