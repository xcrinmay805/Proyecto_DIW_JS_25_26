<?php
require_once("funcionesBD.php");
$conexion = obtenerConexion();

$mensaje = "";

// Si se envió el formulario
if (isset($_GET['txtCiudad']) && !empty(trim($_GET['txtCiudad']))) {
    $ciudad = trim($_GET['txtCiudad']);

    $sql = "SELECT t.idviaje, c1.nombre AS origen, c2.nombre AS destino, t.fechasalida, t.fecharegreso, t.duracion, t.preciobase, t.cocheHotel
            FROM trip t
            JOIN city c1 ON t.idorigen = c1.idciudad
            JOIN city c2 ON t.iddestino = c2.idciudad
            WHERE c1.nombre LIKE '%$ciudad%' OR c2.nombre LIKE '%$ciudad%'
            ORDER BY t.idviaje ASC";

    $resultado = mysqli_query($conexion, $sql);

    if (mysqli_num_rows($resultado) > 0) {
        $mensaje .= "<h2 class='text-center'>Resultados de la búsqueda</h2>";
        $mensaje .= "<table class='table table-striped mt-4'>";
        $mensaje .= "<thead><tr>
                        <th>ID</th>
                        <th>Origen</th>
                        <th>Destino</th>
                        <th>Fecha Salida</th>
                        <th>Fecha Regreso</th>
                        <th>Duración</th>
                        <th>Precio Base (€)</th>
                        <th>Coche/Hotel</th>
                    </tr></thead><tbody>";

        while ($viaje = mysqli_fetch_assoc($resultado)) {
            $mensaje .= "<tr>";
            $mensaje .= "<td>" . $viaje['idviaje'] . "</td>";
            $mensaje .= "<td>" . $viaje['origen'] . "</td>";
            $mensaje .= "<td>" . $viaje['destino'] . "</td>";
            $mensaje .= "<td>" . $viaje['fechasalida'] . "</td>";
            $mensaje .= "<td>" . $viaje['fecharegreso'] . "</td>";
            $mensaje .= "<td>" . $viaje['duracion'] . "</td>";
            $mensaje .= "<td>" . number_format($viaje['preciobase'], 2) . "</td>";
            $mensaje .= "<td>" . ($viaje['cocheHotel'] ? 'Sí' : 'No') . "</td>";
            $mensaje .= "</tr>";
        }

        $mensaje .= "</tbody></table>";
    } else {
        $mensaje = "<div class='alert alert-warning text-center mt-3'>⚠️ No se encontraron viajes para esa ciudad.</div>";
    }
} elseif (isset($_GET['txtCiudad'])) {
    $mensaje = "<div class='alert alert-danger text-center mt-3'>Por favor, ingresa un nombre de ciudad para buscar.</div>";
}

mysqli_close($conexion);
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resultados de Búsqueda</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
<div class="container mt-4">
    <?php echo $mensaje; ?>
    <div class="text-center mt-3">
        <a href="buscarviaje.html" class="btn btn-secondary">Volver a buscar</a>
    </div>
</div>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
