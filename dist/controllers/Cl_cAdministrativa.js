export class Cl_cAdministrativa {
    vista;
    URL_API = "https://6a18afaf1878294b597d7464.mockapi.io/aspirantes";
    constructor(vista) {
        this.vista = vista;
        this.conectarEventos();
    }
    conectarEventos() {
        const formulario = document.getElementById("formRegistroAspirante");
        if (formulario) {
            formulario.addEventListener("submit", (e) => this.registrar(e));
        }
        const btnBuscar = document.getElementById("btnBuscarCedula");
        const inputBuscar = document.getElementById("txtBusquedaCedula");
        if (btnBuscar) {
            btnBuscar.addEventListener("click", () => this.buscarCedula());
        }
        if (inputBuscar) {
            inputBuscar.addEventListener("keydown", (evt) => {
                if (evt.key === "Enter") {
                    evt.preventDefault();
                    this.buscarCedula();
                }
            });
        }
    }
    async buscarCedula() {
        const inputBuscar = document.getElementById("txtBusquedaCedula");
        if (!inputBuscar)
            return;
        const cedula = inputBuscar.value.trim();
        if (!cedula)
            return;
        try {
            const response = await fetch(`${this.URL_API}?cedula=${encodeURIComponent(cedula)}`);
            if (!response.ok) {
                alert("No se pudo buscar el aspirante.");
                return;
            }
            const datos = await response.json();
            let aspiranteEncontrado = null;
            if (Array.isArray(datos) && datos.length > 0) {
                aspiranteEncontrado = datos.find((item) => String(item.cedula).trim() === cedula) || null;
            }
            else if (datos && typeof datos === "object" && "cedula" in datos && String(datos.cedula).trim() === cedula) {
                aspiranteEncontrado = datos;
            }
            if (aspiranteEncontrado) {
                this.vista.cargarFormulario(aspiranteEncontrado);
            }
            else {
                this.vista.limpiarFormulario();
                this.vista.mostrarFormulario();
                alert("Cédula no registrada. Complete el formulario para agregar al aspirante.");
            }
        }
        catch (err) {
            console.error("Error buscando aspirante:", err);
            alert("No se pudo conectar con el servidor para buscar la cédula.");
        }
    }
    // Se añade explícitamente el tipo ': Promise<void>' exigido por TypeScript en métodos asíncronos
    async registrar(e) {
        e.preventDefault();
        // Capturamos el objeto adaptado con las llaves oficiales de MockAPI
        const payload = this.vista.obtenerDatosFormulario();
        try {
            const response = await fetch(this.URL_API, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });
            if (response.ok) {
                // CORRECCIÓN: Se cambia 'agregarFilaTemporal' por 'agregarAlHistorialLocal'
                // CORRECCIÓN: Se cambia 'payload.nombre' por 'payload.nombreCompleto'
                this.vista.agregarAlHistorialLocal(payload.cedula, payload.nombreCompleto, true);
                this.vista.limpiarFormulario();
            }
            else {
                // Manejo alternativo en caso de que el servidor responda pero con error (ej. código 400 o 500)
                this.vista.agregarAlHistorialLocal(payload.cedula, payload.nombreCompleto, false);
                alert("El servidor rechazó el registro del aspirante.");
            }
        }
        catch (err) {
            console.error("Error al guardar el desglose:", err);
            this.vista.agregarAlHistorialLocal(payload.cedula, payload.nombreCompleto, false);
            alert("No se pudo establecer conexión con el servidor.");
        }
    }
}
//# sourceMappingURL=Cl_cAdministrativa.js.map