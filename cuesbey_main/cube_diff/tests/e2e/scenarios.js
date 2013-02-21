'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('cube_diff', function() {

  beforeEach(function() {
    browser().navigateTo('/static/cube_diff/index.html');
  });


  it('should pass a sanity check', function() {
    expect(browser().location().url()).toBe("");
  });

});
