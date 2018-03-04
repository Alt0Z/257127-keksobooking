'use strict';

(function () {
  var getFeatures = function () {
    var featuresLength = window.getRandomInteger(1, window.hotelFeatures.length - 1);
    var features = [];

    for (var i = 0; i < featuresLength; i++) {
      features[i] = window.hotelFeatures[i];
    }

    return features;
  };

  window.generateOffers = function (index) {
    for (var i = 0; i < index; i++) {
      var location = [window.getRandomInteger(window.MIN_LOCATION_X, window.MAX_LOCATION_X), window.getRandomInteger(window.MIN_LOCATION_Y, window.MAX_LOCATION_Y)];
      window.similarOffers[i] = {
        'author': {
          'avatar': 'img/avatars/user0' + (i + 1) + '.png'
        },

        'offer': {
          'title': window.hotelTitles[i],
          'address': [location[0], location[1]],
          'price': window.getRandomInteger(window.MIN_PRICE, window.MAX_PRICE),
          'type': window.hotelTypes[window.getRandomInteger(0, (window.hotelTypes.length - 1))],
          'rooms': window.getRandomInteger(1, 5),
          'guests': window.getRandomInteger(window.MIN_GUESTS_INDEX, window.MAX_GUESTS_INDEX),
          'checkin': window.checkinTimes[window.getRandomInteger(0, window.checkinTimes.length - 1)],
          'checkout': window.checkoutTimes[window.getRandomInteger(0, window.checkoutTimes.length - 1)],
          'features': getFeatures(),
          'description': '',
          'photos': window.hotelPhotos
        },

        'location': {
          'x': location[0],
          'y': location[1]
        }
      };
    }
  };
})();
