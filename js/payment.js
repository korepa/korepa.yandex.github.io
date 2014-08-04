function loadPayment() {
    // получим параметры из запроса (то, что ввели на предыдущей странице)
    var dir = decodeURIComponent(parseUrlQuery()['dir']);
    var to = decodeURIComponent(parseUrlQuery()['to']);
    var to2 = decodeURIComponent(parseUrlQuery()['to2']);
    var to3 = decodeURIComponent(parseUrlQuery()['to3']);

    // адреса
    var from = "Москва, аэропорт Внуково";
    if (dir == 'from'){
        document.getElementById("routeLabel").innerHTML = from;
        document.getElementById("routeLabel").innerHTML += ' - ' + to;
        if (to2 != '' && to2 != ', ' && to2 != 'undefined')
            document.getElementById("routeLabel").innerHTML += ' - ' + to2;
        if (to3 != '' && to3 != ', ' && to3 != 'undefined')
            document.getElementById("routeLabel").innerHTML += ' - ' + to3;
    }
    else{
        document.getElementById("routeLabel").innerHTML = to;
        if (to2 != '' && to2 != ', ' && to2 != 'undefined')
            document.getElementById("routeLabel").innerHTML += ' - ' + to2;
        if (to3 != '' && to3 != ', ' && to3 != 'undefined')
            document.getElementById("routeLabel").innerHTML += ' - ' + to3;
        document.getElementById("routeLabel").innerHTML += ' - ' + from;
    }

    // обрабатываем ввод текста (активируем кнопку оплаты)
    document.getElementById('nameText').onkeyup = function (event) {
        if (document.getElementById('nameText').value != "")
            document.getElementById('payButton').disabled = false;
        else
            document.getElementById('payButton').disabled = true;
    };

    // выводим или нет табличку "ТАКС ФРИ"
    if (dir == 'from'){
        document.getElementById('dirLabel').innerHTML = "Прилет: ";
        document.getElementById('signLabel').style.display = "block";
    }
}

function payment() {
    // параметры рейса
    var flightNumber = document.getElementById('flightNumberText').value;
    var date = document.getElementById('dateText').value;
    var time = document.getElementById('timeText').value;

    // данные пассажиров
    var name = document.getElementById('nameText').value;
    var phone = document.getElementById('phoneText').value;
    var email = document.getElementById('emailText').value;
    var passCount = document.getElementById('passCountText').value;
    var childrenCount = document.getElementById('childrenCountText').value;

    // используем для формирования адреса с параметрами
    var newLocation = 'payment2.html';
    newLocation += '?flightnumber=' + encodeURIComponent(flightNumber);
    newLocation += '&date=' + encodeURIComponent(date);
    newLocation += '&time=' + encodeURIComponent(time);
    newLocation += '&name=' + encodeURIComponent(name);
    newLocation += '&phone=' + encodeURIComponent(phone);
    newLocation += '&email=' + encodeURIComponent(email);
    newLocation += '&passcount=' + encodeURIComponent(passCount);
    newLocation += '&childrenCount=' + encodeURIComponent(childrenCount);

    // добавим надпись на табличке
    if (document.getElementById('signLabel').style.display == "block"){
        var sign = document.getElementById('signLabel').innerText;
        var signArr = sign.split(':');
        sign = signArr[1].trim();
        newLocation += '&sign=' + encodeURIComponent(sign);
    }

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

// изменяем количество пассажиров
function passCountChange(){
    var options = document.getElementById('passCountText').options;
    var index = document.getElementById('passCountText').selectedIndex;
    var childrenIndex = 3 - index;
    var i;

    // удалим все варианты
    for(i=document.getElementById('childrenCountText').options.length-1;i>=0;i--)
    {
        document.getElementById('childrenCountText').remove(i);
    }

    // если нет больше мест
    if (childrenIndex == 0){
        document.getElementById('childrenCountText').disabled = true;
    }
    else{
        document.getElementById('childrenCountText').disabled = false;
        // добавим нужные варианты
        for(i=0;i<childrenIndex;i++)
        {
            var option = document.createElement("option");
            option.text = (i + 1);
            document.getElementById('childrenCountText').add(option);
        }
    }
}

// изменяем количество пассажиров
function childrenCountChange(){
    // тут ничего не делаем
}

function loadPaymentSuccess() {
    // получим параметры из запроса (то, что ввели на предыдущей странице)
    var flightNumber = decodeURIComponent(parseUrlQuery()['flightnumber']);
    var date = decodeURIComponent(parseUrlQuery()['date']);
    var time = decodeURIComponent(parseUrlQuery()['time']);
    var name = decodeURIComponent(parseUrlQuery()['name']);
    var phone = decodeURIComponent(parseUrlQuery()['phone']);
    var email = decodeURIComponent(parseUrlQuery()['email']);
    var passCount = decodeURIComponent(parseUrlQuery()['passcount']);
    var childrenCount = decodeURIComponent(parseUrlQuery()['childrenCount']);
    var sign = decodeURIComponent(parseUrlQuery()['sign']);

    document.getElementById("passCountLabel").innerHTML = passCount;
    document.getElementById("flightNumberLabel").innerHTML = flightNumber;
    document.getElementById("dateLabel").innerHTML = date + ' ' + time;
    document.getElementById("nameLabel").innerHTML = name;
    document.getElementById("phoneLabel").innerHTML = phone;
    document.getElementById("emailLabel").innerHTML = email;
    document.getElementById("childrenCountLabel").innerHTML = childrenCount;
    if (sign != "undefined"){
        document.getElementById("signTr").style.display = "table-row";
        document.getElementById("signLabel").innerHTML = sign;
    }
}

// Загрузка формы с типом оплаты
function loadPayment2Success(){
    // тут пока ничего не грузим (а надо параметры передавать)

}

// вернемся
function backToOrder(){
    // назад по истории
    window.history.back();
}

// вернемся
function paymentProcessing(){
    // используем для формирования адреса с параметрами
    var newLocation = 'paymentSuccess.html';

    // передаем параметры

    // переход к оплате (пока фиктивно оплатили)
    window.location = newLocation;
}






