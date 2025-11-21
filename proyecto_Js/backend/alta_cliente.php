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
    $nombre = $_POST['txtNombre'] ?? '';
    $telefono = $_POST['txtTelefono'] ?? '';
    $email = $_POST['txtEmail'] ?? '';
    // El checkbox debe manejarse, ya que solo se envía si está marcado.
    $activo = isset($_POST['chkActivo']) ? 1 : 0;

    // 1.2. Consulta SQL segura (Sentencias Preparadas)
    $sql = "INSERT INTO client (nombre, telefono, email, activo, fecharegistro)
            VALUES (?, ?, ?, ?, NOW())";

    $stmt = mysqli_prepare($conexion, $sql);
    
    // El 'sssi' indica que los tipos de datos son: String, String, String, Integer
    mysqli_stmt_bind_param($stmt, "sssi", $nombre, $telefono, $email, $activo);

    // 1.3. Ejecutar y preparar la respuesta JSON
    if (mysqli_stmt_execute($stmt)) {
        $respuesta = [
            'ok' => true,
            'mensaje' => '✅ Cliente agregado correctamente. ID: ' . mysqli_insert_id($conexion)
        ];
    } else {
        $respuesta = [
            'ok' => false,
            'mensaje' => '❌ Error al agregar cliente: ' . mysqli_error($conexion)
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

// 2.2. Incluir cabecera HTML
include_once("cabecera.html");
?>

<div class="container" id="formularios">
    <div class="row">
        <form class="form-horizontal" action="alta_cliente.php" name="frmAltaCliente" id="frmAltaCliente" method="post">
            <fieldset>
                <legend>Alta de cliente</legend>

                <div class="form-group">
                    <label class="col-xs-4 control-label" for="txtNombre">Nombre</label>
                    <div class="col-xs-4">
                        <input id="txtNombre" name="txtNombre" placeholder="Nombre del cliente" class="form-control input-md" maxlength="100" type="text" required>
                    </div>
                </div>

                <div class="form-group">
                    <label class="col-xs-4 control-label" for="txtTelefono">Teléfono</label>
                    <div class="col-xs-4">
                        <input id="txtTelefono" name="txtTelefono" placeholder="Teléfono" class="form-control input-md" type="number" required>
                    </div>
                </div>

                <div class="form-group">
                    <label class="col-xs-4 control-label" for="txtEmail">Email</label>
                    <div class="col-xs-4">
                        <input id="txtEmail" name="txtEmail" placeholder="Correo electrónico" class="form-control input-md" type="email" required>
                    </div>
                </div>

                <div class="form-group">
                    <label class="col-xs-4 control-label" for="chkActivo"> ¿Eres Vip?</label>
                    <div class="col-xs-4">
                        <input id="chkActivo" name="chkActivo" type="checkbox" value="1">
                    </div>
                </div>
                
                <div class="form-group mt-3">
                    <label class="col-xs-4 control-label" for="lstUsu">Lista usuario</label>
                    <div class="col-xs-4">
                        <select name="lstUsu" id="lstUsu" class="form-select" aria-label="Default select example">
                            <?php echo $options; ?>
                        </select>
                    </div>
                </div>

                <div class="form-group">
                    <div class="col-xs-4 col-xs-offset-4">
                        <input type="submit" id="btnAceptarAltaCliente" name="btnAceptarAltaCliente" class="btn btn-primary" value="Guardar Cliente" />
                    </div>
                </div>
            </fieldset>
        </form>
    </div>
</div>
</body>
</html>

<?php 
// 2.3. Cerrar conexión al final del script GET
mysqli_close($conexion); 
?>