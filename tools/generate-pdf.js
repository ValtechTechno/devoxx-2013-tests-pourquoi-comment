casper.echo("Generate screenshots from slides");

casper.start("http://"+casper.cli.options.domain+"/", function() {

    this.test.assertTitle("[Devoxx 2013] Les tests : pourquoi et comment ?");

    this.click('#title');


    var slideNb = this.evaluate(function() {
        return window.slideList.length;
    });

    for(var i = 1; i <= slideNb; i++) {
        helpers.capture("slide-" + (i < 10 ? "0"+i : i));
        this.evaluate(function(i) {
            window.goToSlide(i);
        }, i);
    }
});

casper.run(function() {
    this.test.done();
});
