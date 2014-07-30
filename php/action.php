<?php

echo 'Данные о поездке:'."\n";

echo $_GET['routeInfoCity1']."\n";
echo $_GET['routeInfoInsideMKAD1']."\n";
if (!empty($_GET['routeInfoCity2']))
{
    echo $_GET['routeInfoCity2']."\n";
}
if (!empty($_GET['routeInfoInsideMKAD2']))
{
    echo $_GET['routeInfoInsideMKAD2']."\n";
}
if (!empty($_GET['routeInfoCity3']))
{
    echo $_GET['routeInfoCity3']."\n";
}
if (!empty($_GET['routeInfoInsideMKAD3']))
{
    echo $_GET['routeInfoInsideMKAD3']."\n";
}
echo $_GET['routeInfoMetroName1']."\n";
echo $_GET['routeInfoMetroDistance1']."\n";
echo $_GET['routeInfoTotalDistance']."\n";
echo $_GET['routeInfoTotalPrice']."\n";

echo 'Результат: 1000 р';

?>