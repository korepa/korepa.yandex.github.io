// Дождёмся загрузки API и готовности DOM.
ymaps.ready(init);

// инициализация переменных
var myMap;
var myCollection;
var metroPlacemark;
var airport = "Москва, аэропорт Внуково";
var dir = 'to';
var tarifs;
var calculator;
var metroName;
var metroDistance;
var stations = new Array();

function init () {
    myMap = new ymaps.Map('map', {
        center:[55.76, 37.64],
        zoom:10,
        behaviors: ['drag', 'scrollZoom']
        //controls: ['smallMapDefaultSet']
    }),
        // добавим элементы управления
        myMap.controls
            // Кнопка изменения масштаба.
            .add('zoomControl', { left: 5, top: 5 })
            // Стандартный набор кнопок
            .add('mapTools', { left: 35, top: 5 });

        tarifs = [{
            id: 'moscow',
            name: 'Москва',
            label: 'Маршрут по Москве',
            color: '#0000ff',
            cost: 20,
            url: 'moscow.json'
        }, {
            id: 'mo',
            name: 'Московская область',
            label: 'Маршрут за МКАД',
            cost: 40,
            color: '#ff0000',
            url: 'mo.json'
        }],
        calculator = new DeliveryCalculator(myMap, 'Москва, Льва Толстого 18', tarifs);

    // загрузим модули для метро
    ymaps.load(["metro"], loadModules);

    // загрузим вокзалы и аэропорты с координатами
    getStations();

    // обрабатываем нажатие на кнопку "Enter" (строим маршрут)
    document.getElementById('toStreetText').onkeyup = function (event) {
        if (event.keyCode == 13) {
            makeRoute();
        }
    };

    document.getElementById('toNumberText').onkeyup = function (event) {
        if (event.keyCode == 13) {
            makeRoute();
        }
    };
    document.getElementById('toNumber2Text').onkeyup = function (event) {
        if (event.keyCode == 13) {
            makeRoute();
        }
    };
    document.getElementById('toNumber3Text').onkeyup = function (event) {
        if (event.keyCode == 13) {
            makeRoute();
        }
    };

    window.onpopstate = function(event) {
        alert("location: " + document.location + ", state: " + JSON.stringify(event.state));
    };

    // функция изменения направления транфера (из аэропорта или в аэропорт)
    $("#forwardRButton, #backwardRButton").change(function () {
        changeDirection();
    });

    // загрузка адресов
    loadAddresses();
}

// смена направления
function changeDirection() {
    // поменяем направление и текст
    if ($("#forwardRButton")[0].checked){
        dir = "to";
        document.getElementById('directionLabel').innerHTML = "Куда";
    }
    else{
        dir = "from";
        document.getElementById('directionLabel').innerHTML = "Откуда";
    }

    // закроем другие адреса
    $('#address2Tr')[0].style.display = "none";
    $('#address3Tr')[0].style.display = "none";
    $('#orderSection')[0].style.visibility = "collapse";
    $('#orderSpan')[0].style.display = "none";
    $('#routeSpan')[0].style.display = "inline";
    $('#routeButton')[0].disabled = true;

    clearAddress(1);
    clearAddress(2);
    clearAddress(3);

    return;

    // изменим кнопки
    if ( $('#leftTd')[0].style.display === 'none')
    {
        $('#toNumberTd')[0].style.display = "none";
        $('#toNumber1Td')[0].style.display = "none";
        $('#toNumber2Td')[0].style.display = "none";
        $('#toNumber3Td')[0].style.display = "none";

        clearAddress(1);
    }
    else
    {
        $('#toNumberTd')[0].style.display = "table-cell";
        $('#toNumber1Td')[0].style.display = "table-cell";
        $('#toNumber2Td')[0].style.display = "table-cell";
        $('#toNumber3Td')[0].style.display = "table-cell";

        clearAddress(1);
    }
}

// функция построения марштура от точки А к точке В
function makeRoute() {
    // откуда и куда
    var fromAddress = airport;
    var toAddress = document.getElementById('toCityText').value + ' ' + document.getElementById('toStreetText').value + ' ' + document.getElementById('toNumberText').value;
    var to2Address = document.getElementById('toCity2Text').value + ' ' + document.getElementById('toStreet2Text').value + ' ' + document.getElementById('toNumber2Text').value;
    var to3Address = document.getElementById('toCity3Text').value + ' ' + document.getElementById('toStreet3Text').value + ' ' + document.getElementById('toNumber3Text').value;
    var point1 = "От:";
    var point2 = "До:";
    // зануляем показатели метро на всякий случай
    metroName = undefined;
    metroDistance = undefined;

    // получим координаты для вокзала/аэропорта
    var stationName = "Павелецкий вокзал";
    var stationCoord = getStationByName(stationName);

    // формируем массив адресов
    //var arrCombine = cartesian([0], [1,2,3], [1,2,3], [1,2,3]);
    //arrCombine.unique();

//    var arrCombinations = new Array();
//    arrCombinations[0] = [fromAddress, toAddress, to2Address, to3Address];
//    arrCombinations[1] = [fromAddress, toAddress, to3Address, to2Address];
//    arrCombinations[2] = [fromAddress, to2Address, toAddress, to3Address];
//    arrCombinations[3] = [fromAddress, to2Address, to3Address, toAddress];
//    arrCombinations[4] = [fromAddress, to3Address, toAddress, to2Address];
//    arrCombinations[5] = [fromAddress, to3Address, to2Address, toAddress];

    // задаем возможные маршруты
//    var item;
//    var arrayRoute = new Array();
//    for (var i = 0; i < 6; i++) {
//        item = new Array();
//        item.route = arrCombinations[i];
//        item.distance = 0;
//        arrayRoute[i] = item;
//    }
//
//    // рассчитаем длины маршрутов
//    ymaps.route(arrayRoute[0].route)
//        .then(function (route1) {
//            ymaps.route(arrayRoute[1].route)
//                .then(function (route2) {
//                    ymaps.route(arrayRoute[2].route)
//                        .then(function (route3) {
//                            ymaps.route(arrayRoute[3].route)
//                                .then(function (route4) {
//                                    ymaps.route(arrayRoute[4].route)
//                                        .then(function (route5) {
//                                            ymaps.route(arrayRoute[5].route)
//                                                .then(function (route6) {
//                                                    arrayRoute[0].distance = Math.round(route1.getLength());
//                                                    arrayRoute[1].distance = Math.round(route2.getLength());
//                                                    arrayRoute[2].distance = Math.round(route3.getLength());
//                                                    arrayRoute[3].distance = Math.round(route4.getLength());
//                                                    arrayRoute[4].distance = Math.round(route5.getLength());
//                                                    arrayRoute[5].distance = Math.round(route6.getLength());
//                                                });
//                                        });
//                                });
//                        });
//                });
//        });

    var routeBest = [fromAddress, toAddress];
    ymaps.route(routeBest,
        {
            // Автоматически позиционировать карту.
            mapStateAutoApply: true
        })
        .then(function (route) {

            var distance = Math.round(route.getLength());

            // удалим предыдущий маршрут и метки метро, если есть
            if (myCollection != null)
            {
                myMap.geoObjects.remove(myCollection);
            }
            // объявим новую коллекцию (инициализируем заново)
            myCollection = new ymaps.GeoObjectCollection();

            // выберем откуда вычислять метро
            var addressToMetro = toAddress;
            // если обратное направление
            if ($("#backwardRButton")[0].checked == true){
                point1 = "До:";
                point2 = "От:";
            }

            // Зададим содержание иконок начальной и конечной точкам маршрута.
            var points = route.getWayPoints(),
                lastPoint = points.getLength() - 1;

            // Задаем контент меток в начальной и конечной точках.
            var firstPoint = points.get(0);
            var lastPoint = points.get(lastPoint);
            var fromStreetName = firstPoint.properties.get("GeocoderMetaData").AddressDetails.Country.AddressLine;
            var toStreetName = stationName;
            if (lastPoint.properties.get("GeocoderMetaData") != undefined){
                toStreetName = lastPoint.properties.get("GeocoderMetaData").AddressDetails.Country.AddressLine;
            }
            firstPoint.properties.set('iconContent', '<b>' + point1 + '</b> ' + fromStreetName);
            lastPoint.properties.set('iconContent', '<b>' + point2 + '</b> ' + toStreetName);
            firstPoint.options.set('preset', 'twirl#blueStretchyIcon');
            lastPoint.options.set('preset', 'twirl#blueStretchyIcon');

            // калькулятор
            calculator.setOrigin(firstPoint.geometry.getCoordinates());
            calculator.setDestination(lastPoint.geometry.getCoordinates());

            // добавляем точки на карту
            myCollection.add(firstPoint);
            myCollection.add(lastPoint);

            // ищем ближайшее растояние до метро
            ymaps.geocode(addressToMetro).then(function (res) {
                var coords = res.geoObjects.get(0).geometry.getCoordinates();
                // поиск станций метро
                ymaps.geocode(coords, {
                    kind: 'metro',
                    results: 1
                }).then(function(res) {
                        if (res.geoObjects.getLength()) {
                            // обработаем все точки маршрута
                            for (var i = 0; i < res.geoObjects.getLength(); i ++)
                            {
                                // получим информацию о текущем метро
                                var m = res.geoObjects.get(i);
                                var mAllData = m.properties.getAll();
                                var m_coords = m.geometry.getCoordinates();
                                var dist0 = ymaps.coordSystem.geo.getDistance(coords, m_coords);
                                var dist = ymaps.formatter.distance(dist0);
                                metroName = mAllData.name;
                                metroDistance = Math.round(dist0);

                                // выведем иконку с расстоянием до метро
                                metroPlacemark = new ymaps.Placemark(m_coords, {
                                    balloonContentHeader: mAllData.name,
                                    balloonContentFooter: "Расстояние: " + dist,
                                    hintContent: mAllData.name
                                }, {
                                    preset: 'twirl#nightDotIcon',
                                    iconColor: '#4d7198'
                                });
                                myCollection.add(metroPlacemark);
                            }
                        }

                        // работаем с задержкой показа балуна
//                        setTimeout(function ()
//                        {
//                            // открываем балун для метки (последней, если их несколько)
//                            metroPlacemark.balloon.open();
//                        }, 1000);

                        // Поиск 2 адреса, если есть
                        if (document.getElementById('toStreet2Text').value != '' && document.getElementById('toNumber2Text').value != ''){
                            ymaps.geocode(to2Address, {
                                results: 1 // Если нужен только один результат, экономим трафик пользователей
                            }).then(function (res) {
                                    // Выбираем первый результат геокодирования.
                                    var firstGeoObject = res.geoObjects.get(0),
                                    // Координаты геообъекта.
                                        coords = firstGeoObject.geometry.getCoordinates();

                                    firstGeoObject.properties.set('iconContent', '<b>' + point2 + '</b> ' + to2Address);
                                    firstGeoObject.options.set('preset', 'twirl#blueStretchyIcon');

                                    // Добавляем первый найденный геообъект на карту.
                                    myCollection.add(firstGeoObject);
                                });
                        }

                        // Поиск 3 адреса, если есть
                        if (document.getElementById('toStreet3Text').value != '' && document.getElementById('toNumber3Text').value != ''){
                            ymaps.geocode(to3Address, {
                                results: 1 // Если нужен только один результат, экономим трафик пользователей
                            }).then(function (res) {
                                    // Выбираем первый результат геокодирования.
                                    var secondGeoObject = res.geoObjects.get(0),
                                    // Координаты геообъекта.
                                        coords = secondGeoObject.geometry.getCoordinates();

                                    secondGeoObject.properties.set('iconContent', '<b>' + point2 + '</b> ' + to3Address);
                                    secondGeoObject.options.set('preset', 'twirl#blueStretchyIcon');

                                    // Добавляем первый найденный геообъект на карту.
                                    myCollection.add(secondGeoObject);
                                });
                        }

                        // добавим коллекцию на карту
                        myMap.geoObjects.add(myCollection);

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

// функция добавления доп. адреса (правый)
function addRightAddress() {
    if ( $('#address2Tr')[0].style.display === 'none')
    {
        $('#address2Tr')[0].style.display = "table-row";
        clearAddress(2);
        return;
    }
    // TODO временно убрали отрисовку 3 адреса (пока оставим 2)
    /*
    if ( $('#address3Tr')[0].style.display === 'none')
    {
        $('#address3Tr')[0].style.display = "table-row";
        clearAddress(3);
        return;
    }
    */
}

// функция удаления доп. адреса 2
function remove2Address() {
    $('#address2Tr')[0].style.display = "none";
    clearAddress(2);
    if ($('#toStreetText')[0].value != ''){
        makeRoute();
    }
}

// функция удаления доп. адреса 3
function remove3Address() {
    $('#address3Tr')[0].style.display = "none";
    clearAddress(3);
    if ($('#toStreetText')[0].value != ''){
        makeRoute();
    }
}

// Функция очистки доп. адресов
function clearAddress(number){
    if (number == 1){
        $('#toStreetText')[0].value = '';
        $('#toNumberText')[0].value = '';
    }
    else if (number == 2){
        $('#toStreet2Text')[0].value = '';
        $('#toNumber2Text')[0].value = '';
    }
    else if (number == 3){
        $('#toStreet3Text')[0].value = '';
        $('#toNumber3Text')[0].value = '';
    }
}

// подсчет стоимости поездки
function priceCount(amount){
    $('#priceText')[0].innerHTML = amount;
}

function loadAddresses() {
    // получим параметры из запроса (то, что ввели на предыдущей странице)
    dir = decodeURIComponent(parseUrlQuery()['dir']);
    var to = decodeURIComponent(parseUrlQuery()['to']);
    var to2 = decodeURIComponent(parseUrlQuery()['to2']);
    var to3 = decodeURIComponent(parseUrlQuery()['to3']);

    if (dir != "" && dir != "undefined"){
        if (dir == "from"){
            if ($("#forwardRButton")[0].checked == false){
                $("#forwardRButton")[0].checked = true;
                changeDirection();
            }
        }
        if (dir == "to"){
            if ($("#backwardRButton")[0].checked == false){
                $("#backwardRButton")[0].checked = true;
                changeDirection();
            }
        }
    }

    // адреса
    if (to != "" && to != "undefined"){
        var toSplit = to.split(',');
        if (toSplit.length > 1){
            document.getElementById("toCityText").value = toSplit[0].trim();
            document.getElementById("toStreetText").value = toSplit[1].trim();
        }
        if (toSplit.length > 2)
            document.getElementById("toNumberText").value = toSplit[2].trim();
    }
    if (to2 != "" && to2 != "undefined"){
        var toSplit = to2.split(',');
        if (toSplit.length > 1){
            addRightAddress();
            document.getElementById("toCity2Text").value = toSplit[0].trim();
            document.getElementById("toStreet2Text").value = toSplit[1].trim();
        }
        if (toSplit.length > 2)
            document.getElementById("toNumber2Text").value = toSplit[2].trim();
    }
    if (to3 != "" && to3 != "undefined"){
        var toSplit = to3.split(',');
        if (toSplit.length > 1){
            addRightAddress();
            document.getElementById("toCity3Text").value = toSplit[0].trim();
            document.getElementById("toStreet3Text").value = toSplit[1].trim();
        }
        if (toSplit.length > 2)
            document.getElementById("toNumber3Text").value = toSplit[2].trim();
    }

    // строим маршрут
    if (to != "" && to != "undefined"){
        setTimeout(function ()
        {
            makeRoute();
        }, 100);
    }
    else{
        // фокус на улице
        document.getElementById("toStreetText").focus();
    }
}

function order() {
    // находим параметры для передачи
    var dir;
    if ($("#forwardRButton")[0].checked){
        dir = 'from';
    }
    else{
        dir = 'to';
    }
    // адрес 1
    var toAddress = '';
    if (document.getElementById('toStreetText').value!= '')
        toAddress = document.getElementById('toCityText').value + ', ' + document.getElementById('toStreetText').value;
    if (document.getElementById('toNumberText').value!= '')
        toAddress += ', ' + document.getElementById('toNumberText').value;
    // адрес 2
    var to2Address = '';
    if (document.getElementById('toStreet2Text').value!= '')
        to2Address = document.getElementById('toCity2Text').value + ', ' + document.getElementById('toStreet2Text').value;
    if (document.getElementById('toNumber2Text').value!= '')
        to2Address += ', ' + document.getElementById('toNumber2Text').value;
    // адрес 3
    var to3Address = '';
    if (document.getElementById('toStreet3Text').value!= '')
        to3Address = document.getElementById('toCity3Text').value + ', ' + document.getElementById('toStreet3Text').value;
    if (document.getElementById('toNumber3Text').value!= '')
        to3Address += ', ' + document.getElementById('toNumber3Text').value;
    // сумма к оплате
    var price = document.getElementById('priceText').innerText;

    // используем для заказа доставки
    var newLocation = '?dir=' + encodeURIComponent(dir);
    newLocation += '&to=' + encodeURIComponent(toAddress);
    if (to2Address != '')
        newLocation += '&to2=' + encodeURIComponent(to2Address);
    if (to3Address != '')
        newLocation += '&to3=' + encodeURIComponent(to3Address);
    newLocation += '&price=' + encodeURIComponent(price);

    // для истории
    history.pushState(null, null, newLocation);

    // переход на новую локацию
    var newLocation = 'payment.html' + newLocation;
    window.location = newLocation;
}

function calculatePrice (results, total){
    // точка 1
    if (document.getElementById('toCityText').value != ''){
        // город
        var messageCity = 'Город 1:\n ' + document.getElementById('toCityText').value;

        // внутри ли МКАД адрес
        var messageInsideMKAD = 'Нет';
        if (document.getElementById('toCityText').value == "Москва"){
            messageInsideMKAD = "Да";
        }
        messageInsideMKAD = "Внутри МКАД: " + messageInsideMKAD;

        // имя метро
        var messageMetroName = 'Ближайшее метро:\n ' + metroName;

        // расстояние до метро
        var messageMetroDistance = 'Расстояние до метро:\n ' + metroDistance + ' м';

        document.getElementById('routeInfoCity1Label').innerHTML = messageCity;
        document.getElementById('routeInfoCity1Label').style.display = "block";
        document.getElementById('routeInfoInsideMKAD1Label').innerHTML = messageInsideMKAD;
        document.getElementById('routeInfoInsideMKAD1Label').style.display = "block";
        document.getElementById('routeInfoMetroName1Label').innerHTML = messageMetroName;
        document.getElementById('routeInfoMetroName1Label').style.display = "block";
        document.getElementById('routeInfoMetroDistance1Label').innerHTML = messageMetroDistance;
        document.getElementById('routeInfoMetroDistance1Label').style.display = "block";
    }
    else{
        document.getElementById('routeInfoCity1Label').style.display = "none";
        document.getElementById('routeInfoInsideMKAD1Label').style.display = "none";
        document.getElementById('routeInfoMetroName1Label').style.display = "none";
        document.getElementById('routeInfoMetroDistance1Label').style.display = "none";
    }

    // точка 2
    if (document.getElementById('toStreet2Text').value != ''){
        // город
        var messageCity = 'Город 2:\n ' + document.getElementById('toCity2Text').value;

        // внутри ли МКАД адрес
        var messageInsideMKAD = 'Нет';
        if (document.getElementById('toCity2Text').value == "Москва"){
            messageInsideMKAD = "Да";
        }
        messageInsideMKAD = "Внутри МКАД: " + messageInsideMKAD;

        document.getElementById('routeInfoCity2Label').innerHTML = messageCity;
        document.getElementById('routeInfoCity2Label').style.display = "block";
        document.getElementById('routeInfoInsideMKAD2Label').innerHTML = messageInsideMKAD;
        document.getElementById('routeInfoInsideMKAD2Label').style.display = "block";
    }
    else{
        document.getElementById('routeInfoCity2Label').style.display = "none";
        document.getElementById('routeInfoInsideMKAD2Label').style.display = "none";
    }

    // точка 3
    if (document.getElementById('toStreet3Text').value != ''){
        // город
        var messageCity = 'Город 3:\n ' + document.getElementById('toCity3Text').value;

        // внутри ли МКАД адрес
        var messageInsideMKAD = 'Нет';
        if (document.getElementById('toCity3Text').value == "Москва"){
            messageInsideMKAD = "Да";
        }
        messageInsideMKAD = "Внутри МКАД: " + messageInsideMKAD;

        document.getElementById('routeInfoCity3Label').innerHTML = messageCity;
        document.getElementById('routeInfoCity3Label').style.display = "block";
        document.getElementById('routeInfoInsideMKAD3Label').innerHTML = messageInsideMKAD;
        document.getElementById('routeInfoInsideMKAD3Label').style.display = "block";
    }
    else{
        document.getElementById('routeInfoCity3Label').style.display = "none";
        document.getElementById('routeInfoInsideMKAD3Label').style.display = "none";
    }

    // общее расстояние
    var messageTotalDistance = 'Расстояние: по МО - ' + results[1].distance/1000 + ' км, ' + 'по Москве - ' + results[0].distance/1000 + ' км, ';
    messageTotalDistance += 'общее растояние - ' + total.distance/1000 + ' км';

    document.getElementById('routeInfoTotalDistanceLabel').innerHTML = messageTotalDistance;
    document.getElementById('routeInfoTotalDistanceLabel').style.display = "block";

    // цена
    var messageTotalPrice = 'Цена: по МО - ' + (results[1].value) + ' p, ' + 'по Москве - ' + (results[0].value) + ' p, ';
    messageTotalPrice += ' общая цена - ' + total.value + ' p';

    document.getElementById('routeInfoTotalPriceLabel').innerHTML = messageTotalPrice;
    document.getElementById('routeInfoTotalPriceLabel').style.display = "block";

    // посылаем запрос на рассчет суммы
    if (metroName != undefined && metroDistance!= undefined){
        // город
        var city = document.getElementById('toCityText').value;
        var insideMKAD = 0;
        if (city == "Москва"){
            insideMKAD = 1;
        }

        // заполним структуру
        var req = new Object();
        req.city = city;
        req.insideMKAD = insideMKAD;
        req.metroName = metroName;
        req.townId = 0;
        req.metroId = 0;
        req.metroDistance = metroDistance;
        req.distance1 = results[0].distance;
        req.distance2 = results[1].distance;

        // достанем город id
        getTownId(req);

        // достанем метро id
        getMetroId(req, sendPriceRequest);
    }
}

function getMetroId(req, callback){
    // уберем слово "метро" из имени
    var realName = "";
    var arr =  req.metroName.split(" ");
    for (var i = 1; i < arr.length; i++) {
        realName += arr[i] + " ";
    }
    realName = realName.trim();

    $.ajax({
        type: "GET",
        url: "http://api.hh.ru/1/json/metro",
        async: false,
        contentType: "json",
        dataType: 'jsonp',
        success: function(data){
            $(data).each(function(i, line) {
                $(line.stations).each(function(j, station) {
                    if ((station.name) == realName){
                        // забираем id у станции
                        req.metroId = station.id;
                        callback(req);
                    }
                });
            });
        },
        error: function(error, data){
            console.log(error)
        }
    });
}

function getTownId(req){
    $.ajax({
        type: "GET",
        url: "towns.json",
        async: false,
        contentType: "json",
        dataType: 'json',
        success: function(data){
            $(data).each(function(i, city) {
                if (city.Name.indexOf(req.city.toUpperCase()) > -1){
                    // обновим townId
                    req.townId = city.Id;
                }
            });
        },
        error: function(error, data){
            console.log(error)
        }
    });
}

function sendPriceRequest(data){
    $.ajax({
        url:'php/price.php',
        data:{
            city: data.city,
            insideMKAD: data.insideMKAD,
            townId: data.townId,
            metroId: data.metroId,
            metroDistance: data.metroDistance,
            inDistance: data.distance1,
            outDistance: data.distance2,
            totalDistance: data.distance1 + data.distance2
        },
        complete: function (response) {
            if (response.responseText.length < 6){
                priceCount(response.responseText);
            }
        },
        error: function (request,error) {
            var message = JSON.parse(request.responseText).message;
            var message2 = 'Произошла ошибка рассчета цены поездки:\n' + message + '!';
            $(".alert")[0].style.display = "block";
            document.getElementById('alertLabel').innerHTML = message2;
            $(".alert").alert();
        }
    });
}

function getStations(){
    $.ajax({
        type: "GET",
        url: "stations.json",
        async: false,
        contentType: "json",
        dataType: 'json',
        success: function(stationsdata){
            $(stationsdata).each(function(i, item) {
                //stations.add(item);
                stations[i] = item;
        });
        },
        error: function(error, data){
            console.log(error)
        }
    });
}

function getStationByName(stationName){
    var coords = [55.76, 37.64];
    // если заполнен список с вокзалами и аэропортами
    if (stations.length > 0)
    {
        $(stations).each(function(i, item) {
            if (stationName.toUpperCase().indexOf(item.Name) > -1){
                // заполним координаты
                coords = item.Coord;
            }
        });
    }
    return coords;
}

