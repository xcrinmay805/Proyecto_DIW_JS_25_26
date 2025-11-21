<?php
require_once("funcionesBD.php");
$conexion = obtenerConexion();

header('Content-Type: application/json');

try {
    // Recoger los filtros
    $nombre = $_POST['txtNombre'] ?? '';
    $telefono = $_POST['txtTelefono'] ?? '';
    $email = $_POST['txtEmail'] ?? '';
    $soloActivos = isset($_POST['chkActivo']) ? 1 : null;

    $sql = "SELECT idcliente, nombre, telefono, email, activo, fecharegistro FROM client WHERE 1=1";
    $params = [];
    $tipos = ""; // Para bind_param

    if (!empty($nombre)) {
        $sql .= " AND nombre LIKE ?";
        $params[] = "%$nombre%";
        $tipos .= "s";
    }
    if (!empty($telefono)) {
        $sql .= " AND telefono LIKE ?";
        $params[] = "%$telefono%";
        $tipos .= "s";
    }
    if (!empty($email)) {
        $sql .= " AND email LIKE ?";
        $params[] = "%$email%";
        $tipos .= "s";
    }
    if ($soloActivos !== null) {
        $sql .= " AND activo = 1";
    }

    $sql .= " ORDER BY idcliente ASC";

    $stmt = $conexion->prepare($sql);
    if (!empty($params)) {
        $stmt->bind_param($tipos, ...$params);
    }

    $stmt->execute();
    $resultado = $stmt->get_result();

    $datos = [];
    while ($fila = $resultado->fetch_assoc()) {
        $datos[] = [
            "idcliente" => $fila['idcliente'],
            "nombre" => $fila['nombre'],
            "telefono" => $fila['telefono'],
            "email" => $fila['email'],
            "activo" => $fila['activo'],
            "fecharegistro" => $fila['fecharegistro']
        ];
    }

    echo json_encode([
        "ok" => true,
        "datos" => $datos
    ]);

} catch (Exception $e) {
    echo json_encode([
        "ok" => false,
        "mensaje" => $e->getMessage()
    ]);
}

$conexion->close();
?>
