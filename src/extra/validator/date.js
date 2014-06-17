// date extra validator
// Guillaume Potier
window.ParsleyConfig = window.ParsleyConfig || {};
window.ParsleyConfig.validators = window.ParsleyConfig.validators || {};

window.ParsleyConfig.validators.dateiso = {
  fn: function (value) {
    return /^(\d{4})\D?(0[1-9]|1[0-2])\D?([12]\d|0[1-9]|3[01])$/.test(value);
  },
  priority: 256
};

// add simple date validator (accepts ISO 8601 formats with time, for example)
window.ParsleyConfig.validators.date = {
  fn: function (value) {
  var d = new Date(value);
    return !isNaN(d.getTime());
  },
  priority: 256
};

//add datebefore validator
window.ParsleyConfig.validators.datebefore = {
  requirementsTransformer: function (requirements) {
    // Requirements here have to be a `jQuery style` selector, so as we are able to check multiple dates
    return $(requirements);
  },
  fn: function (value, $dateInputs) {
    var datesToCheck = [],
      smallestDate = '',
      inputDate = new Date(value);

    // Store dates
    $dateInputs.each(function () {
      datesToCheck.push(new Date($(this).val()));
    });

    // Date has to be before the smallest date
    for (var i = datesToCheck.length - 1; i >= 0; i--) {
      if ('' === smallestDate || datesToCheck[i].getTime() < smallestDate.getTime()) {
        smallestDate = datesToCheck[i];
      }
    }

    // Do the check
    return '' === smallestDate || inputDate.getTime() < smallestDate.getTime();
  },
  priority: 128
};

//add dateafter validator
window.ParsleyConfig.validators.dateafter = {
  requirementsTransformer: function (requirements) {
    // Requirements here have to be a `jQuery style` selector, so as we are able to check multiple dates
    return $(requirements);
  },
  fn: function (value, $dateInputs) {
    var datesToCheck = [],
      biggestDate = '',
      inputDate = new Date(value);

    // Store dates
    $dateInputs.each(function () {
      datesToCheck.push(new Date($(this).val()));
    });

    // Date has to be before the smallest date
    for (var i = datesToCheck.length - 1; i >= 0; i--) {
      if ('' === biggestDate || datesToCheck[i].getTime() > biggestDate.getTime()) {
        biggestDate = datesToCheck[i];
      }
    }

    // Do the check
    return '' === biggestDate || inputDate.getTime() > biggestDate.getTime();
  },
  priority: 128
};
