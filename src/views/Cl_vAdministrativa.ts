export class Cl_vAdministrativa {
  private formulario: HTMLFormElement | null;
  private tablaCarga: HTMLElement | null;

  constructor() {
    this.formulario = document.getElementById("formRegistroAspirante") as HTMLFormElement;
    this.tablaCarga = document.getElementById("tablaCargaLocal");
  }

  /**
   * Extrae los valores del formulario y los mapea EXACTAMENTE
   * a las llaves numéricas y de texto definidas en tu esquema de MockAPI
   */
  public obtenerDatosFormulario() {
    const cedulaInput = (document.getElementById("txtCedula") as HTMLInputElement).value;
    const nombreInput = (document.getElementById("txtNombre") as HTMLInputElement).value;
    const cumpleRequisitos = (document.getElementById("chkRequisitos") as HTMLInputElement).checked;
    const asistencia = (document.getElementById("chkAsistencia") as HTMLInputElement).checked;

    // --- PROCESAMIENTO CO-5: SUMATORIA DE SUB-CRITERIOS A VALOR ÚNICO ---
    const postgrado = 
      Number((document.getElementById("numPostEspecialidad") as HTMLInputElement).value || 0) +
      Number((document.getElementById("numPostOtros") as HTMLInputElement).value || 0) +
      Number((document.getElementById("numCursosAmp") as HTMLInputElement).value || 0) +
      Number((document.getElementById("numReconTesis") as HTMLInputElement).value || 0);

    const pregrado = 
      Number((document.getElementById("numTituloProm") as HTMLInputElement).value || 0) +
      Number((document.getElementById("numPrepAsis") as HTMLInputElement).value || 0) +
      Number((document.getElementById("numActOtras") as HTMLInputElement).value || 0) +
      Number((document.getElementById("numDiplSob") as HTMLInputElement).value || 0) +
      Number((document.getElementById("numDiplOtros") as HTMLInputElement).value || 0) +
      Number((document.getElementById("numReconInv") as HTMLInputElement).value || 0) +
      Number((document.getElementById("numReconExt") as HTMLInputElement).value || 0);

    const produccion = 
      Number((document.getElementById("numLibrosEd") as HTMLInputElement).value || 0) +
      Number((document.getElementById("numLibrosSinEd") as HTMLInputElement).value || 0) +
      Number((document.getElementById("numArtInd") as HTMLInputElement).value || 0) +
      Number((document.getElementById("numArtNoInd") as HTMLInputElement).value || 0) +
      Number((document.getElementById("numArtNoArb") as HTMLInputElement).value || 0) +
      Number((document.getElementById("numArtOtros") as HTMLInputElement).value || 0) +
      Number((document.getElementById("numMemCong") as HTMLInputElement).value || 0) +
      Number((document.getElementById("numPonencias") as HTMLInputElement).value || 0) +
      Number((document.getElementById("numPatentes") as HTMLInputElement).value || 0);

    const experiencia = 
      Number((document.getElementById("numDocInvest") as HTMLInputElement).value || 0) +
      Number((document.getElementById("numPremDoc") as HTMLInputElement).value || 0) +
      Number((document.getElementById("numExpObj") as HTMLInputElement).value || 0) +
      Number((document.getElementById("numExpOtras") as HTMLInputElement).value || 0) +
      Number((document.getElementById("numPremProf") as HTMLInputElement).value || 0) +
      Number((document.getElementById("numDirInst") as HTMLInputElement).value || 0) +
      Number((document.getElementById("numPasObj") as HTMLInputElement).value || 0) +
      Number((document.getElementById("numPasOtras") as HTMLInputElement).value || 0);

    // --- PROCESAMIENTO CO-8 & CO-10 (CONOCIMIENTO Y APTITUDES) ---
    const examenEscrito = Number((document.getElementById("numExamenEscrito") as HTMLInputElement).value || 0);
    const examenOral = Number((document.getElementById("numExamenOral") as HTMLInputElement).value || 0);

    // Evaluamos la sumatoria de las 5 preguntas de Aptitud de los Jurados para promediar
    let sumaAptitudes = 0;
    for (let i = 1; i <= 5; i++) {
      sumaAptitudes += Number((document.getElementById(`crit_A_${i}`) as HTMLInputElement).value || 4);
      sumaAptitudes += Number((document.getElementById(`crit_B_${i}`) as HTMLInputElement).value || 4);
      sumaAptitudes += Number((document.getElementById(`crit_C_${i}`) as HTMLInputElement).value || 4);
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

  public agregarAlHistorialLocal(cedula: string | number, nombre: string, exitoso: boolean): void {
    if (!this.tablaCarga) return;
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

  public limpiarFormulario(): void {
    if (this.formulario) this.formulario.reset();
  }
}