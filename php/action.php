<?php
    function calculate()
    {
        // объявим переменные
        $city = $_GET['city'];
        $insideMKAD = $_GET['insideMKAD'];
        $metroName = $_GET['metroName'];
        $metroDistance = $_GET['metroDistance'];
        $inDistance = $_GET['inDistance'];
        $outDistance = $_GET['outDistance'];

        // производим рассчет суммы
        $retval = $inDistance + $outDistance;

        // вернем подсчитанное значение
        return $retval;
    }

    // выводим результат функции подсчета суммы
    echo calculate();
?>