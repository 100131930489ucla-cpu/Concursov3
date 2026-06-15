export class Cl_vAdministrativa {
    formulario;
    tablaCarga;
    constructor() {
        this.formulario = document.getElementById("formRegistroAspirante");
        this.tablaCarga = document.getElementById("tablaCargaLocal");
    }
    /**
     * Extrae los valores del formulario y los mapea EXACTAMENTE
     * a las llaves numéricas y de texto definidas en tu esquema de MockAPI
     */
    obtenerDatosFormulario() {
        const cedulaInput = document.getElementById("txtCedula").value;
        const nombreInput = document.getElementById("txtNombre").value;
        const cumpleRequisitos = document.getElementById("chkRequisitos").checked;
        const asistencia = document.getElementById("chkAsistencia").checked;
        // --- PROCESAMIENTO CO-5: SUMATORIA DE SUB-CRITERIOS A VALOR ÚNICO ---
        // Los totales se calculan usando valores validados y acotados más abajo.
        // --- PROCESAMIENTO CO-8 & CO-10 (CONOCIMIENTO Y APTITUDES) ---
        const clampInputValue = (id, max, min = 0) => {
            const input = document.getElementById(id);
            if (!input)
                return min;
            let value = Number(input.value);
            if (Number.isNaN(value))
                value = min;
            if (value > max)
                value = max;
            if (value < min)
                value = min;
            input.value = String(value);
            return value;
        };
        const examenEscrito = clampInputValue("numExamenEscrito", 20, 0);
        const examenOral = clampInputValue("numExamenOral", 20, 0);
        const postgrado = clampInputValue("numPostEspecialidad", 25) +
            clampInputValue("numPostOtros", 20) +
            clampInputValue("numCursosAmp", 6) +
            clampInputValue("numReconTesis", 5);
        const pregrado = clampInputValue("numTituloProm", 25) +
            clampInputValue("numPrepAsis", 10) +
            clampInputValue("numActOtras", 3) +
            clampInputValue("numDiplSob", 5) +
            clampInputValue("numDiplOtros", 3) +
            clampInputValue("numReconInv", 3) +
            clampInputValue("numReconExt", 3);
        const produccion = clampInputValue("numLibrosEd", 15) +
            clampInputValue("numLibrosSinEd", 12) +
            clampInputValue("numArtInd", 10) +
            clampInputValue("numArtNoInd", 6) +
            clampInputValue("numArtNoArb", 4) +
            clampInputValue("numArtOtros", 3) +
            clampInputValue("numMemCong", 10) +
            clampInputValue("numPonencias", 6) +
            clampInputValue("numPatentes", 15);
        const experiencia = clampInputValue("numDocInvest", 12) +
            clampInputValue("numPremDoc", 8) +
            clampInputValue("numExpObj", 6) +
            clampInputValue("numExpOtras", 3) +
            clampInputValue("numPremProf", 4) +
            clampInputValue("numDirInst", 6) +
            clampInputValue("numPasObj", 4) +
            clampInputValue("numPasOtras", 2);
        // Evaluamos la sumatoria de las 5 preguntas de Aptitud de un único jurado
        let sumaAptitudes = 0;
        for (let i = 1; i <= 5; i++) {
            sumaAptitudes += clampInputValue(`crit_${i}`, 5, 0);
        }
        // Retornamos el objeto plano idéntico al Schema de tu MockAPI
        return {
            cedula: cedulaInput,
            nombreCompleto: nombreInput, // Iguala a tu columna de MockAPI
            cumpleRequisitos: cumpleRequisitos ? 1 : 0, // MockAPI maneja Number (1 = Sí, 0 = No)
            sePresento: asistencia ? 1 : 0,
            // Mapeo exacto de los campos numéricos de la imagen b3382138-f55a-43ce-9592-cdd0cfd437af
            postgradoRaw: postgrado,
            pregradoRaw: pregrado,
            produccionRaw: produccion,
            experienciaRaw: experiencia,
            // Variables de soporte complementarias para las pruebas
            notaEscrita: examenEscrito,
            notaOral: examenOral,
            aptitudGlobal: sumaAptitudes / 5 // Promedio de las cinco dimensiones de un solo jurado
        };
    }
    agregarAlHistorialLocal(cedula, nombre, exitoso) {
        if (!this.tablaCarga)
            return;
        if (this.tablaCarga.innerHTML.includes("Esperando ingresos...")) {
            this.tablaCarga.innerHTML = "";
        }
        const fila = document.createElement("tr");
        fila.innerHTML = `
      <td><strong>${cedula}</strong></td>
      <td>${nombre}</td>
      <td>
        <span class="badge ${exitoso ? 'bg-success' : 'bg-danger'}">
          ${exitoso ? 'Sincronizado ✅' : 'Error ❌'}
        </span>
      </td>
    `;
        this.tablaCarga.appendChild(fila);
    }
    limpiarFormulario() {
        if (this.formulario)
            this.formulario.reset();
    }
}
//# sourceMappingURL=Cl_vAdministrativa.js.map