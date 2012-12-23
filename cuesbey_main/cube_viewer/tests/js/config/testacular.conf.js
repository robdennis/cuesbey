basePath = '../';

files = [
  JASMINE,
  JASMINE_ADAPTER,
  '../../static/js/lib/jquery-*.js',
  '../../static/js/lib/angular/angular.js',
  '../../static/js/lib/angular/angular-*.js',
  'lib/angular/angular-mocks.js',
  '../../static/js/**/*.js',
  'unit/test_data.js',
  'unit/**/*.js'
];

autoWatch = true;

browsers = ['Chrome'];

junitReporter = {
  outputFile: 'test_out/unit.xml',
  suite: 'unit'
};
