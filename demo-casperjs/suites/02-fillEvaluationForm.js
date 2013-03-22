casper.test.comment("Filling evaluation functional tests");

casper.start("http://"+casper.cli.options.domain+"/#/session/TEST/attendees", function() {

    this.test.assertExists('#attendeesContainer table tr', "Attendees table should be present");

    this.click('#attendeesContainer table tr:nth-child(3)'); // Click on 3rd attendee

    this.waitForText("Informations participant :");
});

casper.then(function() {

    this.fill('#attendeesContainer form', {
        'firstName': 'Mathias',
        'lastName': 'DUPADIOU',
        'company': 'NoSqlForUs'
    }, false);

    this.click('#attendeesContainer form button[type="submit"]');

    this.waitForSelector('#evalContainer'); // Wait evaluation form
});

casper.then(function() {

    this.fill('#evalContainer form', {
        'expectation-met': 'oui',
        'tell-friends': 'oui'
    }, false);

    this.click('#evalContainer form button[type="submit"]');

    this.waitForSelector('#sessionFormContainer');
});

casper.then(function() {

    this.test.assertSelectorHasText("#alertMessage strong", "Succès", "Alert message should contains 'Succès'");

});

casper.run(function() {
    this.test.done();
});
