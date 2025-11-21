"use strict";

let oViaje = new Viaje();

registrarEventos();


function registrarEventos() {
    // Opciones de menú
    document.querySelector("#mnuAltaCliente").addEventListener("click", mostrarFormulario);
    document.querySelector("#mnuBuscarCliente").addEventListener("click", mostrarFormulario);
    document.querySelector("#mnuModiCliente").addEventListener("click", mostrarFormulario);
    document.querySelector("#mnuBorraCliente").addEventListener("click", mostrarFormulario);
    document.querySelector("#mnuListadoClientes").addEventListener("click", mostrarFormulario);
    document.querySelector("#mnuCriterioDeBusqueda").addEventListener("click", mostrarFormulario);
    document.querySelector("#mnuAltaPaquete").addEventListener("click", mostrarFormulario);
    document.querySelector("#mnuBuscarPaquete").addEventListener("click", mostrarFormulario);
    document.querySelector("#mnuModificarPaquete").addEventListener("click", mostrarFormulario);
    document.querySelector("#mnuBorrarPaquete").addEventListener("click", mostrarFormulario);
    document.querySelector("#mnuListadoPaquetes").addEventListener("click", mostrarFormulario);
    document.querySelector("#mnuCriterioPaquete").addEventListener("click", mostrarFormulario);
    document.querySelector("#mnuAltaViaje").addEventListener("click", mostrarFormulario);
    document.querySelector("#mnuBuscarVuelo").addEventListener("click",mostrarFormulario);
    document.querySelector("#mnuModificarVuelo").addEventListener("click",mostrarFormulario);
    document.querySelector("#mnuBorrarVuelo").addEventListener("click", mostrarFormulario);
    document.querySelector("#mnuListarVuelos").addEventListener("click",mostrarFormulario);
    document.querySelector("#mnuVuelosCriterio").addEventListener("click",mostrarFormulario);



    // Botones
    frAltaCliente.btnAceptarAltaCliente.addEventListener("click", procesarAltaCliente);
    frBuscarClie.btnBuscarCliente.addEventListener("click", procesarBusquedaCliente);
    frModifiClien.btnModificarCliente.addEventListener("click", procesarModiCliente);
    frBorrarClien.btnBorradoCliente.addEventListener("click", procesarBorraCliente);
    frListarTodosClie.btnBuscarTodosClientes.addEventListener("click", procesarBusTodoCliente);
    frListaCliterio.btnBuscarCliterClientes.addEventListener("click", procesarBusCliCliente);
    frmAltaPaquete.btnAceptarAltaPaquete.addEventListener("click", procesarAltaPaquete);
    frmBuscarPaquete.btnAceptarBuscarPaquete.addEventListener("click", procesarBuscarPaquete);
    frmModificarPaquete.btnModificarPaquete.addEventListener("click", procesarModificarPaquete);
    frmBorrarPaquete.btnBorrarPaquete.addEventListener("click", procesarBorrarPaquete);
    frmListarPaquetes.btnListarPaquetes.addEventListener("click", procesarListarPaquetes);
    frmListadoPaquetesCriterio.btnBuscarPaquetesCriterio.addEventListener("click", listarPorCiudad);
}

function mostrarFormulario(oEvento) {

    let opcionMenu = oEvento.target.id;

    ocultarFormulario();

    switch (opcionMenu) {
        case "mnuAltaCliente":
            frAltaCliente.classList.remove("d-none");
            recuperarClientes();
            break;
        case "mnuBuscarCliente":
            frBuscarClie.classList.remove("d-none");
            break;
        case "mnuModiCliente":
            frModifiClien.classList.remove("d-none");
            break;
        case "mnuBorraCliente":
            frBorrarClien.classList.remove("d-none");
            break;
        case "mnuListadoClientes":
            frListarTodosClie.classList.remove("d-none");
            break;
        case "mnuCriterioDeBusqueda":
            frListaCliterio.classList.remove("d-none");
            break;
        case "mnuAltaPaquete":
            frmAltaPaquete.classList.remove("d-none");
            recuperarClientes();
            recuperarViajes();
            break;
        case "mnuBuscarPaquete":
            frmBuscarPaquete.classList.remove("d-none");
            break;
        case "mnuModificarPaquete":
            frmModificarPaquete.classList.remove("d-none");
            recuperarClientes();
            recuperarViajes();
            break;
        case "mnuBorrarPaquete":
            frmBorrarPaquete.classList.remove("d-none");
            break;
        case "mnuListadoPaquetes":
            frmListarPaquetes.classList.remove("d-none");
            break;
        case "mnuCriterioPaquete":
            frmListadoPaquetesCriterio.classList.remove("d-none");
            recuperarCiudades();
            break;
        case "mnuAltaViaje":
            formAltaViaje.classList.remove("d-none");
            break;
        case "mnuBuscarVuelo":
            formBuscarViaje.classList.remove("d-none");
            break;
        case "mnuModificarVuelo":
            formModificarViaje.classList.remove("d-none");
            break;
        case "mnuBorrarVuelo":
            formBorrarVuelos.classList.remove("d-none");
            break;
    }
}

function recuperarCiudades() {
    fetch('backend/recuperar_ciudad.php')
        .then(response => response.json())
        .then(data => {
            document.getElementById('lsOrigen').innerHTML = data.options;
            document.getElementById('lsDestino').innerHTML = data.options;
        })
        .catch(error => console.error('Error al recuperar las ciudades:', error));
}

function recuperarViajes() {
    fetch('backend/recuperar_viaje.php')
        .then(response => response.json()) 
        .then(data => {
            document.getElementById('lstViajeModificar').innerHTML = data.options;
            document.getElementById('lstViaje').innerHTML = data.options;
        })
        .catch(error => console.error('Error al recuperar los viajes:', error));

}


function recuperarClientes() {
    fetch('backend/recuperar_cliente.php')
        .then(response => response.json())
        .then(data => {
            document.getElementById('lstUsuModificar').innerHTML = data.options;
            document.getElementById('lstUsu').innerHTML = data.options;
            document.getElementById('lstClientes').innerHTML = data.options;
        })
        .catch(error => console.error('Error al recuperar los clientes:', error));
}
function ocultarFormulario() {

    frAltaCliente.classList.add("d-none");
    frBuscarClie.classList.add("d-none");
    frModifiClien.classList.add("d-none");
    frBorrarClien.classList.add("d-none");
    frListarTodosClie.classList.add("d-none");
    frListaCliterio.classList.add("d-none");
    frmAltaPaquete.classList.add("d-none");
    frmBuscarPaquete.classList.add("d-none");
    frmModificarPaquete.classList.add("d-none");
    frmBorrarPaquete.classList.add("d-none");
    frmListarPaquetes.classList.add("d-none");
    frmListadoPaquetesCriterio.classList.add("d-none");
    formAltaViaje.classList.add("d-none");
    formBuscarViaje.classList.add("d-none");
    formModificarViaje.classList.add("d-none");
    formBorrarVuelos.classList.add("d-none");    


    document.querySelector("#resultadoBusqueda").innerHTML = "";
    document.querySelector("#listados").innerHTML = "";
}


async function procesarAltaCliente(oEvento) { // Aceptamos el objeto evento


    oEvento.preventDefault();

    //Todo esto es para recoger los valores del formularios de alta de cliente
    let nombre = frAltaCliente.txtAltaNombre.value.trim();
    let telefono = frAltaCliente.txtTelefono.value.trim();
    let email = frAltaCliente.txtEmail.value.trim();
    // CORRECCIÓN: Usamos chkActivo para el checkbox
    let aceptacion = frAltaCliente.chkActivo.checked;

    if (validarAltaCliente()) {

        let respuesta = await oViaje.altaCliente(
            new Cliente(null, nombre, telefono, email, aceptacion));

        alert(respuesta.mensaje);

        if (respuesta.ok) {
            // Si NO hay error
            //Resetear formulario
            frAltaCliente.reset();
            // Ocultar el formulario
            frAltaCliente.classList.add("d-none");
        }
    }

}

function validarAltaCliente() {

    //Todo este codigo es usado para comprobar que los datos 
    //Que el usuario añade son corretos

    let nombre = frAltaCliente.txtAltaNombre.value.trim();
    let telefono = frAltaCliente.txtTelefono.value.trim();
    let email = frAltaCliente.txtEmail.value.trim();
    let aceptacion = frAltaCliente.chkActivo.checked;

    let valido = true;
    let errores = "";

    //valida Nombre
    if (nombre.length == 0) {
        valido = false; // CORRECCIÓN: Cambiado de '==' a '='
        errores += "No puede estar el nombre vacio\n"; // Añadimos salto de línea para mejor legibilidad
    }
    // Validar email vacío y formato
    let patronEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.length == 0) {
        valido = false;
        errores += "El email no puede estar vacío\n";
    } else if (!patronEmail.test(email)) {
        valido = false;
        errores += "El email no tiene un formato válido\n";
    }
    //Valida telefono
    if (telefono.length == 0) {
        valido = false;
        errores += "El teléfono no puede estar vacío\n";
    } else if (!/^\d+$/.test(telefono)) {
        valido = false;
        errores += "El teléfono solo debe contener números\n";
    } else if (telefono.length > 9) {
        valido = false;
        errores += "El teléfono no puede superar los 9 dígitos\n";
    }
    if (!aceptacion) {
        valido = false;
        errores += "Debe aceptar las condiciones\n";
    }
    if (!valido) {
        alert(errores);
    }

    return valido;


}
async function procesarBusquedaCliente() {
    if (validarBuscarCliente()) {

        let nombre = frBuscarClie.txtNombre.value.trim();

        let respuesta = await oViaje.buscarCliente(nombre);

        if (!respuesta.error) {

            let resultadoBusqueda = document.querySelector("#resultadoBusqueda");

            let tablaSalida = "<table class='table'>";
            tablaSalida += "<thead><tr>";
            tablaSalida += "<th>ID</th><th>Nombre</th><th>Telefono</th><th>Email</th><th>Activo</th>";
            tablaSalida += "</tr></thead><tbody>";

            tablaSalida += "<tr>";
            tablaSalida += "<td>" + respuesta.datos.idcliente + "</td>";
            tablaSalida += "<td>" + respuesta.datos.nombre + "</td>";
            tablaSalida += "<td>" + respuesta.datos.telefono + "</td>";
            tablaSalida += "<td>" + respuesta.datos.email + "</td>";
            tablaSalida += "<td>" + (respuesta.datos.activo == 1 ? "Sí" : "No") + "</td>";
            tablaSalida += "</tr></tbody></table>";

            resultadoBusqueda.innerHTML = tablaSalida;
        } else {
            // Si hay error
            alert(respuesta.mensaje);
        }


    }
}
function validarBuscarCliente() {
    let nombre = frBuscarClie.txtNombre.value.trim();
    let valido = true;
    let errores = "";

    if (nombre.length == 0) {
        valido = false;
        errores += "El nombre de cliente debe estar relleno";
    }
    if (!valido) {
        alert(errores);
    }

    return valido;
}
async function procesarModiCliente() {

    let nombreAntiguo = frModifiClien.txtNombreAntiguo.value.trim();
    let nombre = frModifiClien.txtNuevoNombre.value.trim();
    let telefono = frModifiClien.txtTelefono.value.trim();
    let email = frModifiClien.txtEmail.value.trim();
    let aceptacion = frModifiClien.chkActivo.checked;

    if (validarModCliente()) {
        let respuesta = await oViaje.modificarCliente(new Cliente(nombreAntiguo, nombre, telefono, email, aceptacion));


        alert(respuesta.mensaje);

        if (!respuesta.error) {

            frModifiClien.reset();

            frModifiClien.classList.add("d-none");
        }

    }



}

function validarModCliente() {

    let nombreAntiguo = frModifiClien.txtNombreAntiguo.value.trim();
    let nombre = frModifiClien.txtNuevoNombre.value.trim();
    let telefono = frModifiClien.txtTelefono.value.trim();
    let email = frModifiClien.txtEmail.value.trim();
    let aceptacion = frModifiClien.chkActivo.checked;

    let valido = true;
    let error = "";

    if (nombreAntiguo.length == 0) {
        valido = false;
        error = + "El nombreAntiguo no puede estar vacio";
    }
    if (nombre.length == 0) {
        valido = false;
        error = + "El nombre no puede estar vacio";
    }
    if (isNaN(telefono)) {

        valido = false;
        error = + "El telefono tiene que ser numerico"
    }

    let patronEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.length == 0) {
        valido = false;
        error += "El email no puede estar vacío\n";
    } else if (!patronEmail.test(email)) {
        valido = false;
        error += "El email no tiene un formato válido\n";
    }
    if (!aceptacion) {
        valido = false;
        error += "Debe aceptar las condiciones\n";
    }
    if (!valido) {
        alert(error);
    }

    return valido;


}
async function procesarBorraCliente(oEvento) {
    oEvento.preventDefault();

    let nombre = frBorrarClien.txtNombre.value.trim();

    if (nombre.length === 0) {
        alert("Debes introducir el nombre del cliente a borrar.");
        return;
    }


    let respuesta = await oViaje.borrarCliente(nombre);


    alert(respuesta.mensaje);

    if (!respuesta.error) {
        frBorrarClien.reset();
        frBorrarClien.classList.add("d-none");
        document.querySelector("#resultadoBusqueda").innerHTML = "";
    }
}

async function procesarBusTodoCliente() {
    let respuesta = await peticionGET("lista_de_todos_clientes.php", new FormData());

    if (respuesta.ok && Array.isArray(respuesta.datos)) {
        let listados = document.querySelector("#listados");
        let tabla = "<table class='table'><thead><tr><th>ID</th><th>Nombre</th><th>Teléfono</th><th>Email</th><th>Activo</th></tr></thead><tbody>";

        for (let cliente of respuesta.datos) {
            tabla += `<tr>
                        <td>${cliente.idcliente}</td>
                        <td>${cliente.nombre}</td>
                        <td>${cliente.telefono}</td>
                        <td>${cliente.email}</td>
                        <td>${cliente.activo ? "Sí" : "No"}</td>
                        </tr>`;
        }

        tabla += "</tbody></table>";
        listados.innerHTML = tabla;
    } else {
        alert("Error al cargar los clientes: " + respuesta.mensaje);
    }
}


async function procesarBusCliCliente() {
    // Tomamos los valores de los inputs
    let nombre = frListaCliterio.txtNombre.value.trim();
    let telefono = frListaCliterio.txtTelefono.value.trim();
    let email = frListaCliterio.txtEmail.value.trim();
    let activo = frListaCliterio.chkActivo.checked ? 1 : "";

    // Creamos un FormData para enviar al backend
    let datos = new FormData();
    datos.append("txtNombre", nombre);
    datos.append("txtTelefono", telefono);
    datos.append("txtEmail", email);
    datos.append("chkActivo", activo);

    // Llamamos al método de Viaje que haga la búsqueda
    let respuesta = await oViaje.buscarClientePorCriterio(datos);

    if (respuesta.ok && Array.isArray(respuesta.datos)) {
        let listados = document.querySelector("#listados");
        let tabla = "<table class='table table-striped'>";
        tabla += "<thead><tr><th>ID</th><th>Nombre</th><th>Teléfono</th><th>Email</th><th>Activo</th></tr></thead><tbody>";

        for (let cliente of respuesta.datos) {
            tabla += `<tr>
                        <td>${cliente.idcliente}</td>
                        <td>${cliente.nombre}</td>
                        <td>${cliente.telefono}</td>
                        <td>${cliente.email}</td>
                        <td>${cliente.activo ? "Sí" : "No"}</td>
                        </tr>`;
        }

        tabla += "</tbody></table>";
        listados.innerHTML = tabla;
    } else {
        alert(respuesta.mensaje || "No se encontraron clientes");
    }
}

async function procesarAltaPaquete(oEvento) {
    oEvento.preventDefault();

    let nombrePaquete = frmAltaPaquete.txtNombrePaquete.value.trim();
    let descripcion = frmAltaPaquete.txtDescripcion.value.trim();
    let precioPaquete = parseFloat(frmAltaPaquete.txtPrecio.value.trim());
    let incluyeHotel = frmAltaPaquete.chkHotel.checked;
    let idViaje = parseInt(frmAltaPaquete.lstViaje.value.trim());
    let contratacion = Date.now();
    let idCliente = parseInt(frmAltaPaquete.lstUsu.value.trim());

    if (validarAltaPaquete()) {
        let respuesta = await oViaje.altaPaquete(
            new Package(nombrePaquete, descripcion, precioPaquete, incluyeHotel, idViaje, contratacion, idCliente)
        );
        alert(respuesta.mensaje);

        if (respuesta.ok) {
            frmAltaPaquete.reset();
            frmAltaPaquete.classList.add("d-none");
        }
    }
}

function validarAltaPaquete() {
    let nombrePaquete = frmAltaPaquete.txtNombrePaquete.value.trim();
    let descripcion = frmAltaPaquete.txtDescripcion.value.trim();
    let precioPaquete = frmAltaPaquete.txtPrecio.value.trim();
    let idViaje = frmAltaPaquete.lstViaje.value.trim();
    let idCliente = frmAltaPaquete.lstUsu.value.trim();

    let valido = true;
    let errores = "";

    if (nombrePaquete.length == 0) {
        valido = false;
        errores += "El nombre del paquete no puede estar vacío.\n";
    }
    if (descripcion.length == 0) {
        valido = false;
        errores += "La descripción no puede estar vacía.\n";
    }
    if (isNaN(precioPaquete) || precioPaquete <= 0) {
        valido = false;
        errores += "El precio del paquete debe ser un número positivo.\n";
    }
    if (isNaN(idViaje) || idViaje <= 0) {
        valido = false;
        errores += "El viaje no fue especificado";
    }
    if (isNaN(idCliente) || idCliente <= 0) {
        valido = false;
        errores += "El cliente no fue especificado";
    }
    if (!valido) {
        alert(errores);
    }
    return valido;
}

async function procesarListarPaquetes() {
    let respuesta = await peticionGET("listado_paquetes.php", new FormData());

    if (respuesta.ok && Array.isArray(respuesta.datos)) {
        let listados = document.querySelector("#listados");
        let tabla = "<table class='table'><thead><tr><th>ID</th><th>Nombre</th><th>Descripción</th><th>Precio</th><th>Hotel Incluido</th>"+
            "<th>Viaje</th><th>Fecha Contratación</th><th>Cliente</th></tr></thead><tbody>";

        for (let paquete of respuesta.datos) {
            tabla += `<tr>
                        <td>${paquete.idpaquete}</td>
                        <td>${paquete.nombrepaquete}</td>
                        <td>${paquete.descripcion}</td>
                        <td>${paquete.preciopaquete}</td>
                        <td>${paquete.incluyehotel ? "Sí" : "No"}</td>
                        <td>${paquete.idviaje}</td>
                        <td>${new Date(paquete.contratacion).toLocaleDateString()}</td>
                        <td>${paquete.idcliente}</td>
                        </tr>`;
        }

        tabla += "</tbody></table>";
        listados.innerHTML = tabla;
    } else {
        alert("Error al cargar los paquetes: " + respuesta.mensaje);
    }
}

async function listarPorCiudad() {

    let nombre = frmListadoPaquetesCriterio.txtNombrePaqueteBuscado.value.trim();
    let origen = frmListadoPaquetesCriterio.lsOrigen.value.trim();
    let destino = frmListadoPaquetesCriterio.lsDestino.value.trim();
    let incluyehotel = frmListadoPaquetesCriterio.chkHotel.checked ? 1 : "";

    // Creamos un FormData para enviar al backend
    let datos = new FormData();
    datos.append("txtNombrePaqueteBuscado", nombre);
    datos.append("lsOrigen", origen);
    datos.append("lsDestino", destino);
    datos.append("chkHotel", incluyehotel);

    // Llamamos al método de Viaje que haga la búsqueda
    let respuesta = await oViaje.buscarPaquetePorCriterio(datos);

    if (respuesta.ok && Array.isArray(respuesta.datos)) {
        let listados = document.querySelector("#listados");
        let tabla = "<table class='table'><thead><tr><th>ID</th><th>Nombre</th><th>Descripción</th><th>Precio</th><th>Hotel Incluido</th>"+
            "<th>Viaje</th><th>Fecha Contratación</th><th>Cliente</th></tr></thead><tbody>";

        for (let paquete of respuesta.datos) {
            tabla += `<tr>
                        <td>${paquete.idpaquete}</td>
                        <td>${paquete.nombrepaquete}</td>
                        <td>${paquete.descripcion}</td>
                        <td>${paquete.preciopaquete}</td>
                        <td>${paquete.incluyehotel ? "Sí" : "No"}</td>
                        <td>${paquete.idviaje}</td>
                        <td>${new Date(paquete.contratacion).toLocaleDateString()}</td>
                        <td>${paquete.idcliente}</td>
                        </tr>`;
        }

        tabla += "</tbody></table>";
        listados.innerHTML = tabla;
    } else {
        alert(respuesta.mensaje || "No se encontraron paquetes");
    }
}

async function procesarBuscarPaquete() {
    if (validarBuscarPaquete()) {

        let nombre = frmBuscarPaquete.txtPaqueteBuscado.value.trim();

        let respuesta = await oViaje.buscarPaquete(nombre);

        if (!respuesta.error) {

            let listados = document.querySelector("#resultadoBusqueda");
            let tabla = "<table class='table'><thead><tr><th>ID</th><th>Nombre</th><th>Descripción</th><th>Precio</th><th>Hotel Incluido</th>"+
            "<th>Viaje</th><th>Fecha Contratación</th><th>Cliente</th></tr></thead><tbody>";

            if(Array.isArray(respuesta.datos)){
                 for (let paquete of respuesta.datos) {
                    tabla += `<tr>
                        <td>${paquete.idpaquete}</td>
                        <td>${paquete.nombrepaquete}</td>
                        <td>${paquete.descripcion}</td>
                        <td>${paquete.preciopaquete}</td>
                        <td>${paquete.incluyehotel ? "Sí" : "No"}</td>
                        <td>${paquete.idviaje}</td>
                        <td>${new Date(paquete.contratacion).toLocaleDateString()}</td>
                        <td>${paquete.idcliente}</td>
                        </tr>`;

                    
            }
            }else{
                let paquete = respuesta.datos;
                tabla += `<tr>
                        <td>${paquete.idpaquete}</td>
                        <td>${paquete.nombrepaquete}</td>
                        <td>${paquete.descripcion}</td>
                        <td>${paquete.preciopaquete}</td>
                        <td>${paquete.incluyehotel ? "Sí" : "No"}</td>
                        <td>${paquete.idviaje}</td>
                        <td>${new Date(paquete.contratacion).toLocaleDateString()}</td>
                        <td>${paquete.idcliente}</td>
                        </tr>`;
            }
            tabla += "</tbody></table>";
                    listados.innerHTML = tabla;
           
        } else {
            // Si hay error
            alert(respuesta.mensaje);
        }


    }
}
function validarBuscarPaquete() {
    let nombre = frmBuscarPaquete.txtPaqueteBuscado.value.trim();
    let valido = true;
    let errores = "";

    if (nombre.length == 0) {
        valido = false;
        errores += "El nombre del paquete debe estar relleno";
    }
    if (!valido) {
        alert(errores);
    }

    return valido;
}

async function procesarBorrarPaquete() {

    let nombre = document.getElementById('txtPaqueteEliminar').value.trim();

    if (nombre.length === 0) {
        alert("Debes introducir el nombre del paquete a borrar.");
        return;
    }


    let respuesta = await oViaje.borrarPaquete(nombre);


    alert(respuesta.mensaje);

    if (!respuesta.error) {
        frmBorrarPaquete.reset();
        frmBorrarPaquete.classList.add("d-none");
        document.querySelector("#resultadoBusqueda").innerHTML = "";
    }
}

async function procesarModificarPaquete() {

    let nombreAntiguo = frmModificarPaquete.txtNombreAntiguoPaquete.value.trim();
    let nombre = frmModificarPaquete.txtNuevoNombrePaquete.value.trim();
    let descripcion = frmModificarPaquete.txtDescripcionModificada.value.trim();
    let precio = parseFloat(frmModificarPaquete.txtPrecioModificado.value.trim());
    let incluyeHotel = frmModificarPaquete.chkHotelIncluido.checked;
    let idViaje = parseInt(frmModificarPaquete.lstViajeModificar.value);
    let idCliente = parseInt(frmModificarPaquete.lstUsuModificar.value);

    if (validarModPaquete()) {
        let respuesta = await oViaje.modificarPaquete(new Package(nombreAntiguo, nombre, descripcion, precio, incluyeHotel, idViaje, Date.now(), idCliente));


        alert(respuesta.mensaje);

        if (!respuesta.error) {

            frmModificarPaquete.reset();

            frmModificarPaquete.classList.add("d-none");
        }

    }



}

function validarModPaquete() {

    let nombreAntiguo = frmModificarPaquete.txtNombreAntiguoPaquete.value.trim();
    let nombre = frmModificarPaquete.txtNuevoNombrePaquete.value.trim();
    let descripcion = frmModificarPaquete.txtDescripcionModificada.value.trim();
    let precio = frmModificarPaquete.txtPrecioModificado.value.trim();
    let idViaje = frmModificarPaquete.lstViajeModificar.value;
    let idCliente = frmModificarPaquete.lstUsuModificar.value;
    let valido = true;
    let error = "";

    if (nombreAntiguo.length == 0) {
        valido = false;
        error = + "El nombreAntiguo no puede estar vacio";
    }
    if (nombre.length == 0) {
        valido = false;
        error = + "El nombre no puede estar vacio";
    }
    if (descripcion.length == 0) {
        valido = false;
        error = + "La descripcion no puede estar vacia";
    }
    if (isNaN(precio) || precio <= 0) {

        valido = false;
        error = + "El precio tiene que ser un numero positivo"
    }
    if (isNaN(idViaje) || idViaje <= 0) {
        valido = false;
        error = + "El viaje no fue especificado"
    }
    if (isNaN(idCliente) || idCliente <= 0) {
        valido = false;
        error = + "El cliente no fue especificado"
    }
    if (!valido) {
        alert(error);
    }

    return valido;
}

//La parte de viajes, entregada a última hora y sin haber comprobado que funciona
// Llenar select de ciudades

function llenarSelectCiudades(selectId) {
    const select = document.getElementById(selectId);
    if (!select) return;
    select.innerHTML = "<option value=''>Seleccione ciudad</option>"; 
    ciudades.forEach(ciudad => {
        const option = document.createElement("option");
        option.value = ciudad.id;
        option.textContent = ciudad.nombre;
        select.appendChild(option);
    });
}


// Validaciones y auxiliares

function validarFechas(fechaSalidaId, fechaRegresoId) {
    const salida = new Date(document.getElementById(fechaSalidaId).value);
    const regreso = new Date(document.getElementById(fechaRegresoId).value);
    if (regreso < salida) {
        alert("La fecha de regreso debe ser posterior a la fecha de salida.");
        return false;
    }
    return true;
}

function limpiarFormulario(formId) {
    const form = document.getElementById(formId);
    if (form) form.reset();
}


// Funciones de Viajes

function agregarViaje(formId) {
    const form = document.getElementById(formId);
    const id = viajes.length + 1;
    const origen = parseInt(form.idorigen.value);
    const destino = parseInt(form.iddestino.value);
    const fechaSalida = form.fechasalida.value;
    const fechaRegreso = form.fecharegreso.value;
    const duracion = parseInt(form.duracion.value);
    const precioBase = parseFloat(form.preciobase.value);
    const cocheHotel = form.cocheHotel.checked;

    if (!validarFechas("fechasalida", "fecharegreso")) return;

    const viaje = new Viaje(id, origen, destino, fechaSalida, fechaRegreso, duracion, precioBase, cocheHotel);
    viajes.push(viaje);
    alert(`Viaje agregado correctamente a ${ciudades.find(c => c.id === destino).nombre}.`);
    limpiarFormulario(formId);
    listarViajes("tablaViajes");
}

function borrarViaje(idViaje) {
    const index = viajes.findIndex(v => v.id === idViaje);
    if (index === -1) {
        alert("No se encontró el viaje con ese ID.");
        return;
    }
    viajes.splice(index, 1);
    alert("Viaje borrado correctamente.");
    listarViajes("tablaViajes");
}

function buscarViajes(criterio) {
    criterio = criterio.toLowerCase();
    return viajes.filter(v => {
        const origen = ciudades.find(c => c.id === v.origen).nombre.toLowerCase();
        const destino = ciudades.find(c => c.id === v.destino).nombre.toLowerCase();
        return origen.includes(criterio) || destino.includes(criterio);
    });
}

function modificarViaje(formId) {
    const form = document.getElementById(formId);
    const idViaje = parseInt(form.idviaje.value);
    const viaje = viajes.find(v => v.id === idViaje);
    if (!viaje) {
        alert("No se encontró el viaje con ese ID.");
        return;
    }

    viaje.origen = parseInt(form.idorigen.value);
    viaje.destino = parseInt(form.iddestino.value);
    viaje.fechaSalida = form.fechasalida.value;
    viaje.fechaRegreso = form.fecharegreso.value;
    viaje.duracion = parseInt(form.duracion.value);
    viaje.precioBase = parseFloat(form.preciobase.value);
    viaje.cocheHotel = form.cocheHotel.checked;

    if (!validarFechas("fechasalida", "fecharegreso")) return;

    alert("Viaje modificado correctamente.");
    limpiarFormulario(formId);
    listarViajes("tablaViajes");
}


// Listar viajes

function listarViajes(idTabla) {
    const tbody = document.getElementById(idTabla);
    if (!tbody) return;

    tbody.innerHTML = "";
    if (viajes.length === 0) {
        tbody.innerHTML = "<tr><td colspan='8' class='text-center'>No hay viajes registrados.</td></tr>";
        return;
    }

    viajes.forEach(v => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${v.id}</td>
            <td>${ciudades.find(c => c.id === v.origen).nombre}</td>
            <td>${ciudades.find(c => c.id === v.destino).nombre}</td>
            <td>${v.fechaSalida}</td>
            <td>${v.fechaRegreso}</td>
            <td>${v.duracion}</td>
            <td>${v.precioBase.toFixed(2)}</td>
            <td>${v.cocheHotel ? "Sí" : "No"}</td>
        `;
        tbody.appendChild(tr);
    });
}
