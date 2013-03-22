// CasperJS common initialization
casper.options.verbose = true;
casper.options.exitOnError = false;
casper.options.viewportSize = {
    width: 1280,
    height: 800
};

// Log client message !
casper.on('remote.message', function(message) {
    console.log(message);
});

// Test helpers
var helpers = {};
helpers.failsCapture = 0;

helpers.capture = function(name) {
    var path = 'dist/screenshots/' + name + '.png';
    casper.echo('saving screenshot to '+path);
    casper.capture(path, {
        top: 0,
        left: 0,
        width: 1280,
        height: 800 
    });
};

// Save a screenshot when an assertion fails
casper.test.on("fail", function(failure) {
    var fileName = failure.file.split("/");
    fileName = fileName[fileName.length-1].split('.')[0];    
    helpers.capture('fail-' + failure.type + '-' + fileName + (helpers.failsCapture++));
});

