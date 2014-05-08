function loadPayment() {
    // получим параметры из запроса (то, что ввели на предыдущей странице)
    var from = decodeURIComponent(parseUrlQuery()['from']);
    var to = decodeURIComponent(parseUrlQuery()['to']);
    document.getElementById("routeLabel").innerHTML += '(' + from + ' - ' + to + ')';
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
    var toAddress = document.getElementById('toText').value;
    // используем для заказа доставки
    var newLocation = 'payment.html?';
    newLocation += 'from=' + encodeURIComponent(fromAddress) + '&';
    newLocation += 'to=' + encodeURIComponent(toAddress);
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
    var newLocation = 'paymentSuccess.html?';
    newLocation += 'passcount=' + encodeURIComponent(passCount) + '&';
    newLocation += 'flightnumber=' + encodeURIComponent(flightNumber) + '&';
    newLocation += 'arrivaldate=' + encodeURIComponent(arrivalDate) + '&';
    newLocation += 'name=' + encodeURIComponent(name) + '&';
    newLocation += 'soname=' + encodeURIComponent(soName) + '&';
    newLocation += 'comment=' + encodeURIComponent(comment) + '&';
    newLocation += 'tableprint=' + encodeURIComponent(tablePrint);

    // переход к оплате (пока фиктивно оплатили)
    window.location = newLocation;
}

function paymentBack() {
    // оплатили! успех
    window.location = 'index.html'
}

