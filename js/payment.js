function loadPayment() {
    // получим параметры из запроса (то, что ввели на предыдущей странице)
    var from = decodeURIComponent(parseUrlQuery()['from']);
    var to = decodeURIComponent(parseUrlQuery()['to']);
    var to2 = decodeURIComponent(parseUrlQuery()['to2']);
    var to3 = decodeURIComponent(parseUrlQuery()['to3']);
    document.getElementById("routeFromLabel").innerHTML += from;
    document.getElementById("routeToLabel").innerHTML += to;
    // добавочные адреса
    if (to2 != '' && to2 != ', ')
        document.getElementById("routeToLabel").innerHTML += '<br>' + to2;
    if (to3 != '' && to3 != ', ')
        document.getElementById("routeToLabel").innerHTML += '<br>' + to3;

    // обрабатываем ввод текста (активируем кнопку оплаты)
    document.getElementById('nameText').onkeyup = function (event) {
        if (document.getElementById('nameText').value != "")
            document.getElementById('payButton').disabled = false;
        else
            document.getElementById('payButton').disabled = true;
    };
}

function loadPaymentSuccess() {
    // получим параметры из запроса (то, что ввели на предыдущей странице)
    var passCount = decodeURIComponent(parseUrlQuery()['passcount']);
    var flightNumber = decodeURIComponent(parseUrlQuery()['flightnumber']);
    var arrivalDate = decodeURIComponent(parseUrlQuery()['arrivaldate']);
    var name = decodeURIComponent(parseUrlQuery()['name']);
    var soName = decodeURIComponent(parseUrlQuery()['soname']);
    var comment = decodeURIComponent(parseUrlQuery()['comment']);
    var tablePrint = decodeURIComponent(parseUrlQuery()['tableprint']);

    document.getElementById("passCountLabel").innerHTML = passCount;
    document.getElementById("flightNumberLabel").innerHTML = flightNumber;
    document.getElementById("arrivalDateLabel").innerHTML = arrivalDate;
    document.getElementById("nameLabel").innerHTML = name;
    document.getElementById("soNameLabel").innerHTML = soName;
    document.getElementById("commentLabel").innerHTML = comment;
    document.getElementById("tablePrintLabel").innerHTML = tablePrint;
}

function order() {
    // находим параметры для передачи
    var fromAddress = document.getElementById('fromText').value;
    var toAddress = document.getElementById('toText').value + ', ' + document.getElementById('toNumberText').value;
    var to2Address = document.getElementById('to2Text').value + ', ' + document.getElementById('toNumber2Text').value;
    var to3Address = document.getElementById('to3Text').value + ', ' + document.getElementById('toNumber3Text').value;
    // используем для заказа доставки
    var newLocation = 'payment.html';
    newLocation += '?from=' + encodeURIComponent(fromAddress);
    newLocation += '&to=' + encodeURIComponent(toAddress);
    if (to2Address != '')
        newLocation += '&to2=' + encodeURIComponent(to2Address);
    if (to3Address != '')
        newLocation += '&to3=' + encodeURIComponent(to3Address);
    window.location = newLocation;
}

function payment() {
    // находим параметры для передачи
    var passCount = document.getElementById('passCountText').value;
    var flightNumber = document.getElementById('flightNumberText').value;
    var arrivalDate = document.getElementById('arrivalDateText').value;
    var name = document.getElementById('nameText').value;
    var soName = document.getElementById('soNameText').value;
    var comment = document.getElementById('commentText').value;
    var tablePrint = document.getElementById('tablePrintText').value;

    // используем для формирования адреса с параметрами
    var newLocation = 'paymentSuccess.html';
    newLocation += '?passcount=' + encodeURIComponent(passCount);
    newLocation += '&flightnumber=' + encodeURIComponent(flightNumber);
    newLocation += '&arrivaldate=' + encodeURIComponent(arrivalDate);
    newLocation += '&name=' + encodeURIComponent(name);
    newLocation += '&soname=' + encodeURIComponent(soName);
    newLocation += '&comment=' + encodeURIComponent(comment);
    newLocation += '&tableprint=' + encodeURIComponent(tablePrint);

    // переход к оплате (пока фиктивно оплатили)
    window.location = newLocation;
}

function paymentBack() {
    // оплатили! успех
    window.location = 'index.html'
}

