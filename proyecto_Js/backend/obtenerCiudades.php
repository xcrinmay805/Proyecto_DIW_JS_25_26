<?php
require_once("funcionesBD.php");
$conexion = obtenerConexion();

$sql = "SELECT idciudad, nombre FROM city";
$resultado = mysqli_query($conexion, $sql);

$ciudades = [];
while ($fila = mysqli_fetch_assoc($resultado)) {
    $ciudades[] = $fila;
}

mysqli_close($conexion);
echo json_encode($ciudades);
