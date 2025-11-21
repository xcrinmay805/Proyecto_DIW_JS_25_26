<?php
require_once("funcionesBD.php");
$conexion = obtenerConexion();

$sql = "SELECT t.idviaje, c1.nombre AS origen, c2.nombre AS destino, t.fechasalida, t.fecharegreso, t.duracion, t.preciobase, t.cocheHotel
        FROM trip t
        JOIN city c1 ON t.idorigen = c1.idciudad
        JOIN city c2 ON t.iddestino = c2.idciudad
        ORDER BY t.idviaje ASC";

$resultado = mysqli_query($conexion, $sql);

$viajes = [];
if($resultado) {
    while($fila = mysqli_fetch_assoc($resultado)) {
        $viajes[] = $fila;
    }
}

mysqli_close($conexion);

// Devolver JSON
header('Content-Type: application/json');
echo json_encode($viajes);
