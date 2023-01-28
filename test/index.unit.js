'use strict';

var should = require('chai').should();

describe('Index Exports', function() {
  it('will export lbchcore-lib', function() {
    var lbchcore = require('../');
    should.exist(lbchcore.lib);
    should.exist(lbchcore.lib.Transaction);
    should.exist(lbchcore.lib.Block);
  });
});
