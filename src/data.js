'use strict';

var F = require('fkit');

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

// Runs the predicate `p` on the database object `db`.
function run(db, p) {
  return db(function() {
    return p(this);
  });
}

/**
 * This module defines data operations.
 *
 * @module data
 * @author Josh Bassett
 */
module.exports = {
  // Finds all classes.
  findClasses: function(db) {
    return run(db, F.whereAll([isPublic, kind('class')]));
  },

  // Finds all modules.
  findModules: function(db) {
    return run(db, F.whereAll([isPublic, kind('module')]));
  },

  // Finds the modules which are mixed into a module.
  findModuleMixins: function(db, a) {
    var p = mixedInto(a);
    return run(db, p);
  },

  // Finds the functions which belong to any doclet in the list of `as`.
  findChildFunctions: function(db, as) {
    var p = F.whereAll([isPublic, kind('function'), memberOf(as)]);
    return run(db, p);
  },
};
