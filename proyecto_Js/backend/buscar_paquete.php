<?php
require_once("funcionesBD.php");
$conexion = obtenerConexion();

header("Content-Type: application/json; charset=UTF-8");

// Si no llega el nombre → error
if (!isset($_POST["txtPaqueteBuscado"]) || trim($_POST["txtPaqueteBuscado"]) === "") {
    echo json_encode([
        "ok" => false,
        "mensaje" => "Debes indicar un nombre"
    ]);
    exit;
}

$nombre = trim($_POST["txtPaqueteBuscado"]);

// Consulta
$sql = "SELECT idpaquete, nombrepaquete, descripcion, preciopaquete, incluyehotel, idviaje, contratacion, idcliente
        FROM package 
        WHERE nombrepaquete LIKE '%$nombre%' ";

$resultado = mysqli_query($conexion, $sql);

// Si NO existe
if (mysqli_num_rows($resultado) == 0) {
    echo json_encode([
        "ok" => false,
        "mensaje" => "No existe ningún paquete con ese nombre"
    ]);
    exit;
}

// Si existe
$fila = mysqli_fetch_assoc($resultado);

echo json_encode([
    "ok" => true,
    "mensaje" => "Paquete encontrado",
    "datos" => $fila
]);

mysqli_close($conexion);
