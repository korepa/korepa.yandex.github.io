// Дождёмся загрузки API и готовности DOM.
ymaps.ready(init);

// инициализация переменных
var myMap;
var myCollection;
var metroPlacemark;

function init () {
    var myPlacemark;
    myMap = new ymaps.Map('map', {
        // указываем центр и масштаб карты
        center:[55.76, 37.64], // Москва
        zoom:11,
        controls: ['smallMapDefaultSet']
    });

    // загрузим модули для метро
    ymaps.load(["metro"], loadModules);

    // обрабатываем нажатие на кнопку "Enter" (строим маршрут)
    document.getElementById('fromText').onkeyup = function (event) {
        if (event.keyCode == 13) {
            makeRoute();
        }
    };
    document.getElementById('toText').onkeyup = function (event) {
        if (event.keyCode == 13) {
            makeRoute();
        }
    };
    document.getElementById('toNumberText').onkeyup = function (event) {
        if (document.getElementById('toText').value != "" && document.getElementById('toNumberText').value != "")
        {
            // автоматически строим мартшрут если введены числи [0..9] или буквы "c"/"к" или ENTER
            makeRoute();
        }
    };
    document.getElementById('fromNumberText').onkeyup = function (event) {
        if (document.getElementById('fromText').value != "" && document.getElementById('fromNumberText').value != "")
        {
            // автоматически строим мартшрут если введены числи [0..9] или буквы "c"/"к" или ENTER
            makeRoute();
        }
    };
    document.getElementById('toNumberText').onkeypress = function (event) {
        if (document.getElementById('toText').value != "")
        {
            var numberLength = document.getElementById('toNumberText').value.length;
            // запрещаем дальнейший ввод неверных символов
            if (numberLength < 3                                    &&      /* количество символов не больше 3х */
                (   event.keyCode >= 48 && event.keyCode <= 57 )    ||      /* числа 0...9 */
                (   event.keyCode == 99                             ||      /* символ "с" en */
                    event.keyCode == 107                            ||      /* символ "k" en */
                    event.keyCode == 1089                           ||      /* символ "с" ru */
                    event.keyCode == 1082 )                                 /* символ "к" ru */
                ) {
                // ОК, продолжаем дальше
            }
            else {
                // просто блокируем
                event.preventDefault();
            }
        }
        else {
            // просто блокируем
            event.preventDefault();
        }
    };
    document.getElementById('toNumber2Text').onkeypress = function (event) {
        if (document.getElementById('to2Text').value != "")
        {
            var numberLength = document.getElementById('toNumber2Text').value.length;
            // запрещаем дальнейший ввод неверных символов
            if (numberLength < 3                                    &&      /* количество символов не больше 3х */
                (   event.keyCode >= 48 && event.keyCode <= 57 )    ||      /* числа 0...9 */
                (   event.keyCode == 99                             ||      /* символ "с" en */
                    event.keyCode == 107                            ||      /* символ "k" en */
                    event.keyCode == 1089                           ||      /* символ "с" ru */
                    event.keyCode == 1082 )                                 /* символ "к" ru */
                ) {
                // ОК, продолжаем дальше
            }
            else {
                // просто блокируем
                event.preventDefault();
            }
        }
        else {
            // просто блокируем
            event.preventDefault();
        }
    };
    document.getElementById('toNumber3Text').onkeypress = function (event) {
        if (document.getElementById('to3Text').value != "")
        {
            var numberLength = document.getElementById('toNumber3Text').value.length;
            // запрещаем дальнейший ввод неверных символов
            if (numberLength < 3                                    &&      /* количество символов не больше 3х */
                (   event.keyCode >= 48 && event.keyCode <= 57 )    ||      /* числа 0...9 */
                (   event.keyCode == 99                             ||      /* символ "с" en */
                    event.keyCode == 107                            ||      /* символ "k" en */
                    event.keyCode == 1089                           ||      /* символ "с" ru */
                    event.keyCode == 1082 )                                 /* символ "к" ru */
                ) {
                // ОК, продолжаем дальше
            }
            else {
                // просто блокируем
                event.preventDefault();
            }
        }
        else {
            // просто блокируем
            event.preventDefault();
        }
    };
    document.getElementById('fromNumberText').onkeypress = function (event) {
        if (document.getElementById('fromText').value != "")
        {
            var numberLength = document.getElementById('fromNumberText').value.length;
            // запрещаем дальнейший ввод неверных символов
            if (numberLength < 3                                    &&      /* количество символов не больше 3х */
                (   event.keyCode >= 48 && event.keyCode <= 57 )    ||      /* числа 0...9 */
                (   event.keyCode == 99                             ||      /* символ "с" en */
                    event.keyCode == 107                            ||      /* символ "k" en */
                    event.keyCode == 1089                           ||      /* символ "с" ru */
                    event.keyCode == 1082 )                                 /* символ "к" ru */
                ) {
                // ОК, продолжаем дальше
            }
            else {
                // просто блокируем
                event.preventDefault();
            }
        }
        else {
            // просто блокируем
            event.preventDefault();
        }
    };
    document.getElementById('fromNumber2Text').onkeypress = function (event) {
        if (document.getElementById('from2Text').value != "")
        {
            var numberLength = document.getElementById('fromNumber2Text').value.length;
            // запрещаем дальнейший ввод неверных символов
            if (numberLength < 3                                    &&      /* количество символов не больше 3х */
                (   event.keyCode >= 48 && event.keyCode <= 57 )    ||      /* числа 0...9 */
                (   event.keyCode == 99                             ||      /* символ "с" en */
                    event.keyCode == 107                            ||      /* символ "k" en */
                    event.keyCode == 1089                           ||      /* символ "с" ru */
                    event.keyCode == 1082 )                                 /* символ "к" ru */
                ) {
                // ОК, продолжаем дальше
            }
            else {
                // просто блокируем
                event.preventDefault();
            }
        }
        else {
            // просто блокируем
            event.preventDefault();
        }
    };
    document.getElementById('fromNumber3Text').onkeypress = function (event) {
        if (document.getElementById('from3Text').value != "")
        {
            var numberLength = document.getElementById('fromNumber3Text').value.length;
            // запрещаем дальнейший ввод неверных символов
            if (numberLength < 3                                    &&      /* количество символов не больше 3х */
                (   event.keyCode >= 48 && event.keyCode <= 57 )    ||      /* числа 0...9 */
                (   event.keyCode == 99                             ||      /* символ "с" en */
                    event.keyCode == 107                            ||      /* символ "k" en */
                    event.keyCode == 1089                           ||      /* символ "с" ru */
                    event.keyCode == 1082 )                                 /* символ "к" ru */
                ) {
                // ОК, продолжаем дальше
            }
            else {
                // просто блокируем
                event.preventDefault();
            }
        }
        else {
            // просто блокируем
            event.preventDefault();
        }
    };

    // функция изменения направления транфера (из аэропорта или в аэропорт)
    $("#forwardRButton, #backwardRButton").change(function () {

        // закроем другие адреса
        $('#address2Tr')[0].style.display = "none";
        $('#address3Tr')[0].style.display = "none";

        // поменяем текст
        var from = document.getElementById('fromText').value
        var to = document.getElementById('toText').value;
        document.getElementById('fromText').value = to;
        document.getElementById('toText').value = from;

        // изменим кнопки
        if ( $('#leftTd')[0].style.display === 'none')
        {
            $('#leftTd')[0].style.display = "block";
            $('#left1Td')[0].style.display = "block";
            $('#left2Td')[0].style.display = "block";
            $('#left3Td')[0].style.display = "block";
            $('#fromNumberTd')[0].style.display = "table-cell";
            $('#fromNumber1Td')[0].style.display = "table-cell";
            $('#fromNumber2Td')[0].style.display = "table-cell";
            $('#fromNumber3Td')[0].style.display = "table-cell";
            $('#rightTd')[0].style.display = "none";
            $('#right1Td')[0].style.display = "none";
            $('#right2Td')[0].style.display = "none";
            $('#right3Td')[0].style.display = "none";
            $('#toNumberTd')[0].style.display = "none";
            $('#toNumber1Td')[0].style.display = "none";
            $('#toNumber2Td')[0].style.display = "none";
            $('#toNumber3Td')[0].style.display = "none";

            document.getElementById('fromText').readOnly = false;
            document.getElementById('toText').readOnly = true;

            document.getElementById('fromText').value = '';
            document.getElementById('fromNumberText').value = '';
            document.getElementById('toText').value = from;
            document.getElementById('toNumberText').value = '';
        }
        else
        {
            $('#leftTd')[0].style.display = "none";
            $('#left1Td')[0].style.display = "none";
            $('#left2Td')[0].style.display = "none";
            $('#left3Td')[0].style.display = "none";
            $('#fromNumberTd')[0].style.display = "none";
            $('#fromNumber1Td')[0].style.display = "none";
            $('#fromNumber2Td')[0].style.display = "none";
            $('#fromNumber3Td')[0].style.display = "none";
            $('#rightTd')[0].style.display = "block";
            $('#right1Td')[0].style.display = "block";
            $('#right2Td')[0].style.display = "block";
            $('#right3Td')[0].style.display = "block";
            $('#toNumberTd')[0].style.display = "table-cell";
            $('#toNumber1Td')[0].style.display = "table-cell";
            $('#toNumber2Td')[0].style.display = "table-cell";
            $('#toNumber3Td')[0].style.display = "table-cell";

            document.getElementById('fromText').readOnly = true;
            document.getElementById('toText').readOnly = false;

            document.getElementById('fromText').value = to;
            document.getElementById('fromNumberText').value = '';
            document.getElementById('toText').value = '';
            document.getElementById('toNumberText').value = '';
        }
    });
}

// функция построения марштура от точки А к точке В
function makeRoute() {
    // откуда и куда
    var fromAddress = document.getElementById('fromText').value + ' ' + document.getElementById('fromNumberText').value;
    var toAddress = document.getElementById('toText').value + ' ' + document.getElementById('toNumberText').value;

    var route1 = [
        fromAddress,
        toAddress
    ];

    ymaps.route(route1,
        {
            // Автоматически позиционировать карту.
            mapStateAutoApply: true
        })
        .then(function (route) {

            // удалим предыдущий маршрут и метки метро, если есть
            if (myCollection != null)
            {
                myMap.geoObjects.remove(myCollection);
            }
            // объявим новую коллекцию (инициализируем заново)
            myCollection = new ymaps.GeoObjectCollection();

            // Зададим содержание иконок начальной и конечной точкам маршрута.
            var points = route.getWayPoints(),
                lastPoint = points.getLength() - 1;

            // Задаем контент меток в начальной и конечной точках.
            var firstPoint = points.get(0);
            var lastPoint = points.get(lastPoint);
            var fromStreetName = firstPoint.properties.get("GeocoderMetaData").AddressDetails.Country.AddressLine;
            var toStreetName = lastPoint.properties.get("GeocoderMetaData").AddressDetails.Country.AddressLine;
            firstPoint.properties.set('iconContent', '<b>От:</b> ' + fromStreetName);
            lastPoint.properties.set('iconContent', '<b>До:</b> ' + toStreetName);
            firstPoint.options.set('preset', 'islands#redStretchyIcon');
            lastPoint.options.set('preset', 'islands#redStretchyIcon');

            // добавляем точки на карту
            myCollection.add(firstPoint);
            myCollection.add(lastPoint);

            // ищем ближайшее растояние до метро
            ymaps.geocode(toAddress).then(function (res) {
                var coords = res.geoObjects.get(0).geometry.getCoordinates();
                // поиск станций метро
                ymaps.geocode(coords, {
                    kind: 'metro',
                    results: 1
                }).then(function(res) {
                        if (res.geoObjects.getLength()) {
                            for (var i = 0; i < res.geoObjects.getLength(); i ++)
                            {
                                // получим информацию о текущем метро
                                var m = res.geoObjects.get(i);
                                var mAllData = m.properties.getAll();
                                var m_coords = m.geometry.getCoordinates();
                                var dist0 = ymaps.coordSystem.geo.getDistance(coords, m_coords);
                                var dist = ymaps.formatter.distance(dist0);

                                // выведем иконку с расстоянием до метро
                                metroPlacemark = new ymaps.Placemark(m_coords, {
                                    balloonContentHeader: mAllData.name,
                                    balloonContentFooter: "Расстояние: " + dist,
                                    hintContent: mAllData.name
                                }, {
                                    preset: 'islands#dotIcon',
                                    iconColor: '#4d7198'
                                });
                                myCollection.add(metroPlacemark);

                                // зададим стоимость поездки как дистанцию
                                priceCount(parseFloat(dist0).toFixed(0));
                            }
                            // добавим коллекцию на карту
                            myMap.geoObjects.add(myCollection);
                        }

                        // работаем с задержкой
                        setTimeout(function ()
                        {
                            // открываем балун для метки (последней, если их несколько)
                            metroPlacemark.balloon.open();
                        }, 1000);

                        // если все прошло ОК, делаем кнопку заказа и поле с суммой видимыми
                        $('#orderSection')[0].style.visibility = "visible";
                        $('#orderSpan')[0].style.display = "inline";
                        $('#routeSpan')[0].style.display = "none";
                    });
            });

        }, function (error) {
            alert('Возникла ошибка: ' + error.message);
        });
}

// при загрузке модулей (колбэк)
function loadModules() {
    // ничего не делаем после загрузки модулей
}

// функция добавления доп. адреса 1
function addRightAddress() {
    if ( $('#address2Tr')[0].style.display === 'none')
    {
        $('#address2Tr')[0].style.display = "table-row";
        $('#from2Text')[0].style.visibility = "hidden";
        $('#fromNumber2Text')[0].style.visibility = "hidden";
        $('#to2Text')[0].style.visibility = "visible";
        $('#toNumber2Text')[0].style.visibility = "visible";
        return;
    }
    if ( $('#address3Tr')[0].style.display === 'none')
    {
        $('#address3Tr')[0].style.display = "table-row";
        $('#from3Text')[0].style.visibility = "hidden";
        $('#fromNumber3Text')[0].style.visibility = "hidden";
        $('#to3Text')[0].style.visibility = "visible";
        $('#toNumber3Text')[0].style.visibility = "visible";
        return;
    }
}

function addLeftAddress() {
    if ( $('#address2Tr')[0].style.display === 'none')
    {
        $('#address2Tr')[0].style.display = "table-row";
        $('#from2Text')[0].style.visibility = "visible";
        $('#fromNumber2Text')[0].style.visibility = "visible";
        $('#to2Text')[0].style.visibility = "hidden";
        $('#toNumber2Text')[0].style.visibility = "hidden";
        return;
    }
    if ( $('#address3Tr')[0].style.display === 'none')
    {
        $('#address3Tr')[0].style.display = "table-row";
        $('#from3Text')[0].style.visibility = "visible";
        $('#fromNumber3Text')[0].style.visibility = "visible";
        $('#to3Text')[0].style.visibility = "hidden";
        $('#toNumber3Text')[0].style.visibility = "hidden";
        return;
    }
}

// функция добавления доп. адреса 2
function remove2Address() {
    $('#address2Tr')[0].style.display = "none";
    $('#from2Text')[0].value = '';
    $('#to2Text')[0].value = '';
    $('#toNumber2Text')[0].value = '';
}

// функция добавления доп. адреса 3
function remove3Address() {
    $('#address3Tr')[0].style.display = "none";
    $('#from3Text')[0].value = '';
    $('#to3Text')[0].value = '';
    $('#toNumber3Text')[0].value = '';
}

function priceCount(distance){
    if (distance < 1000)
    {
        $('#priceText')[0].innerHTML = 500 + ' р';
    }
    else if (distance > 1000 && distance < 2000)
    {
        $('#priceText')[0].innerHTML = 1000 + ' р';
    }
    else
        $('#priceText')[0].innerHTML = 1500 + ' р';
}

