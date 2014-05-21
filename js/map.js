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
}

// функция построения марштура от точки А к точке В
function makeRoute() {
    // откуда и куда
    var fromAddress = document.getElementById('fromText').value;
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

