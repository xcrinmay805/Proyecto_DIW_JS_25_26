<?php
require_once("funcionesBD.php");
$conexion = obtenerConexion();

$mensaje = "";

$sql2 = "SELECT v.idviaje ,c1.nombre AS origen, c2.nombre AS destino FROM trip v
    INNER JOIN city c1 ON v.idorigen = c1.idciudad  INNER JOIN city c2 ON v.iddestino = c2.idciudad;";
$resultado2 = mysqli_query($conexion, $sql2);




$options = " <option value=''>-- Seleccione --</option> ";
while ($fila = mysqli_fetch_assoc($resultado2)) {
    $options .= " <option value='" . $fila["idviaje"] . "'>" . $fila["origen"] ." - ".$fila["destino"]. "</option>";
}

echo json_encode(array("options" => $options));
mysqli_close($conexion);
?>