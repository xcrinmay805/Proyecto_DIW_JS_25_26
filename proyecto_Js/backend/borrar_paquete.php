<?php
require_once("funcionesBD.php");
header('Content-Type: application/json'); // Devuelve JSON
$conexion = obtenerConexion();

// Respuesta por defecto
$respuesta = [
    "error" => true,
    "mensaje" => "Error desconocido"
];

// Cuando se envía el formulario
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $nombre = trim($_POST['txtPaqueteEliminar'] ?? '');

    // Validación básica del nombre
    if (empty($nombre)) {
        $respuesta["mensaje"] = "Debes introducir el nombre del paquete.";
    } else {
        // Comprobar si el paquete existe
        $sqlCheck = "SELECT * FROM package WHERE nombre = ?";
        $stmt = mysqli_prepare($conexion, $sqlCheck);
        mysqli_stmt_bind_param($stmt, "s", $nombre);
        mysqli_stmt_execute($stmt);
        $resultado = mysqli_stmt_get_result($stmt);

        if (!$resultado) {
            $respuesta["mensaje"] = "Error en la consulta: " . mysqli_error($conexion);
        } elseif (mysqli_num_rows($resultado) == 0) {
            $respuesta["mensaje"] = "No se encontró ningún paquete con el nombre '$nombre'.";
        } else {
            // Borrar el cliente
            $sqlDelete = "DELETE FROM package WHERE nombre = ? LIMIT 1";
            $stmtDelete = mysqli_prepare($conexion, $sqlDelete);
            mysqli_stmt_bind_param($stmtDelete, "s", $nombre);

            if (mysqli_stmt_execute($stmtDelete)) {
                $respuesta["error"] = false;
                $respuesta["mensaje"] = "Paquete borrado correctamente.";
            } else {
                $respuesta["mensaje"] = "Error al borrar: " . mysqli_error($conexion);
            }
        }

        mysqli_stmt_close($stmt);
    }
}

mysqli_close($conexion);

// Devolver JSON
echo json_encode($respuesta);
exit;
?>
