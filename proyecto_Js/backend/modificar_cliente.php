<?php
require_once("funcionesBD.php");
$conexion = obtenerConexion();

header('Content-Type: application/json; charset=utf-8');


$nombreAntiguo = trim($_POST['txtNombreAntiguo'] ?? "");
$nuevoNombre   = trim($_POST['txtNuevoNombre'] ?? "");
$telefono      = trim($_POST['txtTelefono'] ?? "");
$email         = trim($_POST['txtEmail'] ?? "");
$activo        = isset($_POST['chkActivo']) ? 1 : 0;


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
    FROM client 
    WHERE nombre COLLATE utf8mb4_general_ci = '" . mysqli_real_escape_string($conexion, $nombreAntiguo) . "'
";

$resultado = mysqli_query($conexion, $sqlCheck);

if (!$resultado) {
    echo json_encode(["ok" => false, "mensaje" => "Error SQL: " . mysqli_error($conexion)]);
    exit;
}

if (mysqli_num_rows($resultado) == 0) {
    echo json_encode(["ok" => false, "mensaje" => "No existe ningún cliente con ese nombre"]);
    exit;
}


$sqlUpdate = "
    UPDATE client
    SET nombre = '" . mysqli_real_escape_string($conexion, $nuevoNombre) . "',
        telefono = '" . mysqli_real_escape_string($conexion, $telefono) . "',
        email = '" . mysqli_real_escape_string($conexion, $email) . "',
        activo = $activo
    WHERE nombre COLLATE utf8mb4_general_ci = '" . mysqli_real_escape_string($conexion, $nombreAntiguo) . "'
";

if (!mysqli_query($conexion, $sqlUpdate)) {
    echo json_encode(["ok" => false, "mensaje" => "Error SQL al actualizar: " . mysqli_error($conexion)]);
    exit;
}


echo json_encode([
    "ok" => true,
    "mensaje" => "Cliente actualizado correctamente"
]);

mysqli_close($conexion);
exit;
?>
