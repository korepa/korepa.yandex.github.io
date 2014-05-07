function loadPayment() {
    // получим параметры из запроса (то, что ввели на предыдущей странице)
    var from = decodeURIComponent(parseUrlQuery()['from']);
    var to = decodeURIComponent(parseUrlQuery()['to']);
    document.getElementById("routeLabel").innerHTML += '(' + from + ' - ' + to + ')';
}

function payment() {
    // оплатили! успех
    window.location = 'paymentSuccess.html'
}

function paymentBack() {
    // оплатили! успех
    window.location = 'main.html'
}

