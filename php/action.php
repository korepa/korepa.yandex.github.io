<?php echo '<p>Данные о поездке:</p>'; ?>

<?php echo htmlspecialchars($_POST['routeInfoCity1']); ?>.
<?php echo htmlspecialchars($_POST['routeInfoInsideMKAD1']); ?>.
<?php echo htmlspecialchars($_POST['routeInfoCity2']); ?>.
<?php echo htmlspecialchars($_POST['routeInfoInsideMKAD2']); ?>.
<?php echo htmlspecialchars($_POST['routeInfoCity3']); ?>.
<?php echo htmlspecialchars($_POST['routeInfoInsideMKAD3']); ?>.
<?php echo htmlspecialchars($_POST['routeInfoMetroName1']); ?>.
<?php echo htmlspecialchars($_POST['routeInfoMetroDistance1']); ?>.
<?php echo htmlspecialchars($_POST['routeInfoTotalDistance']); ?>.
<?php echo htmlspecialchars($_POST['routeInfoTotalPrice']); ?>.

<?php
function square($num)
{
    return $num * $num;
}
echo square(4);   // выводит '16'.
?>