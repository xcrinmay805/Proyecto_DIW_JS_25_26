"use string";

class Cliente {

    #idcliente;
    #nombre;
    #telefono;
    #email;
    #activo;
    #nombreAntiguo; 

    constructor(nombreAntiguo, nombre, telefono, email, activo) {
    this.#nombreAntiguo = nombreAntiguo; 
    this.#nombre = nombre;
    this.#telefono = telefono;
    this.#email = email;
    this.#activo = activo;
    this.#idcliente = null;
}


    // Getters
    get idcliente() { return this.#idcliente; }
    get nombre() { return this.#nombre; }
    get telefono() { return this.#telefono; }
    get email() { return this.#email; }
    get activo() { return this.#activo; }
    get nombreAntiguo() { return this.#nombreAntiguo; } // ← GETTER


    // Setters
    set idcliente(idcliente) { this.#idcliente = idcliente; }
    set nombre(nombre) { this.#nombre = nombre; }
    set telefono(telefono) { this.#telefono = telefono; }
    set email(email) { this.#email = email; }
    set activo(activo) { this.#activo = activo; }
    set nombreAntiguo(x) { this.#nombreAntiguo = x; } 

    toJSON() {
        return {
            idcliente: this.#idcliente,
            nombre: this.#nombre,
            telefono: this.#telefono,
            email: this.#email,
            activo: this.#activo
        };
    }

}

class Package {
    #idpaquete
    #nombrepaquete
    #descripcion
    #preciopaquete
    #incluyehotel
    #idviaje
    #contratacion
    #idcliente
    #nombreAntiguo;
    constructor(nombreAntiguo,nombrepaquete, descripcion, preciopaquete, incluyehotel, idviaje, contratacion, idcliente) {
        this.#nombreAntiguo=nombreAntiguo;
        this.#nombrepaquete = nombrepaquete;
        this.#descripcion = descripcion;
        this.#preciopaquete = preciopaquete;
        this.#incluyehotel = incluyehotel;
        this.#idviaje = idviaje;
        this.#contratacion = contratacion;
        this.#idcliente = idcliente;
    }
    get idpaquete() {
        return this.#idpaquete;
    }
    get nombrepaquete() {
        return this.#nombrepaquete;
    }
    get descripcion() {
        return this.#descripcion;
    }
    get preciopaquete() {
        return this.#preciopaquete;
    }
    get incluyehotel() {
        return this.#incluyehotel;
    }
    get idviaje() {
        return this.#idviaje;
    }
    get contratacion() {
        return this.#contratacion;
    }
    get idcliente() {
        return this.#idcliente;
    }
    get nombreAntiguo() {
        return this.#nombreAntiguo;
    }
    set idpaquete(value) {
        this.#idpaquete = value;
    }
    set nombrepaquete(value) {
        this.#nombrepaquete = value;
    }
    set descripcion(value) {
        this.#descripcion = value;
    }
    set preciopaquete(value) {
        this.#preciopaquete = value;
    }
    set incluyehotel(value) {
        this.#incluyehotel = value;
    }
    set idviaje(value) {
        this.#idviaje = value;
    }
    set contratacion(value) {
        this.#contratacion = value;
    }
    set idcliente(value) {
        this.#idcliente = value;
    }
    set nombreAntiguo(value) {
        this.#nombreAntiguo = value;
    }

    toJson() {
        let oPackage = {
            idpaquete: this.#idpaquete,
            nombrepaquete: this.#nombrepaquete,
            descripcion: this.#descripcion,
            preciopaquete: this.#preciopaquete,
            incluyehotel: this.#incluyehotel,
            idviaje: this.#idviaje,
            contratacion: this.#contratacion,
            idcliente: this.#idcliente
        };
        return oPackage;
    }
}

class City {
    constructor(id, nombre) {
        this.id = id;
        this.nombre = nombre;
    }
}

class Trip {
    constructor(id, origen, destino, fechaSalida, fechaRegreso, duracion, precioBase, cocheHotel) {
        this.id = id;
        this.origen = origen;       
        this.destino = destino;     
        this.fechaSalida = fechaSalida;
        this.fechaRegreso = fechaRegreso;
        this.duracion = duracion;
        this.precioBase = precioBase;
        this.cocheHotel = cocheHotel; 
    }
}


class Viaje {

    async altaCliente(oCliente) {

        let datos = new FormData();


        datos.append("txtNombre", oCliente.nombre);
        datos.append("txtTelefono", oCliente.telefono);
        datos.append("txtEmail", oCliente.email);


        if (oCliente.activo) {
            datos.append("chkActivo", "1");
        }

        let response = await peticionPOST("alta_cliente.php", datos);

        return response;
    }

    async altaPaquete(oPackage) {

        let datos = new FormData();

        datos.append("txtNombrePaquete", oPackage.nombrepaquete);
        datos.append("txtDescripcion", oPackage.descripcion);
        datos.append("txtPrecio", oPackage.preciopaquete);
        datos.append("chkIncluyeHotel", oPackage.incluyehotel ? "1" : "0");
        datos.append("txtIdViaje", oPackage.idviaje);
        datos.append("txtContratacion", oPackage.contratacion);
        datos.append("txtIdCliente", oPackage.idcliente);

        let response = await peticionPOST("alta_paquete.php", datos);

        return response;
    }

    async buscarCliente(nombre) {

        let datos = new FormData();
        datos.append("txtNombre", nombre);

        let respuesta = await peticionPOST("buscar_cliente.php", datos);

        return respuesta;
    }

    async buscarPaquete(nombre) {

        let datos = new FormData();
        datos.append("txtPaqueteBuscado", nombre);
        let respuesta = await peticionPOST("buscar_paquete.php", datos);

        return respuesta;
    }

    async listadoComponentes() {

        let listado = "";

        let respuesta = await peticionGET("lista_de_todos_clientes.php", new FormData());

        if (respuesta.ok===false) {
            listado = respuesta.mensaje;
        } else {
            listado = "<table class='table table-striped'>";
            listado +=
                "<thead><tr><th>ID</th><th>Nombre</th><th>Telefono</th><th></th>Email</tr>Activo</tr></thead>";
            listado += "<tbody>";

            for (let cliente of respuesta.datos) {
                listado += "<tr><td>" + cliente.idcliente + "</td>";
                listado += "<td>" + cliente.nombre + "</td>";
                listado += "<td>" + cliente.telefono + "</td>";
                listado += "<td>" + cliente.email + "</td>";
                listado += "<td>" + cliente.activo + "</td></tr>";
            }
            listado += "</tbody></table>";
        }

        return listado;
    }
    async modificarCliente(oCliente){
    let datos = new FormData();

    datos.append("txtNombreAntiguo", oCliente.nombreAntiguo);
    datos.append("txtNuevoNombre", oCliente.nombre);
    datos.append("txtTelefono", oCliente.telefono);
    datos.append("txtEmail", oCliente.email);
    datos.append("chkActivo", oCliente.activo ? 1 : 0);

    let respuesta = await peticionPOST("modificar_cliente.php", datos);
    return respuesta;
    }

    async modificarPaquete(oPaquete){
    let datos = new FormData();

    datos.append("txtNombreAntiguoPaquete", oPaquete.nombreAntiguo);
    datos.append("txtNuevoNombrePaquete", oPaquete.nombrepaquete);
    datos.append("txtDescripcionModificada", oPaquete.descripcion);
    datos.append("txtPrecioModificado", oPaquete.preciopaquete);
    datos.append("chkIncluyeHotel", oPaquete.incluyehotel ? 1 : 0);
    datos.append("lstViajeModificar", oPaquete.idviaje);
    datos.append("lstUsuModificar", oPaquete.idcliente);

    let respuesta = await peticionPOST("modificar_cliente.php", datos);
    return respuesta;
    }
    async borrarCliente(nombre) {
        let datos = new FormData();
        datos.append("txtNombre", nombre);

        let respuesta = await peticionPOST("borrar_cliente.php", datos);
        return respuesta;
    }

    async borrarPaquete(nombrepaquete) {
        let datos = new FormData();
        datos.append("txtNombrePaquete", nombrepaquete);
        let respuesta = await peticionPOST("borrar_paquete.php", datos);
        return respuesta;
    }


    async buscarClientePorCriterio(datos) {
        // Envía los datos al backend
        let respuesta = await peticionPOST("lista_segun_criterio.php", datos);
        return respuesta;
    }

    async buscarPaquetePorCriterio(datos) {
        // Envía los datos al backend
        let respuesta = await peticionPOST("listar_paquetes_criterio.php", datos);
        return respuesta;
    }
}