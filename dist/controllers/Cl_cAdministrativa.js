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