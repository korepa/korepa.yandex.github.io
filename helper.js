var myMap;

// Дождёмся загрузки API и готовности DOM.
ymaps.ready(init);

function init () {

    myMap = new ymaps.Map('map', {
        // При инициализации карты обязательно нужно указать
        // её центр и коэффициент масштабирования.
        center:[55.76, 37.64], // Москва
        zoom:7,
        behaviors: ['default', 'scrollZoom']
    });

    document.getElementById('orderButton').onclick = function () {
        // используем для заказа доставки
        window.location = 'payment.html'
    };

    document.getElementById('payButton').onclick = function () {
        // используем для перехода к оплате платежной системой

    };
}

