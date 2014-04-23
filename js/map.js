// Дождёмся загрузки API и готовности DOM.
ymaps.ready(init);
var myMap;

function init () {
    var myPlacemark;
    myMap = new ymaps.Map('map', {
        // При инициализации карты обязательно нужно указать
        // её центр и коэффициент масштабирования.
        center:[55.76, 37.64], // Москва
        zoom:11,
        behaviors: ['default', 'scrollZoom']
    });

    // Слушаем клик на карте
    myMap.events.add('click', function (e) {
        var coords = e.get('coords');

        // Если метка уже создана – просто передвигаем ее
        if(myPlacemark) {
            myPlacemark.geometry.setCoordinates(coords);
        }
        // Если нет – создаем.
        else {
            myPlacemark = createPlacemark(coords);
            myMap.geoObjects.add(myPlacemark);
            // Слушаем событие окончания перетаскивания на метке.
            myPlacemark.events.add('dragend', function () {
                getAddress(myPlacemark.geometry.getCoordinates());
            });
        }
        getAddress(coords);
    });

    // Создание метки
    function createPlacemark(coords) {
        return new ymaps.Placemark(coords, {
            iconContent: 'поиск...'
        }, {
            preset: 'twirl#violetStretchyIcon',
            draggable: true
        });
    }

    // Определяем адрес по координатам (обратное геокодирование)
    function getAddress(coords) {
        myPlacemark.properties.set('iconContent', 'поиск...');
        ymaps.geocode(coords).then(function (res) {
            var firstGeoObject = res.geoObjects.get(0);

            myPlacemark.properties
                .set({
                    iconContent: firstGeoObject.properties.get('name'),
                    balloonContent: firstGeoObject.properties.get('text')
                })
        });
    }

    document.getElementById('orderButton').onclick = function () {
        // используем для заказа доставки
        window.location = 'payment.html'
    };
}

var route1;

function route() {

    // очистим сперва предущие маршруты
    //if (route1 != null) myMap.geoObjects.remove(route1);
    //route = null;

    // откуда и куда
    var fromAddress = document.getElementById('fromText').value;
    var toAddress = document.getElementById('toText').value;

    route1 = [
        fromAddress,
        toAddress
    ];

    ymaps.route(route1,
        {
            // Автоматически позиционировать карту.
            mapStateAutoApply: true
        }
        ).then(function (route) {
            myMap.geoObjects.add(route);

            // Зададим содержание иконок начальной и конечной точкам маршрута.
            // С помощью метода getWayPoints() получаем массив точек маршрута.
            // Массив транзитных точек маршрута можно получить с помощью метода getViaPoints.
            var points = route.getWayPoints(),
                lastPoint = points.getLength() - 1;
            // Задаем стиль метки - иконки будут красного цвета, и
            // их изображения будут растягиваться под контент.
            points.options.set('preset', 'twirl#redStretchyIcon');
            // Задаем контент меток в начальной и конечной точках.
            points.get(0).properties.set('iconContent', fromAddress);
            points.get(lastPoint).properties.set('iconContent', toAddress);

            // Проанализируем маршрут по сегментам.
            // Сегмент - участок маршрута, который нужно проехать до следующего
            // изменения направления движения.
            // Для того, чтобы получить сегменты маршрута, сначала необходимо получить
            // отдельно каждый путь маршрута.
            // Весь маршрут делится на два пути:
            // 1) от улицы Крылатские холмы до станции "Кунцевская";
            // 2) от станции "Кунцевская" до "Пионерская".

            var moveList = 'Трогаемся,</br>',
                way,
                segments;
            // Получаем массив путей.
            for (var i = 0; i < route.getPaths().getLength(); i++) {
                way = route.getPaths().get(i);
                segments = way.getSegments();
                for (var j = 0; j < segments.length; j++) {
                    var street = segments[j].getStreet();
                    moveList += ('Едем ' + segments[j].getHumanAction() + (street ? ' на ' + street : '') + ', проезжаем ' + segments[j].getLength() + ' м.,');
                    moveList += '</br>'
                }
            }
            moveList += 'Останавливаемся.';
            // Выводим маршрутный лист.
            $('#list').empty();
            $('#list').append(moveList);
        }, function (error) {
            alert('Возникла ошибка: ' + error.message);
        });
}

