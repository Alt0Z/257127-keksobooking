'use strict';

// Заменить на генератор
var AVATARS = [1, 2, 3, 4, 5, 6, 7, 8];
var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var TYPES = ['flat', 'house', 'bungalo'];
var CHECKIN_TIMES = ['12:00', '13:00', '14:00'];
var CHECKOUT_TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var similarOffers = [];
var templateButton = document.querySelector('template').content.querySelector('.map__pin');
var templateMap = document.querySelector('template').content.querySelector('.map__card');
var templatePins = document.querySelector('.map__pins');
var fragment = document.createDocumentFragment();

var getRandomIndex = function () {
  return Math.floor(Math.random() * TITLES.length);
};

var getRandomInteger = function (min, max) {
  var randomInteger = min + Math.random() * (max + 1 - min);
  return Math.floor(randomInteger);
};

var getRandomArr = function (array) {
  var randomArray = array;
  return randomArray.sort(getRandomIndex);
};

var generateOffer = function (avatar, title, price, type, rooms, guests, checkin, checkout, features, description, photos, locationX, locationY) {
  return {
    'author': {
      'avatar': avatar
    },

    'offer': {
      'title': title,
      'address': '{{location.x}}, {{location.y}}',
      'price': price,
      'type': type,
      'rooms': rooms,
      'guests': guests,
      'checkin': checkin,
      'checkout': checkout,
      'features': features,
      'description': description,
      'photos': photos
    },

    'location': {
      'x': locationX,
      'y': locationY
    }
  };
};
// Переписать этот метод, чтобы было более понятно и красиво
var generateSimilarOffers = function () {
  var randomAvatars = getRandomArr(AVATARS);
  var randomTitles = getRandomArr(TITLES);
  var randomPhotos = getRandomArr(PHOTOS);

  for (var i = 0; i < TITLES.length; i++) {
    var randomPrice = getRandomInteger(1000, 1000000);
    var randomRooms = getRandomInteger(1, 5);
    var randomGuests = getRandomInteger(1, 100);
    var randomType = getRandomInteger(0, 2);
    var randomCheckinTime = getRandomInteger(0, 2);
    var randomCheckoutTime = getRandomInteger(0, 2);
    var randomFeatures = getRandomArr(FEATURES);
    var randomX = getRandomInteger(300, 900);
    var randomY = getRandomInteger(150, 500);
    similarOffers[i] = generateOffer('img/avatars/user0' + randomAvatars[i] + '.png', randomTitles[i], randomPrice, TYPES[randomType], randomRooms, randomGuests, CHECKIN_TIMES[randomCheckinTime], CHECKOUT_TIMES[randomCheckoutTime], randomFeatures[i], '', randomPhotos, randomX, randomY);
  }
};

var renderButton = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name + ' ' + wizard.lastName;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

generateSimilarOffers();
// Дать правильные имена переменным
var activateMap = function () {
  var x = document.querySelector('.map');
  x.classList.remove('map--faded');
  fragment.appendChild()
};

activateMap();
// console.log(similarOffers);
