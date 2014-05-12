// Дождёмся загрузки API и готовности DOM.
ymaps.ready(init);

// инициализация переменных
var myMap;
var myCollection;

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

// закомментировали поиск места на карте по клику
    // Слушаем клик на карте
//    myMap.events.add('click', function (e) {
//        var coords = e.get('coords');
//
//        // Если метка уже создана – просто передвигаем ее
//        if(myPlacemark) {
//            myPlacemark.geometry.setCoordinates(coords);
//        }
//        // Если нет – создаем.
//        else {
//            myPlacemark = createPlacemark(coords);
//            myMap.geoObjects.add(myPlacemark);
//            // Слушаем событие окончания перетаскивания на метке.
//            myPlacemark.events.add('dragend', function () {
//                getAddress(myPlacemark.geometry.getCoordinates());
//            });
//        }
//        getAddress(coords);
//    });
//
//    // Создание метки
//    function createPlacemark(coords) {
//        return new ymaps.Placemark(coords, {
//            iconContent: 'поиск...'
//        }, {
//            preset: 'islands#violetStretchyIcon',
//            draggable: true
//        });
//    }
//
//    // Определяем адрес по координатам (обратное геокодирование)
//    function getAddress(coords) {
//        myPlacemark.properties.set('iconContent', 'поиск...');
//        ymaps.geocode(coords).then(function (res) {
//            var firstGeoObject = res.geoObjects.get(0);
//
//            myPlacemark.properties
//                .set({
//                    iconContent: firstGeoObject.properties.get('name'),
//                    balloonContent: firstGeoObject.properties.get('text')
//                })
//        });
//    }

    // обрабатываем нажатие на кнопку "Enter" (строим маршрут)
    document.getElementById('fromText').onkeyup = function (event) {
        if (event.keyCode == 13) {
            if ($("#routeButton").disabled === false)
                $("#routeButton").click();
        }
    };
    document.getElementById('toText').onkeyup = function (event) {
        if (event.keyCode == 13) {
            if ($("#routeButton").disabled === false)
                $("#routeButton").click();
        }
    };
}

// функция построения марштура от точки А к точке В
function makeRoute() {
    // откуда и куда
    var fromAddress = document.getElementById('fromText').value;
    var toAddress = document.getElementById('toText').value;

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
            // добавим маршрут
            myCollection = new ymaps.GeoObjectCollection();
            myCollection.add(route);

            // Зададим содержание иконок начальной и конечной точкам маршрута.
            var points = route.getWayPoints(),
                lastPoint = points.getLength() - 1;
            // Задаем стиль метки - иконки будут красного цвета, и
            // их изображения будут растягиваться под контент.
            points.options.set('preset', 'islands#blueStretchyIcon');
            // Задаем контент меток в начальной и конечной точках.
            points.get(0).properties.set('iconContent', fromAddress);
            points.get(lastPoint).properties.set('iconContent', toAddress);

            // ищем ближайшее растояние до метро
            ymaps.geocode(toAddress).then(function (res) {
                var coords = res.geoObjects.get(0).geometry.getCoordinates();
                // поиск станций метро
                ymaps.geocode(coords, {
                    kind: 'metro',
                    results: 3
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
                                var metroPlacemark = new ymaps.Placemark(m_coords, {
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

