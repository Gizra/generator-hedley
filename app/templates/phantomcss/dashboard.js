// Require and initialise PhantomCSS module. Paths are relative to CasperJs
// directory.
var phantomcss = require('./node_modules/phantomcss/phantomcss.js');

phantomcss.init({
  libraryRoot: './node_modules/phantomcss'
  // Reduce the default tolerance, to allow for different fonts to be created
  // on different systems.
  // Note that screenshots were created on an Ubuntu system, thus they might
  // fail when tested locally on other machines (e.g. Mac OSX)
  // mismatchTolerance: 1
});

casper.start('http://localhost:9000/#/login');

casper.viewport(1024, 768);

casper.waitForSelector('.signin-body', function() {
  this.echo('Verify login form');
  phantomcss.screenshot('#login', 'login-form');
});

casper.then(function() {
  // Login user.
  this.fill('#login', {
    'username': 'demo',
    'password': '1234'
  }, true);
});

casper.waitForUrl('http://localhost:9000/#/dashboard/1/events', function() {
  this.echo('Verify authors list in dashboard');
  phantomcss.screenshot('.authors-list', 'authors-list');
});

casper.then( function now_check_the_screenshots(){
  // Compare screenshots.
  phantomcss.compareAll();
});

casper.then( function end_it(){
  casper.test.done();
});

// Run tests.
casper.run(function(){
  console.log('\nTHE END.');
  phantom.exit(phantomcss.getExitStatus());
});
