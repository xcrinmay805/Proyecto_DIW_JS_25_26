<?php
require_once("funcionesBD.php");

header("Content-Type: application/json; charset=UTF-8");

try {
    $conexion = obtenerConexion();

    // Cambia 'client' por tu tabla real de clientes
    $sql = "SELECT idpaquete, nombrepaquete, descripcion, preciopaquete, incluyehotel, 
        idviaje, contratacion, idcliente FROM package";
    $resultado = $conexion->query($sql);

    $datos = [];
    while ($fila = $resultado->fetch_assoc()) {
        $datos[] = $fila;
    }

    echo json_encode([
        "ok" => true,
        "mensaje" => "Paquetes recuperados correctamente",
        "datos" => $datos
    ]);

    $conexion->close();

} catch (mysqli_sql_exception $e) {
    echo json_encode([
        "ok" => false,
        "mensaje" => "Error en la base de datos: " . $e->getMessage(),
        "datos" => null
    ]);
} catch (Exception $e) {
    echo json_encode([
        "ok" => false,
        "mensaje" => "Error general: " . $e->getMessage(),
        "datos" => null
    ]);
}
