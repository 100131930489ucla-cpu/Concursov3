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
        const postgrado = Number(document.getElementById("numPostEspecialidad").value || 0) +
            Number(document.getElementById("numPostOtros").value || 0) +
            Number(document.getElementById("numCursosAmp").value || 0) +
            Number(document.getElementById("numReconTesis").value || 0);
        const pregrado = Number(document.getElementById("numTituloProm").value || 0) +
            Number(document.getElementById("numPrepAsis").value || 0) +
            Number(document.getElementById("numActOtras").value || 0) +
            Number(document.getElementById("numDiplSob").value || 0) +
            Number(document.getElementById("numDiplOtros").value || 0) +
            Number(document.getElementById("numReconInv").value || 0) +
            Number(document.getElementById("numReconExt").value || 0);
        const produccion = Number(document.getElementById("numLibrosEd").value || 0) +
            Number(document.getElementById("numLibrosSinEd").value || 0) +
            Number(document.getElementById("numArtInd").value || 0) +
            Number(document.getElementById("numArtNoInd").value || 0) +
            Number(document.getElementById("numArtNoArb").value || 0) +
            Number(document.getElementById("numArtOtros").value || 0) +
            Number(document.getElementById("numMemCong").value || 0) +
            Number(document.getElementById("numPonencias").value || 0) +
            Number(document.getElementById("numPatentes").value || 0);
        const experiencia = Number(document.getElementById("numDocInvest").value || 0) +
            Number(document.getElementById("numPremDoc").value || 0) +
            Number(document.getElementById("numExpObj").value || 0) +
            Number(document.getElementById("numExpOtras").value || 0) +
            Number(document.getElementById("numPremProf").value || 0) +
            Number(document.getElementById("numDirInst").value || 0) +
            Number(document.getElementById("numPasObj").value || 0) +
            Number(document.getElementById("numPasOtras").value || 0);
        // --- PROCESAMIENTO CO-8 & CO-10 (CONOCIMIENTO Y APTITUDES) ---
        const examenEscrito = Number(document.getElementById("numExamenEscrito").value || 0);
        const examenOral = Number(document.getElementById("numExamenOral").value || 0);
        // Evaluamos la sumatoria de las 5 preguntas de Aptitud de los Jurados para promediar
        let sumaAptitudes = 0;
        for (let i = 1; i <= 5; i++) {
            sumaAptitudes += Number(document.getElementById(`crit_A_${i}`).value || 4);
            sumaAptitudes += Number(document.getElementById(`crit_B_${i}`).value || 4);
            sumaAptitudes += Number(document.getElementById(`crit_C_${i}`).value || 4);
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
            aptitudGlobal: sumaAptitudes / 3 // Promedio de los tres jurados
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