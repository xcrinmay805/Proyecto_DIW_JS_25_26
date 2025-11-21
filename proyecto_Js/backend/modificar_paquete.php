<?php
require_once("funcionesBD.php");
$conexion = obtenerConexion();

header('Content-Type: application/json; charset=utf-8');


$nombreAntiguo = trim($_POST['txtNombreAntiguoPaquete'] ?? "");
$nuevoNombre   = trim($_POST['txtNuevoNombrePaquete'] ?? "");
$descripcion      = trim($_POST['txtDescripcionModificada'] ?? "");
$precio         = trim($_POST['txtPrecioModificado'] ?? "");
$hotel        = isset($_POST['chkIncluyeHotel']) ? 1 : 0;
$viaje       = trim($_POST['lstViajeModificar'] ?? "");
$cliente        = trim($_POST['lstUsuModificar'] ?? "");


$nombreAntiguo = mb_convert_encoding($nombreAntiguo, "UTF-8", "UTF-8");
$nuevoNombre   = mb_convert_encoding($nuevoNombre, "UTF-8", "UTF-8");


if ($nombreAntiguo === "") {
    echo json_encode(["ok" => false, "mensaje" => "Debe introducir el nombre antiguo"]);
    exit;
}

if ($nuevoNombre === "") {
    echo json_encode(["ok" => false, "mensaje" => "El nombre nuevo no puede estar vacío"]);
    exit;
}


$sqlCheck = "
    SELECT * 
    FROM package 
    WHERE nombrepaquete COLLATE utf8mb4_general_ci = '" . mysqli_real_escape_string($conexion, $nombreAntiguo) . "'
";

$resultado = mysqli_query($conexion, $sqlCheck);

if (!$resultado) {
    echo json_encode(["ok" => false, "mensaje" => "Error SQL: " . mysqli_error($conexion)]);
    exit;
}

if (mysqli_num_rows($resultado) == 0) {
    echo json_encode(["ok" => false, "mensaje" => "No existe ningún paquete con ese nombre"]);
    exit;
}


$sqlUpdate = "
    UPDATE client
    SET nombrepaquete = '" . mysqli_real_escape_string($conexion, $nuevoNombre) . "',
        descripcion = '" . mysqli_real_escape_string($conexion, $descripcion) . "',
        preciopaquete = '" . mysqli_real_escape_string($conexion, $precio) . "',
        incluyehotel = $hotel,
        idviaje = '" . mysqli_real_escape_string($conexion, $viaje) . "',
        contratacion = NOW(),
        idcliente = '" . mysqli_real_escape_string($conexion, $cliente) . "'
    WHERE nombre COLLATE utf8mb4_general_ci = '" . mysqli_real_escape_string($conexion, $nombreAntiguo) . "'
";

if (!mysqli_query($conexion, $sqlUpdate)) {
    echo json_encode(["ok" => false, "mensaje" => "Error SQL al actualizar: " . mysqli_error($conexion)]);
    exit;
}


echo json_encode([
    "ok" => true,
    "mensaje" => "Paquete actualizado correctamente"
]);

mysqli_close($conexion);
exit;
?>
