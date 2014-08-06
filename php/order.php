<?php
    function order()
    {
        // объявим переменные
        $dir = $_GET['dir'];
        $to = $_GET['to'];
        $to2 = $_GET['to2'];
        $to3 = $_GET['to3'];
        $from = $_GET['from'];
        $flightNumber = $_GET['flightnumber'];
        $date = $_GET['date'];
        $time = $_GET['time'];
        $name = $_GET['name'];
        $phone = $_GET['phone'];
        $email = $_GET['email'];
        $passCount = $_GET['passcount'];
        $childrenCount = $_GET['childrenCount'];
        $sign = $_GET['sign'];
        $payType = $_GET['payType'];
        $price = $_GET['price'];

        // производим действия
        $retval = 0;

        // вернем результат
        return $retval;
    }

    // выводим результат бронирования заказа
    echo order();
?>