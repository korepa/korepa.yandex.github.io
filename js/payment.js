function loadPayment() {
    // получим параметры из запроса (то, что ввели на предыдущей странице)
    var from = decodeURIComponent(parseUrlQuery()['from']);
    var from2 = decodeURIComponent(parseUrlQuery()['from2']);
    var from3 = decodeURIComponent(parseUrlQuery()['from3']);
    var to = decodeURIComponent(parseUrlQuery()['to']);
    var to2 = decodeURIComponent(parseUrlQuery()['to2']);
    var to3 = decodeURIComponent(parseUrlQuery()['to3']);
    // адреса оттуда
    document.getElementById("routeFromLabel").innerHTML += from;
    if (from2 != '' && from2 != ', ' && from2 != 'undefined')
        document.getElementById("routeFromLabel").innerHTML += '<br>' + from2;
    if (from3 != '' && from3 != ', ' && from3 != 'undefined')
        document.getElementById("routeFromLabel").innerHTML += '<br>' + from3;
    // адреса туда
    document.getElementById("routeToLabel").innerHTML += to;
    if (to2 != '' && to2 != ', ' && to2 != 'undefined')
        document.getElementById("routeToLabel").innerHTML += '<br>' + to2;
    if (to3 != '' && to3 != ', ' && to3 != 'undefined')
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
    var dir;
    if (document.getElementById('forwardRButton').checked == true)
        dir = "from";
    else
        dir = "to";
    var fromAddress = document.getElementById('fromText').value;
    if (document.getElementById('fromNumberText').value!= '')
        fromAddress += ', ' + document.getElementById('fromNumberText').value;
    var from2Address = document.getElementById('from2Text').value;
    if (document.getElementById('fromNumber2Text').value!= '')
        from2Address += ', ' + document.getElementById('fromNumber2Text').value;
    var from3Address = document.getElementById('from3Text').value;
    if (document.getElementById('fromNumber3Text').value!= '')
        from3Address += ', ' + document.getElementById('fromNumber3Text').value;
    var toAddress = document.getElementById('toText').value;
    if (document.getElementById('toNumberText').value!= '')
        toAddress += ', ' + document.getElementById('toNumberText').value;
    var to2Address = document.getElementById('to2Text').value;
    if (document.getElementById('toNumber2Text').value!= '')
        to2Address += ', ' + document.getElementById('toNumber2Text').value;
    var to3Address = document.getElementById('to3Text').value;
    if (document.getElementById('toNumber3Text').value!= '')
        to3Address += ', ' + document.getElementById('toNumber3Text').value;

    // используем для заказа доставки
    var newLocation = '?dir=' + encodeURIComponent(dir);
    newLocation += '&from=' + encodeURIComponent(fromAddress);
    if (from2Address != '')
        newLocation += '&from2=' + encodeURIComponent(from2Address);
    if (from3Address != '')
        newLocation += '&from3=' + encodeURIComponent(from3Address);
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

function paymentSuccessBack() {
    // оплатили! успех
    window.location = 'index.html';
}

function paymentBack() {
    // назад по истории
    window.history.back();
}



