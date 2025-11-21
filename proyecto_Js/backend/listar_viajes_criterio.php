<?php
require_once("funcionesViajes.php");

// Traer todas las ciudades para los select
$ciudades = obtenerCiudades();

$viajes = [];
$mensaje = "";

// Si se envió el formulario
if ($_SERVER["REQUEST_METHOD"] === "GET" && (isset($_GET['criterio']) || isset($_GET['preciomin']) || isset($_GET['preciomax']))) {
    $criterio = isset($_GET['criterio']) ? trim($_GET['criterio']) : "";
    $preciomin = isset($_GET['preciomin']) && is_numeric($_GET['preciomin']) ? $_GET['preciomin'] : 0;
    $preciomax = isset($_GET['preciomax']) && is_numeric($_GET['preciomax']) ? $_GET['preciomax'] : 999999;

    $conexion = obtenerConexion();
    $criterio = mysqli_real_escape_string($conexion, $criterio);

    // Consulta con criterio
    $sql = "SELECT t.idviaje, c1.nombre AS origen, c2.nombre AS destino, t.fechasalida, t.fecharegreso, t.duracion, t.preciobase, t.cocheHotel
            FROM trip t
            JOIN city c1 ON t.idorigen = c1.idciudad
            JOIN city c2 ON t.iddestino = c2.idciudad
            WHERE (c1.nombre LIKE '%$criterio%' OR c2.nombre LIKE '%$criterio%')
            AND t.preciobase BETWEEN '$preciomin' AND '$preciomax'
            ORDER BY t.idviaje ASC";

    $resultado = mysqli_query($conexion, $sql);

    if ($resultado && mysqli_num_rows($resultado) > 0) {
        while ($fila = mysqli_fetch_assoc($resultado)) {
            $viajes[] = $fila;
        }
    } else {
        $mensaje = "<div class='alert alert-warning text-center mt-3'>⚠️ No se encontraron viajes con ese criterio.</div>";
    }

    mysqli_close($conexion);
}

include_once("cabecera.html");
?>

<div class="container mt-4">
    <h2 class="text-center mb-4">Listado de Viajes según criterio</h2>

    <form class="row g-3 mb-4" action="listar_viajes_criterio.php" method="get">
        <div class="col-md-4">
            <label for="criterio" class="form-label">Ciudad (origen o destino)</label>
            <input type="text" class="form-control" id="criterio" name="criterio" placeholder="Introduce ciudad">
        </div>
        <div class="col-md-2">
            <label for="preciomin" class="form-label">Precio mínimo (€)</label>
            <input type="number" step="0.01" class="form-control" id="preciomin" name="preciomin" placeholder="0">
        </div>
        <div class="col-md-2">
            <label for="preciomax" class="form-label">Precio máximo (€)</label>
            <input type="number" step="0.01" class="form-control" id="preciomax" name="preciomax" placeholder="9999">
        </div>
        <div class="col-md-4 d-flex align-items-end">
            <button type="submit" class="btn btn-primary w-100">Buscar</button>
        </div>
    </form>

    <?php if (!empty($viajes)): ?>
        <table class="table table-striped table-bordered">
            <thead class="table-dark">
                <tr>
                    <th>ID</th>
                    <th>Origen</th>
                    <th>Destino</th>
                    <th>Fecha Salida</th>
                    <th>Fecha Regreso</th>
                    <th>Duración</th>
                    <th>Precio Base (€)</th>
                    <th>Coche/Hotel</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach($viajes as $viaje): ?>
                    <tr>
                        <td><?= $viaje['idviaje'] ?></td>
                        <td><?= $viaje['origen'] ?></td>
                        <td><?= $viaje['destino'] ?></td>
                        <td><?= $viaje['fechasalida'] ?></td>
                        <td><?= $viaje['fecharegreso'] ?></td>
                        <td><?= $viaje['duracion'] ?></td>
                        <td><?= number_format($viaje['preciobase'],2) ?></td>
                        <td><?= $viaje['cocheHotel'] ? 'Sí' : 'No' ?></td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    <?php else: ?>
        <?= $mensaje ?>
    <?php endif; ?>
</div>
