'use strict';

(function () {
  var fields = {
    title: document.querySelector('#title'),
    price: document.querySelector('#price'),
    flatType: document.querySelector('#type'),
    timein: document.querySelector('#timein'),
    timeout: document.querySelector('#timeout'),
    rooms: document.querySelector('#room_number'),
    capacity: document.querySelector('#capacity')
  };

  var onInvalid = {
    title: function () {
      if (fields.title.validity.tooShort) {
        fields.title.setCustomValidity('Заголовок не должен быть короче 30 символов');
      } else if (fields.title.validity.tooLong) {
        fields.title.setCustomValidity('Заголовок не должен быть длиннее 100 символов');
      } else if (fields.title.validity.valueMissing) {
        fields.title.setCustomValidity('Заголовок не должен быть пустым');
      } else {
        fields.title.setCustomValidity('');
      }
    },
    price: function () {
      if (fields.price.validity.rangeUnderflow) {
        fields.price.setCustomValidity('Для этого типа жилья цена не должна быть меньше ' + fields.price.attributes.min.value + ' рублей');
      } else if (fields.price.validity.rangeOverflow) {
        fields.price.setCustomValidity('Цена не должна превышать 1 000 000');
      } else {
        fields.price.setCustomValidity('');
      }
    }
  };

  var priceCheck = function () {
    if (fields.flatType.value === 'bungalo') {
      fields.price.setAttribute('min', 0);
    } else if (fields.flatType.value === 'flat') {
      fields.price.setAttribute('min', 1000);
    } else if (fields.flatType.value === 'house') {
      fields.price.setAttribute('min', 5000);
    } else if (fields.flatType.value === 'palace') {
      fields.price.setAttribute('min', 10000);
    }
  };

  var onTimeinChange = function () {
    fields.timeout.value = fields.timein.value;
  };

  var onTimeOutChange = function () {
    fields.timein.value = fields.timeout.value;
  };

  var guestsCheck = function () {
    for (var i = 0; i < fields.capacity.length; i++) {
      fields.capacity[i].removeAttribute('disabled');
      fields.capacity[i].removeAttribute('selected');
    }

    if (fields.rooms.value === '100') {
      fields.capacity[3].setAttribute('selected', true);
      for (i = 0; i < fields.capacity.length - 1; i++) {
        fields.capacity[i].setAttribute('disabled', true);
      }
    } else if (fields.rooms.value === '3') {
      fields.capacity[0].setAttribute('selected', true);
      for (i = 0; i < fields.capacity.length - 4; i++) {
        fields.capacity[i].setAttribute('disabled', true);
      }
      fields.capacity[3].setAttribute('disabled', true);
    } else if (fields.rooms.value === '2') {
      fields.capacity[1].setAttribute('selected', true);
      for (i = 0; i < fields.capacity.length - 3; i++) {
        fields.capacity[i].setAttribute('disabled', true);
      }
      fields.capacity[3].setAttribute('disabled', true);
    } else if (fields.rooms.value === '1') {
      fields.capacity[2].setAttribute('selected', true);
      for (i = 0; i < fields.capacity.length - 2; i++) {
        fields.capacity[i].setAttribute('disabled', true);
      }
      fields.capacity[3].setAttribute('disabled', true);
    }
  };

  guestsCheck();

  fields.flatType.addEventListener('change', priceCheck);
  fields.title.addEventListener('invalid', onInvalid.title);
  fields.price.addEventListener('invalid', onInvalid.price);
  fields.timein.addEventListener('change', onTimeinChange);
  fields.timeout.addEventListener('change', onTimeOutChange);
  fields.rooms.addEventListener('change', guestsCheck);
})();
