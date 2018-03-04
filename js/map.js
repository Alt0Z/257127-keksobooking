'use strict';

var getRandomIndex = function () {
  return Math.floor(Math.random() * window.COMPARATION_INDEX);
};

window.hotelTitles = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
].sort(getRandomIndex);

window.hotelPhotos = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
].sort(getRandomIndex);

window.hotelTypes = ['flat', 'house', 'bungalo'];
window.checkinTimes = ['12:00', '13:00', '14:00'];
window.checkoutTimes = ['12:00', '13:00', '14:00'];
window.hotelFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'].sort(window.getRandomIndex);
window.similarOffers = [];

window.generateOffers(8);

var map = document.querySelector('.map');

var mapPins = document.querySelector('.map__pins');

var fieldsets = document.querySelectorAll('fieldset');
var noticeForm = document.querySelector('.notice__form');

var activateMap = function () {
  map.classList.remove('map--faded');
  noticeForm.classList.remove('notice__form--disabled');
  for (var i = 0; i < fieldsets.length; i++) {
    fieldsets[i].removeAttribute('disabled');
  }
  mapPins.appendChild(window.renderPin(window.similarOffers));
  mapPins.querySelector('article').style.display = 'hidden';
};

var onMainPinUp = function () {
  var pinX = (Math.round(window.getCoords(window.mainPinButton).left));
  var pinY = (Math.round(window.getCoords(window.mainPinButton).top));
  window.address.value = pinX + ', ' + pinY;

  if (!window.isMapActive()) {
    activateMap();
    window.mainPinButton.removeEventListener('mouseup', onMainPinUp);
  }
};

window.onClick = function (evt) {
  for (var i = 0; i < window.similarOffers.length; i++) {
    if (evt.currentTarget.classList.contains('el-' + i)) {
      mapPins.insertBefore(window.renderCard(window.similarOffers[i]), mapPins.lastChild);
    }
  }
};

window.mainPinButton.addEventListener('mouseup', onMainPinUp);
