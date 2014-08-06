var data;

function loadPayment() {
    // получим параметры из запроса (то, что ввели на предыдущей странице)
    data = new Object();
    data.dir = decodeURIComponent(parseUrlQuery()['dir']);
    data.to = decodeURIComponent(parseUrlQuery()['to']);
    data.to2 = decodeURIComponent(parseUrlQuery()['to2']);
    data.to3 = decodeURIComponent(parseUrlQuery()['to3']);
    data.price = decodeURIComponent(parseUrlQuery()['price']);

    // адреса
    data.from = "Москва, аэропорт Внуково";
    if (data.dir == 'from'){
        document.getElementById("routeLabel").innerHTML = data.from;
        document.getElementById("routeLabel").innerHTML += ' - ' + data.to;
        if (data.to2 != '' && data.to2 != ', ' && data.to2 != 'undefined')
            document.getElementById("routeLabel").innerHTML += ' - ' + data.to2;
        if (data.to3 != '' && data.to3 != ', ' && data.to3 != 'undefined')
            document.getElementById("routeLabel").innerHTML += ' - ' + data.to3;
    }
    else{
        document.getElementById("routeLabel").innerHTML = data.to;
        if (data.to2 != '' && data.to2 != ', ' && data.to2 != 'undefined')
            document.getElementById("routeLabel").innerHTML += ' - ' + data.to2;
        if (data.to3 != '' && data.to3 != ', ' && data.to3 != 'undefined')
            document.getElementById("routeLabel").innerHTML += ' - ' + data.to3;
        document.getElementById("routeLabel").innerHTML += ' - ' + data.from;
    }

    // обрабатываем ввод текста (активируем кнопку оплаты)
    document.getElementById('nameText').onkeyup = function (event) {
        if (document.getElementById('nameText').value != "")
            document.getElementById('payButton').disabled = false;
        else
            document.getElementById('payButton').disabled = true;
    };

    // выводим или нет табличку "ТАКС ФРИ"
    if (data.dir == 'from'){
        document.getElementById('dirLabel').innerHTML = "Прилет: ";
        document.getElementById('signLabel').style.display = "block";
    }
}

function payment() {
    // параметры рейса
    data.flightNumber = document.getElementById('flightNumberText').value;
    data.date = document.getElementById('dateText').value;
    data.time = document.getElementById('timeText').value;
    data.name = document.getElementById('nameText').value;
    data.phone = document.getElementById('phoneText').value;
    data.email = document.getElementById('emailText').value;
    data.passCount = document.getElementById('passCountText').value;
    data.childrenCount = document.getElementById('childrenCountText').value;

    // используем для формирования адреса с параметрами
    var newLocation = 'payment2.html';
    newLocation += '?flightnumber=' + encodeURIComponent(data.flightNumber);
    newLocation += '&date=' + encodeURIComponent(data.date);
    newLocation += '&time=' + encodeURIComponent(data.time);
    newLocation += '&name=' + encodeURIComponent(data.name);
    newLocation += '&phone=' + encodeURIComponent(data.phone);
    newLocation += '&email=' + encodeURIComponent(data.email);
    newLocation += '&passcount=' + encodeURIComponent(data.passCount);
    newLocation += '&childrenCount=' + encodeURIComponent(data.childrenCount);
    newLocation += '&dir=' + encodeURIComponent(data.dir);
    newLocation += '&to=' + encodeURIComponent(data.to);
    newLocation += '&to2=' + encodeURIComponent(data.to2);
    newLocation += '&to3=' + encodeURIComponent(data.to3);
    newLocation += '&from=' + encodeURIComponent(data.from);
    newLocation += '&price=' + encodeURIComponent(data.price);

    // добавим надпись на табличке
    if (document.getElementById('signLabel').style.display == "block"){
        data.sign = document.getElementById('signLabel').innerText;
        var signArr = data.sign.split(':');
        data.sign = signArr[1].trim();
        newLocation += '&sign=' + encodeURIComponent(data.sign);
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
    var childrenIndex = 4 - index;
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
            option.text = (i + 0);
            document.getElementById('childrenCountText').add(option);
        }
    }
}

// изменяем количество пассажиров
function childrenCountChange(){
    // тут ничего не делаем
}

// Загрузка формы с типом оплаты
function loadPayment2(){
    // получим параметры из запроса (то, что ввели на предыдущей странице)
    data = new Object();
    data.dir = decodeURIComponent(parseUrlQuery()['dir']);
    data.to = decodeURIComponent(parseUrlQuery()['to']);
    data.to2 = decodeURIComponent(parseUrlQuery()['to2']);
    data.to3 = decodeURIComponent(parseUrlQuery()['to3']);
    data.from = decodeURIComponent(parseUrlQuery()['from']);
    data.flightNumber = decodeURIComponent(parseUrlQuery()['flightnumber']);
    data.date = decodeURIComponent(parseUrlQuery()['date']);
    data.time = decodeURIComponent(parseUrlQuery()['time']);
    data.name = decodeURIComponent(parseUrlQuery()['name']);
    data.phone = decodeURIComponent(parseUrlQuery()['phone']);
    data.email = decodeURIComponent(parseUrlQuery()['email']);
    data.passCount = decodeURIComponent(parseUrlQuery()['passcount']);
    data.childrenCount = decodeURIComponent(parseUrlQuery()['childrenCount']);
    data.sign = decodeURIComponent(parseUrlQuery()['sign']);
    data.price = decodeURIComponent(parseUrlQuery()['price']);
}

// вернемся
function backToOrder(){
    // назад по истории
    window.history.back();
}

// вернемся
function paymentProcessing(){
    // параметры оплаты
    data.payType = "card";
    if ((document.getElementById('cashButton').checked)){
        data.payType = "cash";
    }

    // запрос на бронирование заказа
    sendOrderRequest(data);

    // используем для формирования адреса с параметрами
    var newLocation = 'paymentSuccess.html';
    newLocation += '?flightnumber=' + encodeURIComponent(data.flightNumber);
    newLocation += '&date=' + encodeURIComponent(data.date);
    newLocation += '&time=' + encodeURIComponent(data.time);
    newLocation += '&name=' + encodeURIComponent(data.name);
    newLocation += '&phone=' + encodeURIComponent(data.phone);
    newLocation += '&email=' + encodeURIComponent(data.email);
    newLocation += '&passcount=' + encodeURIComponent(data.passCount);
    newLocation += '&childrenCount=' + encodeURIComponent(data.childrenCount);
    newLocation += '&dir=' + encodeURIComponent(data.dir);
    newLocation += '&to=' + encodeURIComponent(data.to);
    newLocation += '&to2=' + encodeURIComponent(data.to2);
    newLocation += '&to3=' + encodeURIComponent(data.to3);
    newLocation += '&from=' + encodeURIComponent(data.from);
    newLocation += '&sign=' + encodeURIComponent(data.sign);
    newLocation += '&payType=' + encodeURIComponent(data.payType);
    newLocation += '&price=' + encodeURIComponent(data.price);

    // переход к оплате (пока фиктивно оплатили)
    window.location = newLocation;
}

function loadPaymentSuccess() {
    // получим параметры из запроса (то, что ввели на предыдущей странице)
    data = new Object();
    data.dir = decodeURIComponent(parseUrlQuery()['dir']);
    data.to = decodeURIComponent(parseUrlQuery()['to']);
    data.to2 = decodeURIComponent(parseUrlQuery()['to2']);
    data.to3 = decodeURIComponent(parseUrlQuery()['to3']);
    data.from = decodeURIComponent(parseUrlQuery()['from']);
    data.flightNumber = decodeURIComponent(parseUrlQuery()['flightnumber']);
    data.date = decodeURIComponent(parseUrlQuery()['date']);
    data.time = decodeURIComponent(parseUrlQuery()['time']);
    data.name = decodeURIComponent(parseUrlQuery()['name']);
    data.phone = decodeURIComponent(parseUrlQuery()['phone']);
    data.email = decodeURIComponent(parseUrlQuery()['email']);
    data.passCount = decodeURIComponent(parseUrlQuery()['passcount']);
    data.childrenCount = decodeURIComponent(parseUrlQuery()['childrenCount']);
    data.sign = decodeURIComponent(parseUrlQuery()['sign']);
    data.payType = decodeURIComponent(parseUrlQuery()['payType']);
    data.price = decodeURIComponent(parseUrlQuery()['price']);

    document.getElementById("passCountLabel").innerHTML = data.passCount;
    document.getElementById("flightNumberLabel").innerHTML = data.flightNumber;
    document.getElementById("dateLabel").innerHTML = data.date + ' ' + data.time;
    document.getElementById("nameLabel").innerHTML = data.name;
    document.getElementById("phoneLabel").innerHTML = data.phone;
    document.getElementById("emailLabel").innerHTML = data.email;
    document.getElementById("childrenCountLabel").innerHTML = data.childrenCount;
    if (data.sign != "undefined"){
        document.getElementById("signTr").style.display = "table-row";
        document.getElementById("signLabel").innerHTML = data.sign;
    }
}

function sendOrderRequest(data){
    $.ajax({
        url:'php/order.php',
        data:{
            to:             data.to,
            to2:            data.to2,
            to3:            data.to3,
            from:           data.from,
            flightNumber:   data.flightNumber,
            flightDateTime: data.date + " " + data.time,
            name:           data.name,
            phone:          data.phone,
            email:          data.email,
            passCount:      data.passCount,
            childrenCount:  data.childrenCount,
            plateNote:      data.sign,
            payType:        data.payType,
            price:          data.price
        },
        complete: function (response) {
            alert(response.responseText)
        },
        error: function () {
            alert('Произошла ошибка бронирования заказа!');
        }
    });
}






