<?php
require_once("funcionesBD.php");
$conexion = obtenerConexion();

header('Content-Type: application/json');

try {
    // Recoger los filtros
    $nombre = $_POST['txtNombrePaqueteBuscado'] ?? '';
    $origen = $_POST['lsOrigen'] ?? '';
    $destino = $_POST['lsDestino'] ?? '';
    $soloActivos = isset($_POST['chkHotel']) ? 1 : null;


    $sql = "SELECT p.idpaquete, p.nombrepaquete, p.descripcion, p.preciopaquete, p.incluyehotel, p.idviaje, p.contratacion, p.idcliente, t.idorigen, t.iddestino
                FROM package p INNER JOIN trip t ON p.idviaje = t.idviaje
                WHERE 1=1";

        if (!empty($nombre)) {
            $sql .= " AND p.nombrepaquete LIKE '%" . mysqli_real_escape_string($conexion, $nombre) . "%'";
        }
        if (!empty($origen)) {
            $sql .= " AND t.idorigen LIKE '%" . mysqli_real_escape_string($conexion, $origen) . "%'";
        }
        if (!empty($destino)) {
            $sql .= " AND t.iddestino LIKE '%" . mysqli_real_escape_string($conexion, $destino) . "%'";
        }
        if ($soloActivos !== null) {
            $sql .= " AND p.incluyehotel = 1";
        }

        $sql .= " ORDER BY p.idpaquete ASC;";

    $params = [];
    $tipos = '';

    $stmt = $conexion->prepare($sql);
    if (!empty($params)) {
        $stmt->bind_param($tipos, ...$params);
    }

    $stmt->execute();
    $resultado = $stmt->get_result();

    $datos = [];
    while ($fila = $resultado->fetch_assoc()) {
        $datos[] = [
            "idpaquete" => $fila['idpaquete'],
            "nombrepaquete" => $fila['nombrepaquete'],
            "descripcion" => $fila['descripcion'],
            "preciopaquete" => $fila['preciopaquete'],
            "incluyehotel" => $fila['incluyehotel'],
            "idviaje" => $fila['idviaje'],
            "contratacion" => $fila['contratacion'],
            "idcliente" => $fila['idcliente'],
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
