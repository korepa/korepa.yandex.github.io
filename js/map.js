// Дождёмся загрузки API и готовности DOM.
ymaps.ready(init);

// инициализация переменных
var myMap;
var myCollection;
var metroPlacemark;
var airport = "Москва, аэропорт Внуково";
var dir = 'to';

function init () {
    var myPlacemark;
    myMap = new ymaps.Map('map', {
        // указываем центр и масштаб карты
        center:[55.76, 37.64], // Москва
        zoom:10,
        controls: ['smallMapDefaultSet']
    });

    // загрузим модули для метро
    ymaps.load(["metro"], loadModules);

    // обрабатываем нажатие на кнопку "Enter" (строим маршрут)
    document.getElementById('toStreetText').onkeyup = function (event) {
        if (event.keyCode == 13) {
            makeRoute();
        }
    };
    document.getElementById('toNumberText').onkeyup = function (event) {
        if (document.getElementById('toStreetText').value != "" && document.getElementById('toNumberText').value != "")
        {
            // автоматически строим мартшрут если введены числи [0..9] или буквы "c"/"к" или ENTER
            makeRoute();
        }
    };
    document.getElementById('toNumber2Text').onkeyup = function (event) {
        if (document.getElementById('toStreet2Text').value != "" && document.getElementById('toNumber2Text').value != "")
        {
            // автоматически строим мартшрут если введены числи [0..9] или буквы "c"/"к" или ENTER
            makeRoute();
        }
    };
    document.getElementById('toNumber3Text').onkeyup = function (event) {
        if (document.getElementById('toStreet3Text').value != "" && document.getElementById('toNumber3Text').value != "")
        {
            // автоматически строим мартшрут если введены числи [0..9] или буквы "c"/"к" или ENTER
            makeRoute();
        }
    };
    document.getElementById('toNumberText').onkeypress = function (event) {
        if (document.getElementById('toStreetText').value != "")
        {
            var numberLength = document.getElementById('toNumberText').value.length;
            // запрещаем дальнейший ввод неверных символов
            if (numberLength < 10                                    &&     /* количество символов не больше 3х */
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
        if (document.getElementById('toStreet2Text').value != "")
        {
            var numberLength = document.getElementById('toNumber2Text').value.length;
            // запрещаем дальнейший ввод неверных символов
            if (numberLength < 10                                    &&     /* количество символов не больше 3х */
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
        if (document.getElementById('toStreet3Text').value != "")
        {
            var numberLength = document.getElementById('toNumber3Text').value.length;
            // запрещаем дальнейший ввод неверных символов
            if (numberLength < 10                                    &&     /* количество символов не больше 3х */
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

            // выберем откуда вычислять метро
            var addressToMetro = toAddress;
            // если обратное направление
            if ($("#backwardRButton")[0].checked == true){
                var point1 = "До:";
                var point2 = "От:";
            }

            // Зададим содержание иконок начальной и конечной точкам маршрута.
            var points = route.getWayPoints(),
                lastPoint = points.getLength() - 1;

            // Задаем контент меток в начальной и конечной точках.
            var firstPoint = points.get(0);
            var lastPoint = points.get(lastPoint);
            var fromStreetName = firstPoint.properties.get("GeocoderMetaData").AddressDetails.Country.AddressLine;
            var toStreetName = lastPoint.properties.get("GeocoderMetaData").AddressDetails.Country.AddressLine;
            firstPoint.properties.set('iconContent', '<b>point1</b> ' + fromStreetName);
            lastPoint.properties.set('iconContent', '<b>point2</b> ' + toStreetName);
            firstPoint.options.set('preset', 'islands#blueStretchyIcon');
            lastPoint.options.set('preset', 'islands#blueStretchyIcon');

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
                        }

                        // работаем с задержкой
                        setTimeout(function ()
                        {
                            // открываем балун для метки (последней, если их несколько)
                            /* пока не выводим балун на экран
                            metroPlacemark.balloon.open();
                            */
                        }, 1000);

                        // Поиск 2 адреса, если есть
                        if (document.getElementById('toStreet2Text').value != '' && document.getElementById('toNumber2Text').value != ''){
                            ymaps.geocode(to2Address, {
                                results: 1 // Если нужен только один результат, экономим трафик пользователей
                            }).then(function (res) {
                                    // Выбираем первый результат геокодирования.
                                    var firstGeoObject = res.geoObjects.get(0),
                                    // Координаты геообъекта.
                                        coords = firstGeoObject.geometry.getCoordinates();

                                    firstGeoObject.properties.set('iconContent', '<b>point2</b> ' + to2Address);
                                    firstGeoObject.options.set('preset', 'islands#blueStretchyIcon');

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

                                    secondGeoObject.properties.set('iconContent', '<b>point2</b> ' + to3Address);
                                    secondGeoObject.options.set('preset', 'islands#blueStretchyIcon');

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
        hideAddress(2, 'left');
        return;
    }
    if ( $('#address3Tr')[0].style.display === 'none')
    {
        $('#address3Tr')[0].style.display = "table-row";
        clearAddress(3);
        hideAddress(3, 'left');
        return;
    }
}

// функция добавления доп. адреса (левый)
function addLeftAddress() {
    if ( $('#address2Tr')[0].style.display === 'none')
    {
        $('#address2Tr')[0].style.display = "table-row";
        clearAddress(2);
        hideAddress(2, 'right');
        return;
    }
    if ( $('#address3Tr')[0].style.display === 'none')
    {
        $('#address3Tr')[0].style.display = "table-row";
        clearAddress(3);
        hideAddress(3, 'right');
        return;
    }
}

// функция добавления доп. адреса 2
function remove2Address() {
    $('#address2Tr')[0].style.display = "none";
    clearAddress(2);
}

// функция добавления доп. адреса 3
function remove3Address() {
    $('#address3Tr')[0].style.display = "none";
    clearAddress(3);
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

// Функция очистки доп. адресов
function hideAddress(number, side){
    if (number == 1){
        // не используем
    }
    else if (number == 2){
        if (side == 'right'){
            $('#toStreet2Text')[0].style.visibility = "hidden";
            $('#toNumber2Text')[0].style.visibility = "hidden";
        }
        else {
            $('#toStreet2Text')[0].style.visibility = "visible";
            $('#toNumber2Text')[0].style.visibility = "visible";
        }
    }
    else if (number == 3){
        if (side == 'right'){
            $('#toStreet3Text')[0].style.visibility = "hidden";
            $('#toNumber3Text')[0].style.visibility = "hidden";
        }
        else {
            $('#toStreet3Text')[0].style.visibility = "visible";
            $('#toNumber3Text')[0].style.visibility = "visible";
        }
    }
}

// подсчет стоимости поездки
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
        makeRoute();
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

    // используем для заказа доставки
    var newLocation = '?dir=' + encodeURIComponent(dir);
    newLocation += '&to=' + encodeURIComponent(toAddress);
    if (to2Address != '')
        newLocation += '&to2=' + encodeURIComponent(to2Address);
    if (to3Address != '')
        newLocation += '&to3=' + encodeURIComponent(to3Address);

    // для истории
    history.pushState(null, null, newLocation);

    // переход на новую локацию
    var newLocation = 'payment.html' + newLocation;
    window.location = newLocation;
}

