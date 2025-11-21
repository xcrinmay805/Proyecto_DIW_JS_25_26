<?php
// Incluir el archivo de funciones de base de datos
require_once("funcionesBD.php");
$conexion = obtenerConexion();

// ====================================================================
// 1. PROCESAMIENTO AJAX (MÉTODO POST)
// Esta lógica se ejecuta cuando el JavaScript (AJAX) envía los datos.
// ====================================================================

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // 1.1. Recoger datos del POST
    // Usamos el operador de fusión de null (??) o un valor por defecto para evitar warnings si la clave no existe.
    $nombre = $_POST['txtNombrePaquete'] ?? '';
    $descripcion = $_POST['txtDescripcion'] ?? '';
    $precioPaquete = $_POST['txtPrecio'] ?? '';
    // El checkbox debe manejarse, ya que solo se envía si está marcado.
    $hotel = isset($_POST['chkIncluyeHotel']) ? 1 : 0;
    $idViaje = $_POST['lstViaje'] ?? '';

    $idCliente = $_POST['lstUsu'] ?? '';

    // 1.2. Consulta SQL segura (Sentencias Preparadas)
    $sql = "INSERT INTO package (nombrepaquete, descripcion, preciopaquete, incluyehotel, idviaje, contratacion,idcliente)
            VALUES ( ?, ?, ?, ?,?, NOW(), ? )";

    $stmt = mysqli_prepare($conexion, $sql);
    
    // El 'sssi' indica que los tipos de datos son: String, String, String, Integer
    mysqli_stmt_bind_param($stmt, "ssiiii", $nombre, $descripcion, $precioPaquete, $hotel, $idViaje, $idCliente);

    // 1.3. Ejecutar y preparar la respuesta JSON
    if (mysqli_stmt_execute($stmt)) {
        $respuesta = [
            'ok' => true,
            'mensaje' => '✅ Cliente agregado correctamente. ID: ' . mysqli_insert_id($conexion)
        ];
    } else {
        $respuesta = [
            'ok' => false,
            'mensaje' => '❌ Error al agregar paquete: ' . mysqli_error($conexion)
        ];
    }

    // 1.4. Devolver la respuesta en formato JSON
    header('Content-Type: application/json');
    echo json_encode($respuesta);
    
    // Cerrar conexión y detener la ejecución
    mysqli_close($conexion);
    exit; 
}


// ====================================================================
// 2. CARGA DE PÁGINA (MÉTODO GET)
// Esta lógica se ejecuta cuando el navegador carga la URL directamente.
// ====================================================================

// 2.1. Obtener la lista de clientes para el select
$sql = "SELECT idcliente ,nombre FROM client;";
$resultado = mysqli_query($conexion, $sql);

$options = "";
if ($resultado) {
    while ($fila = mysqli_fetch_assoc($resultado)) {
        $options .= " <option value='" . $fila["idcliente"] . "'>" . $fila["nombre"] . "</option>";
    }
}
 
// 2.2. Cerrar conexión al final del script GET
mysqli_close($conexion); 
?>