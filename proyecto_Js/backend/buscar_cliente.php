<?php
require_once("funcionesBD.php");
$conexion = obtenerConexion();

header("Content-Type: application/json; charset=UTF-8");

// Si no llega el nombre → error
if (!isset($_POST["txtNombre"]) || trim($_POST["txtNombre"]) === "") {
    echo json_encode([
        "ok" => false,
        "mensaje" => "Debes indicar un nombre"
    ]);
    exit;
}

$nombre = trim($_POST["txtNombre"]);

// Consulta
$sql = "SELECT idcliente, nombre, telefono, email, activo 
        FROM client 
        WHERE nombre LIKE '%$nombre%' 
        LIMIT 1";

$resultado = mysqli_query($conexion, $sql);

// Si NO existe
if (mysqli_num_rows($resultado) == 0) {
    echo json_encode([
        "ok" => false,
        "mensaje" => "No existe ningún cliente con ese nombre"
    ]);
    exit;
}

// Si existe
$fila = mysqli_fetch_assoc($resultado);

echo json_encode([
    "ok" => true,
    "mensaje" => "Cliente encontrado",
    "datos" => $fila
]);

mysqli_close($conexion);
