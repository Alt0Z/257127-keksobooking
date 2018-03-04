'use strict';

(function () {
  var template = document.querySelector('template').content;

  window.renderPin = function (offers) {
    var pinElement = template.cloneNode(true);
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < offers.length; i++) {
      var buttonPin = document.createElement('button');
      var imagePin = document.createElement('img');

      buttonPin.className = 'map__pin el-' + i;
      buttonPin.style.left = offers[i].location.x - window.PIN_WIDTH / 2 + 'px';
      buttonPin.style.top = offers[i].location.y - window.PIN_HEIGHT + 'px';
      imagePin.src = offers[i].author.avatar;
      imagePin.width = window.AVATAR_SIZE;
      imagePin.height = window.AVATAR_SIZE;
      buttonPin.appendChild(imagePin);
      pinElement.appendChild(buttonPin);
      buttonPin.addEventListener('click', window.onClick);
      fragment.appendChild(pinElement);
    }

    return fragment;
  };

  window.renderCard = function (card) {
    var popup = document.querySelector('.popup').cloneNode(true);
    var popupFeatures = popup.querySelector('.popup__features');
    var popupPictures = popup.querySelector('.popup__pictures');

    window.deleteChildren(popupFeatures);
    window.deleteChildren(popupPictures);

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

      photoElement.querySelector('img').style.width = window.PHOTO_SIZE + 'px';
      photoElement.querySelector('img').style.height = window.PHOTO_SIZE + 'px';
      photoElement.querySelector('img').src = card.offer.photos[i];
    }
    window.hotelPhotos.sort(window.getRandomIndex);
    return popup;
  };
})();
