basePath = '../';

files = [
  JASMINE,
  JASMINE_ADAPTER,
  '{{ djangular_root }}/static/lib/angular/angular.js',
  '{{ djangular_root }}/static/lib/angular/angular-*.js',
  '{{ djangular_root }}/tests/lib/angular/angular-mocks.js',
  '{{ djangular_root }}/templates/app.js',
// NOTE: Place other Javascript dependencies here.
  'cube_diff/tests/unit/**/test_data.js',
// JS Files to be tested: {% for app_path in app_paths %}
  '{{ app_path }}/app/js/**/*.js', // {% endfor %}
// JS Tests: {% for app_path in app_paths %}
  '{{ app_path }}/tests/unit/**/*.js', // {% endfor %}
];

autoWatch = true;

browsers = ['Chrome', 'Firefox', 'Safari'];

junitReporter = {
  outputFile: 'test_out/unit.xml',
  suite: 'unit'
};
