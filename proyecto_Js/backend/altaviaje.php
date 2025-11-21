<?php
require_once("funcionesBD.php");
$conexion = obtenerConexion();

header('Content-Type: application/json');

$response = ['success' => false, 'mensaje' => ''];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $idorigen = $_POST['idorigen'];
    $iddestino = $_POST['iddestino'];
    $fechasalida = $_POST['fechasalida'];
    $fecharegreso = $_POST['fecharegreso'];
    $duracion = $_POST['duracion'];
    $preciobase = $_POST['preciobase'];
    $cocheHotel = isset($_POST['cocheHotel']) ? 1 : 0;

    $sql = "INSERT INTO trip (idorigen, iddestino, fechasalida, fecharegreso, duracion, preciobase, cocheHotel)
            VALUES ('$idorigen', '$iddestino', '$fechasalida', '$fecharegreso', '$duracion', '$preciobase', '$cocheHotel')";

    if (mysqli_query($conexion, $sql)) {
        $response['success'] = true;
        $response['mensaje'] = "✅ Viaje agregado correctamente.";
    } else {
        $response['mensaje'] = "❌ Error al agregar viaje: " . mysqli_error($conexion);
    }
}

mysqli_close($conexion);
echo json_encode($response);
