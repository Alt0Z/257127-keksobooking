'use strict';

var COMPARATION_INDEX = 8;
var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;
var MIN_GUESTS_INDEX = 1;
var MAX_GUESTS_INDEX = 100;
var MIN_LOCATION_X = 300;
var MAX_LOCATION_X = 900;
var MIN_LOCATION_Y = 150;
var MAX_LOCATION_Y = 500;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var MAIN_PIN_WIDTH = 40;
var MAIN_PIN_HEIGHT = 44;
var AVATAR_SIZE = 40;
var PHOTO_SIZE = 50;

var getRandomIndex = function () {
  return Math.floor(Math.random() * COMPARATION_INDEX);
};

var hotelTitles = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
].sort(getRandomIndex);

var hotelPhotos = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
].sort(getRandomIndex);

var hotelTypes = ['flat', 'house', 'bungalo'];
var checkinTimes = ['12:00', '13:00', '14:00'];
var checkoutTimes = ['12:00', '13:00', '14:00'];
var hotelFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'].sort(getRandomIndex);
var similarOffers = [];

var getRandomInteger = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

var getFeatures = function () {
  var featuresLength = getRandomInteger(1, hotelFeatures.length - 1);
  var features = [];

  for (var i = 0; i < featuresLength; i++) {
    features[i] = hotelFeatures[i];
  }

  return features;
};

var generateOffers = function (index) {
  for (var i = 0; i < index; i++) {
    var location = [getRandomInteger(MIN_LOCATION_X, MAX_LOCATION_X), getRandomInteger(MIN_LOCATION_Y, MAX_LOCATION_Y)];
    similarOffers[i] = {
      'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png'
      },

      'offer': {
        'title': hotelTitles[i],
        'address': [location[0], location[1]],
        'price': getRandomInteger(MIN_PRICE, MAX_PRICE),
        'type': hotelTypes[getRandomInteger(0, (hotelTypes.length - 1))],
        'rooms': getRandomInteger(1, 5),
        'guests': getRandomInteger(MIN_GUESTS_INDEX, MAX_GUESTS_INDEX),
        'checkin': checkinTimes[getRandomInteger(0, checkinTimes.length - 1)],
        'checkout': checkoutTimes[getRandomInteger(0, checkoutTimes.length - 1)],
        'features': getFeatures(),
        'description': '',
        'photos': hotelPhotos
      },

      'location': {
        'x': location[0],
        'y': location[1]
      }
    };
  }
};

generateOffers(8);

var map = document.querySelector('.map');

var template = document.querySelector('template').content;
var mapPins = document.querySelector('.map__pins');

var renderPin = function (offers) {
  var pinElement = template.cloneNode(true);
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < offers.length; i++) {
    var buttonPin = document.createElement('button');
    var imagePin = document.createElement('img');

    buttonPin.className = 'map__pin el-' + i;
    buttonPin.style.left = offers[i].location.x - PIN_WIDTH / 2 + 'px';
    buttonPin.style.top = offers[i].location.y - PIN_HEIGHT + 'px';
    imagePin.src = offers[i].author.avatar;
    imagePin.width = AVATAR_SIZE;
    imagePin.height = AVATAR_SIZE;
    buttonPin.appendChild(imagePin);
    pinElement.appendChild(buttonPin);
    buttonPin.addEventListener('click', onClick);
    fragment.appendChild(pinElement);
  }

  return fragment;
};

var deleteChildren = function (el) {
  while (el.hasChildNodes()) {
    el.removeChild(el.firstChild);
  }
};

var renderCard = function (card) {
  var popup = document.querySelector('.popup').cloneNode(true);
  var popupFeatures = popup.querySelector('.popup__features');
  var popupPictures = popup.querySelector('.popup__pictures');

  deleteChildren(popupFeatures);
  deleteChildren(popupPictures);

  popup.querySelector('h3').textContent = card.offer.title;
  popup.querySelector('small').textContent = card.offer.address;
  popup.querySelector('.popup__price').textContent = card.offer.price + ' \u20BD/ночь';
  popup.querySelector('.popup__type').textContent = card.offer.type;
  popup.querySelector('.popup__rooms').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
  popup.querySelector('.popup__times').textContent = 'Заезд после ' + card.offer.checkin + ',' + ' выезд до ' + card.offer.checkout;

  for (var i = 0; i < card.offer.features.length; i++) {
    var featuresElement = document.createElement('li');
    featuresElement.className = 'feature feature--' + card.offer.features[i];
    popupFeatures.appendChild(featuresElement);
  }
  popup.querySelector('.popup__description').textContent = card.offer.description;
  popup.querySelector('.popup__avatar').src = card.author.avatar;

  var photoList = document.querySelector('.popup__pictures');
  var photoElement;
  for (i = 0; i < card.offer.photos.length; i++) {
    photoList.removeChild(photoList.firstChild);
    photoElement = photoList.querySelector('li').cloneNode(true); // ТУТ ПРОБЛЕМА, ВОТ В ЭТОЙ СТРОЧКЕ

    photoList.appendChild(photoElement);

    photoElement.querySelector('img').style.width = PHOTO_SIZE + 'px';
    photoElement.querySelector('img').style.height = PHOTO_SIZE + 'px';
    photoElement.querySelector('img').src = card.offer.photos[i];
  }
  hotelPhotos.sort(getRandomIndex);
  return popup;
};

var fieldsets = document.querySelectorAll('fieldset');
var noticeForm = document.querySelector('.notice__form');

var activateMap = function () {
  map.classList.remove('map--faded');
  noticeForm.classList.remove('notice__form--disabled');
  for (var i = 0; i < fieldsets.length; i++) {
    fieldsets[i].removeAttribute('disabled');
  }
  mapPins.appendChild(renderPin(similarOffers));
  mapPins.querySelector('article').style.display = 'hidden';
};

// Активация карты
var mainPinButton = document.querySelector('.map__pin--main');
var address = document.querySelector('#address');
address.value = '0, 0';

var isMapActive = function () {
  map.classList.contains('map--faded');
};

function getCoords(pin) {
  var box = pin.getBoundingClientRect();

  return {
    top: (box.top + pageYOffset) - MAIN_PIN_HEIGHT,
    left: (box.left + pageXOffset) - MAIN_PIN_WIDTH / 2
  };

}

var onMainPinUp = function () {
  var pinX = (Math.round(getCoords(mainPinButton).left));
  var pinY = (Math.round(getCoords(mainPinButton).top));
  address.value = pinX + ', ' + pinY;

  if (!isMapActive()) {
    activateMap();
    mainPinButton.removeEventListener('mouseup', onMainPinUp);
  }
};

var onClick = function (evt) {
  for (var i = 0; i < similarOffers.length; i++) {
    if (evt.currentTarget.classList.contains('el-' + i)) {
      mapPins.insertBefore(renderCard(similarOffers[i]), mapPins.lastChild);
    }
  }
};

mainPinButton.addEventListener('mouseup', onMainPinUp);
