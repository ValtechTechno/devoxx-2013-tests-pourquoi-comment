casper.test.comment("Check OK button presence and label");

casper.start("http://"+casper.cli.options.domain+"/#/session", function() {

    this.test.assertExists('button.btn-primary', "OK button should be present");
    this.test.assertSelectorHasText('button.btn-primary', 'ok');

});

casper.run(function() {
    this.test.done();
});
