<?php
require_once("funcionesBD.php");
header('Content-Type: application/json');

$conexion = obtenerConexion();
$respuesta = ["exito" => false, "mensaje" => ""];

// Comprobar si se enviaron datos
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $idviaje = trim($_POST['idviaje']);
    $idorigen = $_POST['idorigen'];
    $iddestino = $_POST['iddestino'];
    $fechasalida = $_POST['fechasalida'];
    $fecharegreso = $_POST['fecharegreso'];
    $duracion = $_POST['duracion'];
    $preciobase = $_POST['preciobase'];
    $cocheHotel = isset($_POST['cocheHotel']) ? 1 : 0;

    if (empty($idviaje)) {
        $respuesta['mensaje'] = "❌ Debes introducir el ID del viaje a modificar.";
    } else {
        // Comprobar si existe el viaje
        $sqlCheck = "SELECT * FROM trip WHERE idviaje = '$idviaje'";
        $resultado = mysqli_query($conexion, $sqlCheck);

        if (!$resultado) {
            $respuesta['mensaje'] = "❌ Error en la consulta: " . mysqli_error($conexion);
        } elseif (mysqli_num_rows($resultado) == 0) {
            $respuesta['mensaje'] = "⚠️ No se encontró ningún viaje con ID '$idviaje'.";
        } else {
            // Actualizar el viaje
            $sqlUpdate = "UPDATE trip SET 
                            idorigen = '$idorigen',
                            iddestino = '$iddestino',
                            fechasalida = '$fechasalida',
                            fecharegreso = '$fecharegreso',
                            duracion = '$duracion',
                            preciobase = '$preciobase',
                            cocheHotel = '$cocheHotel'
                          WHERE idviaje = '$idviaje'";

            if (mysqli_query($conexion, $sqlUpdate)) {
                $respuesta['exito'] = true;
                $respuesta['mensaje'] = "✅ Viaje actualizado correctamente.";
            } else {
                $respuesta['mensaje'] = "❌ Error al actualizar: " . mysqli_error($conexion);
            }
        }
    }
}

mysqli_close($conexion);
echo json_encode($respuesta);
