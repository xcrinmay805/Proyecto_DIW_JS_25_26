<?php
require_once("funcionesBD.php");
$conexion = obtenerConexion();

$mensaje = "";

$sql2 = "SELECT idcliente, nombre FROM client;";
$resultado2 = mysqli_query($conexion, $sql2);

$options = " <option value=''>-- Seleccione --</option> ";
while ($fila = mysqli_fetch_assoc($resultado2)) {
    $options .= " <option value='" . $fila["idcliente"] . "'>" . $fila["nombre"]."</option>";
}

echo json_encode(array("options" => $options));
mysqli_close($conexion);
?>