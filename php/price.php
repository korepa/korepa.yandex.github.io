<?php
    function calculate()
    {
        $price1 = 0;
        return $price1;

        // объявим переменные
        $city = $_GET['city'];
        $insideMKAD = $_GET['insideMKAD'];
        $townId = $_GET['townId'];
        $metroId = $_GET['metroId'];
        $metroDistance = $_GET['metroDistance'];
        $inDistance = $_GET['inDistance'];
        $outDistance = $_GET['outDistance'];

        //fatal("before getting fromAtoBDistance and fromAtoBDistance");

        $fromAtoBDistance = $_GET['fromAtoBDistance'];
        $fromBtoCDistance = $_GET['fromBtoCDistance'];

        fatal($fromAtoBDistance . " " . $fromBtoCDistance );

        $price = 0;

        return $price;
    }

    function fatal($error)
    {
        header('HTTP/1.1 500 Internal Server');//header('HTTP/1.1 500 Internal Server ' . $error);
        header('Content-Type: application/json; charset=UTF-8');
        die(json_encode(array('message' => $error, 'code' => 1337)));
    }

    // выводим результат функции подсчета суммы
    echo calculate();
?>