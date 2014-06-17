define('features/extra', [
  'extra/validator/date'
], function () {

  return function (ParsleyValidator) {
    describe('ParsleyExtras validators', function () {
      it('should have dateiso validator', function () {
        expect(window.ParsleyConfig.validators).to.have.key('dateiso');
        var parsleyValidator = new ParsleyValidator(window.ParsleyConfig.validators);

        expect(parsleyValidator.validate('', parsleyValidator.validators.dateiso())).not.to.be(true);
        expect(parsleyValidator.validate('foo', parsleyValidator.validators.dateiso())).not.to.be(true);
        expect(parsleyValidator.validate('1986-30-01', parsleyValidator.validators.dateiso())).not.to.be(true);
        expect(parsleyValidator.validate('1986-12-45', parsleyValidator.validators.dateiso())).not.to.be(true);
        expect(parsleyValidator.validate('1986-12-01', parsleyValidator.validators.dateiso())).to.be(true);
      });
      it('should have date validator', function () {
        expect(window.ParsleyConfig.validators).to.have.key('date');
        var parsleyValidator = new ParsleyValidator(window.ParsleyConfig.validators);

        expect(parsleyValidator.validate('', parsleyValidator.validators.date())).not.to.be(true);
        expect(parsleyValidator.validate('foo', parsleyValidator.validators.date())).not.to.be(true);
        expect(parsleyValidator.validate('2014-06-16', parsleyValidator.validators.date())).to.be(true);
        expect(parsleyValidator.validate('2014-06-16T17:00', parsleyValidator.validators.date())).to.be(true);
      });
      it('should have a datebefore validator', function () {
        expect(window.ParsleyConfig.validators).to.have.key('datebefore');
        var parsleyValidator = new ParsleyValidator(window.ParsleyConfig.validators);

        // expect(parsleyValidator.validate('', parsleyValidator.validators.datebefore('foo'))).to.be(true);

        $('body').append('<input type="text" id="element" data-parsley-datebefore="#before-one,#before-two" value="2014-08-16T17:00" />');
        $('body').append('<input type="text" id="before-one" value="2014-05-16T17:00" />');
        $('body').append('<input type="text" id="before-two" value="2014-07-16T17:00" />');

        expect($('#element').psly().isValid()).to.be(false);
        $('#element').val('2014-06-16T17:00');
        expect($('#element').psly().isValid()).to.be(false);
        $('#element').val('2014-04-16T17:00');
        expect($('#element').psly().isValid()).to.be(true);

        $('#element').remove();
        $('#before-one').remove();
        $('#before-two').remove();
      });
      it('should have a dateafter validator', function () {
        expect(window.ParsleyConfig.validators).to.have.key('dateafter');
        var parsleyValidator = new ParsleyValidator(window.ParsleyConfig.validators);

        // expect(parsleyValidator.validate('', parsleyValidator.validators.dateafter('foo'))).to.be(true);

        $('body').append('<input type="text" id="element" data-parsley-dateafter="#after-one,#after-two" value="2014-06-16T17:00" />');
        $('body').append('<input type="text" id="after-one" value="2014-05-16T17:00" />');
        $('body').append('<input type="text" id="after-two" value="2014-07-16T17:00" />');

        expect($('#element').psly().isValid()).to.be(false);
        $('#element').val('2014-06-16T17:00');
        expect($('#element').psly().isValid()).to.be(false);
        $('#element').val('2015-08-16T17:00');
        expect($('#element').psly().isValid()).to.be(true);

        $('#element').remove();
        $('#after-one').remove();
        $('#after-two').remove();
      });

      it('should have a bind.js plugin allowing to give pure json validation config to parsley constructor', function (done) {
        require(['extra/plugin/bind'], function () {
          $('body').append(
          '<form id="element" >' +
            '<input type="text" name="name" />' +
            '<input type="text" name="email" id="email" />' +
            '<input type="checkbox" name="sexe" id="sexe" value="male" />' +
            '<input type="checkbox" name="sexe" value="female" />' +
          '</form>');

        var parsleyInstance = $('#element').parsley({
          fields: {
            '[name="name"]': {
              required: true,
              length: [4, 20]
            },
            '#email': {
              type: 'email'
            },
            '#sexe': {
              required: true
            }
          }
        });
        expect($('[name="name"]').parsley().constraints.length).to.be(2);
        expect($('#email').parsley().constraints.length).to.be(1);
        expect($('#sexe').parsley().constraints.length).to.be(1);
        expect($('#sexe').parsley().constraints[0].name).to.be('required');
        done();
        });
      });
      afterEach(function () {
        if ($('#element').length)
          $('#element').remove();

        if ($('.parsley-errors-list').length)
          $('.parsley-errors-list').remove();
      });
    });
  };
});
